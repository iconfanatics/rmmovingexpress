'use strict'
/**
 ** File Name: AccountServices.js
 ** Services to help the task related to Accounts
 ** Namespace: App/Services/Schedulers
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
/** Models Sections */
const Account = use('App/Models/Clients/Account')
/** Partners Models */
const Partnercommissionrate = use('App/Models/Partners/Partnercommissionrate')
const Partnercommissionhistory = use(
  'App/Models/Partners/Partnercommissionhistory'
)
/** Wallets Models */
const Clientwallet = use('App/Models/Wallets/Clientwallet')
const Walletdeposit = use('App/Models/Wallets/Walletdeposit')
const Walletwithdraw = use('App/Models/Wallets/Walletwithdraw')
/** Modules Sections */
const moment = use('moment')
const Database = use('Database')
const path = require('path')
const Helpers = use('Helpers')
class SchedulerServices {
  constructor() {}

  /**
   * Getting All Tickets withing a specific Time Frame
   * @param startDealTime
   * @param endDealTime
   */
  async getAllTickets(startDealTime, endDealTime) {
    try {
      return await Database.table('mt4_trades')
        .innerJoin(
          'client_trading_accounts',
          'client_trading_accounts.trading_account_no',
          'mt4_trades.LOGIN'
        )
        .innerJoin(
          'trading_account_types',
          'trading_account_types.id',
          'client_trading_accounts.trading_account_type_id'
        )
        .innerJoin(
          'client_accounts',
          'client_accounts.id',
          'client_trading_accounts.client_account_id'
        )
        // joining with partner_levels by slave_id and client_account_id
        .leftJoin(
          'partner_levels',
          'partner_levels.slave_id',
          'client_trading_accounts.client_account_id'
        )
        .innerJoin(
          'partner_currency_symbols',
          'mt4_trades.SYMBOL',
          'partner_currency_symbols.symbol'
        )
        .innerJoin(
          'partner_currency_groups',
          'partner_currency_groups.id',
          'partner_currency_symbols.partner_currency_group_id'
        )
        // .whereIn('partner_levels.slave_id', [5071, 5068, 5066, 5044]) // check salve
        // .whereIn('client_accounts.id', [5384]) // check salve

        .where(function () {
          this.where('partner_levels.status', 1).orWhereNull(
            'partner_levels.status'
          )
        })
        .where(function () {
          this.where(
            'partner_levels.end_time',
            '2170-01-01 00:00:00'
          ).orWhereNull('partner_levels.end_time')
        })
        .where('client_trading_accounts.is_live', 1) // only live
        .where('client_trading_accounts.is_mt5', 0) // only MT4
        .where('client_trading_accounts.is_testing', 0) // only Real Account
        .where('client_accounts.is_testing', 0) // only Real Account
        // .where('client_accounts.ib_status', 0) // only IB Account
        .where('mt4_trades.CMD', '<', 2) // BUY/SALE
        .where('mt4_trades.CLOSE_TIME', '<>', '1970-01-01 00:00:00') // Only Closed Time
        .where('mt4_trades.CLOSE_TIME', '>', startDealTime)
        .where('mt4_trades.CLOSE_TIME', '<=', endDealTime)
        // .orderBy('mt4_trades.TICKET', 'DESC')
        .select(
          // 'partner_levels.id as PartnerLevelID',
          // 'partner_levels.master_id AS MasterID',
          'client_trading_accounts.client_account_id AS SlaveID',
          // 'partner_levels.slave_id AS SlaveID',
          'client_trading_accounts.trading_account_no AS Login',
          'client_trading_accounts.trading_account_type_id AS TradingAccountTypeID',
          'trading_account_types.account_type_display AS TradingAccountDisplay',
          'client_accounts.fname AS Fname',
          'client_accounts.lname AS Lname',
          'client_accounts.email AS Email',
          'client_accounts.referred_by as ReferredBy',
          'mt4_trades.TICKET AS Deal',
          'mt4_trades.CLOSE_TIME AS DealTime',
          'mt4_trades.SYMBOL AS Symbol',
          'mt4_trades.VOLUME AS Volume',
          'partner_currency_symbols.partner_currency_group_id AS PartnerCurrencyGroupID',
          'partner_currency_groups.title AS PartnerCurrencyGroupTitle'
        )
      // .limit(5)
    } catch (error) {
      console.log(error)
    }
  }
  /**
   * Function to get Level Wise Parent IB Code
   * For a Slve ID
   * @param {Object} partner
   * @param {integer} brokerLevel
   */
  async getLevelWiseParentIBCode(partner, brokerLevel) {
    try {
      // brokerLevel 0 means slave itself master.slave will get commission for its own tardes
      if (brokerLevel == 0) return partner.SlaveID
      // ELSE PART
      let slave_id = partner.SlaveID
      let parentIBCode = null
      for (let level = 1; level <= brokerLevel; level++) {
        let findParent = await Account.query()
          .where('id', slave_id)
          .select('id', 'referred_by')
          .setHidden('fullname', 'iblink')
          .first()
        parentIBCode = findParent ? findParent.toJSON().referred_by : null
        // if (findParent && findParent.toJSON().referred_by == null) break
        slave_id = findParent ? findParent.toJSON().referred_by : null
      }
      return parentIBCode
    } catch (error) {
      console.log(error)
    }
  }
  /**
   * Function to Get the commission rate
   * Either Default Rate
   * Or Partner Detail Rate
   * Or Slavewise Partner Rate
   * @param {integer} partner
   * @param {integer} brokerLevel
   * @param {integer} levelwiseParentIBCode
   */
  async getCommissionRates(partner, brokerLevel, levelwiseParentIBCode) {
    // checking whether set for specific master & slave
    if (brokerLevel == 0) {
      // SLAVE ITSELF A MASTER
      // GETTING COMMISSION FOR ITS OWN TRADES
      let commissionRate = await Partnercommissionrate.query()
        .where('master_id', partner.SlaveID)
        .whereNull('slave_id')
        .where('level', brokerLevel)
        .where('trading_account_type_id', partner.TradingAccountTypeID)
        .where('partner_currency_group_id', partner.PartnerCurrencyGroupID)
        .where('status', 1)
        .where('is_company', 0) // only for customer
        .where('end_time', '2170-01-01 00:00:00') // only active
        .select('commission_rate')
        .last()
      if (commissionRate) return commissionRate.toJSON()
      // checking for Default Commission Rate
      commissionRate = await Partnercommissionrate.query()
        .whereNull('master_id')
        .whereNull('slave_id') // for all slave
        .where('level', brokerLevel)
        .where('trading_account_type_id', partner.TradingAccountTypeID)
        .where('partner_currency_group_id', partner.PartnerCurrencyGroupID)
        .where('status', 1)
        .where('is_company', 0) // only for customer
        .where('end_time', '2170-01-01 00:00:00') // only active
        .select('commission_rate')
        .last()
      return commissionRate ? commissionRate.toJSON() : null
    } else {
      // Giving Commission to MASTERS for slave trades
      let commissionRate = await Partnercommissionrate.query()
        .where('master_id', levelwiseParentIBCode)
        .where('slave_id', partner.SlaveID)
        .where('level', brokerLevel)
        .where('trading_account_type_id', partner.TradingAccountTypeID)
        .where('partner_currency_group_id', partner.PartnerCurrencyGroupID)
        .where('status', 1)
        .where('is_company', 0) // only for customer
        .where('end_time', '2170-01-01 00:00:00') // only active
        .select('commission_rate')
        .last()
      if (commissionRate) return commissionRate.toJSON()
      // not found so check master for all slave
      commissionRate = await Partnercommissionrate.query()
        .where('master_id', levelwiseParentIBCode)
        .whereNull('slave_id') // for all slave
        .where('level', brokerLevel)
        .where('trading_account_type_id', partner.TradingAccountTypeID)
        .where('partner_currency_group_id', partner.PartnerCurrencyGroupID)
        .where('status', 1)
        .where('is_company', 0) // only for customer
        .where('end_time', '2170-01-01 00:00:00') // only active
        .select('commission_rate')
        .last()
      if (commissionRate) return commissionRate.toJSON()
      // checking for Default Commission Rate
      commissionRate = await Partnercommissionrate.query()
        .whereNull('master_id')
        .whereNull('slave_id') // for all slave
        .where('level', brokerLevel)
        .where('trading_account_type_id', partner.TradingAccountTypeID)
        .where('partner_currency_group_id', partner.PartnerCurrencyGroupID)
        .where('status', 1)
        .where('is_company', 0) // only for customer
        .where('end_time', '2170-01-01 00:00:00') // only active
        .select('commission_rate')
        .last()
      return commissionRate ? commissionRate.toJSON() : null
    }
  }
  /**
   * Saving the History in the partner_commission_histories_table
   * @param {object} partner
   * @param {integer} brokerLevel
   * @param {number} commission_rate
   * @param {number} volume
   * @param {number} commission
   * @param {integer} levelwiseParentIBCode
   */
  async createCommissionHistory(
    partner,
    brokerLevel,
    commission_rate,
    volume,
    commission,
    levelwiseParentIBCode
  ) {
    try {
      let newHistory = new Partnercommissionhistory()
      newHistory.master_id = levelwiseParentIBCode
      newHistory.slave_id = partner.SlaveID
      newHistory.level = brokerLevel
      newHistory.commission_rate = commission_rate
      newHistory.deal = partner.Deal
      newHistory.deal_time =
        partner.DealTime && moment(partner.DealTime).isValid()
          ? moment(partner.DealTime).format('YYYY-MM-DD HH:mm:ss')
          : null
      newHistory.symbol = partner.Symbol
      newHistory.volume = volume
      newHistory.commission = commission
      newHistory.trading_account_no = partner.Login
      newHistory.account_type_display = partner.TradingAccountDisplay
      newHistory.fname = partner.Fname
      newHistory.lname = partner.Lname
      newHistory.email = partner.Email
      newHistory.referred_by = partner.ReferredBy
      newHistory.partner_currency_group_title =
        partner.PartnerCurrencyGroupTitle
      await newHistory.save()
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
  /**
   * Getting commission wallet
   * @param client_account_id
   * @param type
   */
  async getCommissionWallet(client_account_id, type = 'broker') {
    try {
      if (type == 'broker') {
        let findCommissionWallet = await Clientwallet.query()
          .where('wallet_id', 7) // 7 for commission wallet
          .whereNull('admin_id')
          .whereNull('client_account_id')
          .whereNull('client_trading_account_id')
          .where('status', 1)
          .select(
            'id',
            'client_account_id',
            'current_balance',
            'initial_balance'
          )
          .first()
        return findCommissionWallet.toJSON()
        // return findCommissionWallet ? findCommissionWallet.toJSON() : []
      } else if (type == 'ib') {
        let findCommissionWallet = await Clientwallet.query()
          .where('wallet_id', 7) // 7 for commission wallet
          .where('client_account_id', client_account_id)
          .whereNull('client_trading_account_id')
          .whereNull('admin_id')
          .where('status', 1)
          .select(
            'id',
            'client_account_id',
            'current_balance',
            'initial_balance'
          )
          .first()
        return findCommissionWallet.toJSON()
        // return findCommissionWallet ? findCommissionWallet.toJSON() : []
      }
    } catch (commissionWallet) {
      console.log(commissionWallet)
      return []
    }
  }
  /**
   * Uploading the File to AWS S3 Bucket
   * @param {file} file
   * @param {integer} trading_account_no
   * @param {string} folder
   * @param {string} oldPath
   */
  async uploadToS3(file, trading_account_no, folder, oldPath) {
    try {
      // If oldPath parameter is set then, delete the old picture
      if (oldPath) {
        const exists = await Drive.disk('s3').exists(oldPath)
        if (exists) {
          await Drive.disk('s3').delete(oldPath)
        }
      }
      // Create a random name for file
      const randomName =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)

      const fileName = `${Date.now()}${randomName}.${file.subtype}`

      // Sets the path and move the file
      const filePath = `${path.resolve(`./tmp/${folder}/`)}/${fileName}`
      console.log(file)
      await file.move(Helpers.tmpPath(folder), {
        name: fileName,
        overwrite: true,
      })

      // Creates a readable stream from file and stores its size
      const fileStream = await fs.createReadStream(filePath)
      const fileSize = await file.stream.byteCount

      // Uploads the file to Amazon S3 and stores the url
      const s3Path = `${folder}/${trading_account_no}`
      await Drive.disk('s3').put(s3Path, fileStream, {
        ACL: 'public-read',
        ContentType: `${file.type}/${file.subtype}`,
      })
      const fileUrl = await Drive.disk('s3').getUrl(s3Path)

      // Destroy the readable stream and delete the file from tmp path
      await fileStream.destroy()
      await Drive.delete(filePath)
      return {
        name: fileName,
        path: s3Path,
        size: fileSize,
        url: fileUrl,
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }
}

module.exports = SchedulerServices
