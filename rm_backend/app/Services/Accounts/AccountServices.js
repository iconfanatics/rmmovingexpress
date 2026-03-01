'use strict'
/**
 ** File Name: AccountServices.js
 ** Services to help the task related to Accounts
 ** Namespace: App/Services/Accounts
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
/** Models Sections */
const Account = use('App/Models/Clients/Account')
const Tradingaccount = use('App/Models/Clients/Tradingaccount')
/** Modules Sections */
const moment = use('moment')
class AccountServices {
  constructor() {}
  /**
   * Counting total Trading Accounts Number for Specific User/Account
   * @param request
   * @param is_mt5
   * @param is_live
   * @param status // 2 means both active/inactive, 1 means active, 0 means inactive
   */
  async countTradingAccounts(request, is_mt5 = 0, is_live = -1, status = 2) {
    try {
      // console.log(request.all())
      let { clientId, search, fromDate, toDate } = request.all()
      let totalAccounts = await Tradingaccount.query()
        .innerJoin(
          'trading_account_types',
          'client_trading_accounts.trading_account_type_id',
          'trading_account_types.id'
        )
        .innerJoin(
          'mt4_users',
          'mt4_users.LOGIN',
          'client_trading_accounts.trading_account_no'
        )
        .innerJoin(
          'currencies',
          'currencies.id',
          'trading_account_types.currency_id'
        )
        // search criteria
        .where(function () {
          if (search && search != '') {
            this.where('mt4_users.NAME', 'LIKE', '%' + search + '%')
              .orWhere('mt4_users.EMAIL', 'LIKE', '%' + search + '%')
              .orWhere('mt4_users.LOGIN', 'LIKE', '%' + search + '%')
              .orWhere(
                'client_trading_accounts.created_at',
                'LIKE',
                '%' + search + '%'
              )
              .orWhere('mt4_users.GROUP', 'LIKE', '%' + search + '%')
              .orWhere('mt4_users.ENABLE', 'LIKE', '%' + search + '%')
          } else {
            1 // all search
          }
        })
        // end of search options
        /** Date Search */
        .where(function () {
          if (
            fromDate &&
            toDate &&
            fromDate !== moment().format('YYYY-MM-DD') &&
            toDate !== moment().format('YYYY-MM-DD')
          ) {
            this.whereBetween('client_trading_accounts.created_at', [
              fromDate,
              toDate,
            ])
          } else {
            1 // for all date
          }
        })
        /** End of Date Search */
        .where('client_trading_accounts.client_account_id', Number(clientId))
        .where('client_trading_accounts.is_mt5', 0) // only MT4
        .whereIn(
          'client_trading_accounts.is_live',
          is_live === -1 ? [0, 1, 2] : [is_live]
        )
        .whereIn(
          'client_trading_accounts.status',
          status === 2 ? [0, 1] : [status]
        )
        .select('client_trading_accounts.id')
        .getCount()

      return totalAccounts
    } catch (countingError) {
      return 0
    }
  }
  /**
   * Getting Trading Accounts Details for Specific User/Account
   * @param request
   * @param is_mt5
   * @param is_live
   * @param status // 2 means both active/inactive, 1 means active, 0 means inactive
   */
  async getTradingAccountsDetail(
    request,
    is_mt5 = 0,
    is_live = -1,
    status = 2
  ) {
    try {
      let { clientId, limit, page, search, fromDate, toDate } = request.all()
      let tradingAccounts = await Tradingaccount.query()
        .innerJoin(
          'trading_account_types',
          'client_trading_accounts.trading_account_type_id',
          'trading_account_types.id'
        )
        .innerJoin(
          'mt4_users',
          'mt4_users.LOGIN',
          'client_trading_accounts.trading_account_no'
        )
        .innerJoin(
          'currencies',
          'currencies.id',
          'trading_account_types.currency_id'
        )
        // search criteria
        .where(function () {
          if (search && search != '') {
            this.where('mt4_users.NAME', 'LIKE', '%' + search + '%')
              .orWhere('mt4_users.EMAIL', 'LIKE', '%' + search + '%')
              .orWhere('mt4_users.LOGIN', 'LIKE', '%' + search + '%')
              .orWhere(
                'client_trading_accounts.created_at',
                'LIKE',
                '%' + search + '%'
              )
              .orWhere('mt4_users.GROUP', 'LIKE', '%' + search + '%')
              .orWhere('mt4_users.ENABLE', 'LIKE', '%' + search + '%')
          } else {
            1 // all search
          }
        })
        // end of search options
        /** Date Search */
        .where(function () {
          if (
            fromDate &&
            toDate &&
            fromDate !== moment().format('YYYY-MM-DD') &&
            toDate !== moment().format('YYYY-MM-DD')
          ) {
            this.whereBetween('client_trading_accounts.created_at', [
              fromDate,
              toDate,
            ])
          } else {
            1 // for all date
          }
        })
        /** End of Date Search */
        .where('client_trading_accounts.client_account_id', Number(clientId))
        .where('client_trading_accounts.is_mt5', 0) // only MT4
        .whereIn(
          'client_trading_accounts.is_live',
          is_live === -1 ? [0, 1, 2] : [is_live]
        )
        .whereIn(
          'client_trading_accounts.status',
          status === 2 ? [0, 1] : [status]
        )
        .whereIn(
          'client_trading_accounts.status',
          status === 2 ? [0, 1] : [status]
        )
        .orderBy('client_trading_accounts.trading_account_no', 'DESC')
        .select(
          'client_trading_accounts.id',
          'client_trading_accounts.is_mt5 AS MTType',
          'client_trading_accounts.trading_account_no AS Login',
          'client_trading_accounts.trader_type AS TraderType',
          'client_trading_accounts.is_testing AS TestingType',
          'client_trading_accounts.created_at AS RegDate',
          'client_trading_accounts.status AS Enable',
          'client_trading_accounts.password AS AccountPassword',
          'client_trading_accounts.investor_password AS InvestorPassword',
          'client_trading_accounts.phone_password AS PhonePassword',
          'trading_account_types.account_type_display',
          'trading_account_types.account_logo',
          'currencies.currency_name as Currency',
          'mt4_users.GROUP as Group',
          'mt4_users.BALANCE as Balance',
          'mt4_users.EQUITY as Equity',
          'mt4_users.CREDIT as Credit',
          'mt4_users.LEVERAGE as Leverage',
          'mt4_users.MARGIN as Margin',
          'mt4_users.MARGIN_FREE as MarginFree',
          'mt4_users.MARGIN_LEVEL as MarginLevel'
        )
        // pagination
        .forPage(
          page,
          limit && Number(limit) !== -1
            ? limit
            : Number(limit) === -1
            ? 9999999
            : 10 // default rowsPerPage
        )
        .fetch()
      return tradingAccounts ? tradingAccounts.toJSON() : []
    } catch (TADetailsError) {
      return []
    }
  }
  /**
   * Function to get Level Wise Parent IB Code
   * For a Slve ID
   * @param {Object} ibCode // Slave ID
   * @param {integer} brokerLevel
   */
  async getLevelWiseParentIBCode(ibCode, brokerLevel) {
    try {
      let parentIBCodes = []
      for (let level = 1; level <= brokerLevel; level++) {
        let findParent = await Account.query()
          .where('id', ibCode)
          .select('id', 'referred_by')
          .setHidden('fullname', 'iblink')
          .first()
        if (findParent && findParent.toJSON().referred_by != null) {
          parentIBCodes.push(findParent.toJSON().referred_by)
        }
        ibCode = findParent ? findParent.toJSON().referred_by : null
      }
      return parentIBCodes
    } catch (error) {
      console.log(error)
    }
  }
  /**
   * Getting the Summation of Equity, Balance for All Trading Accounts
   * @param request
   * @param account_type
   * @param is_mt5
   * @param is_live
   * @param status // 2 means both active/inactive, 1 means active, 0 means inactive
   */
  async getSummation(
    request,
    sumField,
    account_type,
    is_mt5 = 0,
    is_live = 1,
    status = 2
  ) {
    try {
      let {
        search,
        group_name,
        fromDate,
        toDate,
        limit,
        page,
        sortBy,
        sortDesc,
      } = request.all()
      //console.log(sortBy)
      sortBy = sortBy ? sortBy : null // single sort

      const totalEquityBalance = await Tradingaccount.query()
        .innerJoin(
          'trading_account_types',
          'client_trading_accounts.trading_account_type_id',
          'trading_account_types.id'
        )
        .innerJoin(
          'mt4_users',
          'mt4_users.LOGIN',
          'client_trading_accounts.trading_account_no'
        )
        .innerJoin(
          'currencies',
          'currencies.id',
          'trading_account_types.currency_id'
        )
        /** Custom Search */
        .where(function () {
          if (search && search !== '' && search !== null) {
            this.where('mt4_users.NAME', 'LIKE', '%' + search + '%')
              .orWhere('mt4_users.EMAIL', 'LIKE', '%' + search + '%')
              .orWhere(
                'client_trading_accounts.trading_account_no',
                'LIKE',
                '%' + search + '%'
              )
              .orWhere(
                'client_trading_accounts.created_at',
                'LIKE',
                '%' + search + '%'
              )
          } else {
            1 // for all search criteria
          }
        })
        /** End of Custom Search */
        /** Group Search */
        .where(function () {
          if (group_name && group_name !== '') {
            this.where(
              'client_trading_accounts.trading_account_type_id',
              group_name
            )
          } else {
            1 // for all group
          }
        })
        /** End of Group Search */
        /** Date Search */
        .where(function () {
          if (
            fromDate &&
            toDate &&
            fromDate !== moment().format('YYYY-MM-DD') &&
            toDate !== moment().format('YYYY-MM-DD')
          ) {
            this.whereBetween('client_trading_accounts.created_at', [
              fromDate,
              toDate,
            ])
          } else {
            1 // for all date
          }
        })
        /** End of Date Search */
        .where('client_trading_accounts.is_mt5', is_mt5) // only MT4
        .where('client_trading_accounts.is_live', is_live) // only live
        .whereIn('client_trading_accounts.trader_type', [0, 1, 2]) // only self/manager/investor
        .sum(
          sumField === 'Balance'
            ? 'mt4_users.BALANCE as TotalValue'
            : 'mt4_users.EQUITY as TotalValue'
        )
      return totalEquityBalance && totalEquityBalance[0].TotalValue
        ? totalEquityBalance[0].TotalValue.toFixed(2)
        : 0
    } catch (summationError) {
      console.log(summationError)
      return 0
    }
  }
  /**
   * Getting the Details of a Account of Total Trading Accounts
   * @param account_id
   * @param is_live
   */
  async getTotalTradingAccounts(client_id, is_live = -1) {
    try {
      // is_live = 1 => Live, 0 => demo, 4 => testing, -1 => all
      const totalTradingAccounts = await Tradingaccount.query()
        .innerJoin(
          'mt4_users',
          'mt4_users.LOGIN',
          'client_trading_accounts.trading_account_no'
        )
        .where('client_trading_accounts.client_account_id', Number(client_id))
        .where('client_trading_accounts.is_mt5', 0) // only MT4
        .whereIn(
          'client_trading_accounts.is_live',
          is_live === -1 ? [0, 1, 2] : [is_live]
        )
        .select('client_trading_accounts.id')
        .getCount()
      // console.log(totalTradingAccounts)
      return totalTradingAccounts
    } catch (totalAccountsError) {
      return 0
    }
  }
  /**
   * Getting the Details of a Specific Account of Total Trading Accounts Balance
   * @param account_id
   * @param is_live
   */
  async getTotalTradingAccountsBalance(client_id, is_live = -1) {
    try {
      // is_live = 1 => Live, 0 => demo, 2 => testing, -1 => all
      const totalTradingAccountsBalance = await Tradingaccount.query()
        .innerJoin(
          'mt4_users',
          'mt4_users.LOGIN',
          'client_trading_accounts.trading_account_no'
        )
        .where('client_trading_accounts.client_account_id', client_id)
        .where('client_trading_accounts.is_mt5', 0) // only MT4
        .whereIn(
          'client_trading_accounts.is_live',
          is_live === -1 ? [0, 1, 2] : [is_live]
        )
        .sum('mt4_users.BALANCE as TotalValue')
      // console.log(totalTradingAccountsBalance)
      return totalTradingAccountsBalance
        ? totalTradingAccountsBalance[0].TotalValue.toFixed(2)
        : 0
    } catch (totalAccountsError) {
      return 0
    }
  }
  /**
   * Getting the Details of a Specific Account of Total Trading Accounts
   * Balance Based on Search Query
   * @param request
   * @param is_live
   */
  async getTotalFilteredTradingAccountsBalance(request, is_live = -1) {
    try {
      // request ==> search query
      // is_live = 1 => Live, 0 => demo, 2 => testing, -1 => all
      let { clientId, search, fromDate, toDate, sortBy } = request.all()
      //console.log(sortBy)
      sortBy = sortBy ? sortBy : null // single sort
      const totalTradingAccountsBalance = await Tradingaccount.query()
        .innerJoin(
          'mt4_users',
          'mt4_users.LOGIN',
          'client_trading_accounts.trading_account_no'
        )
        .where('client_trading_accounts.client_account_id', clientId)
        .where('client_trading_accounts.is_mt5', 0) // only MT4
        .whereIn(
          'client_trading_accounts.is_live',
          is_live === -1 ? [0, 1, 2] : [is_live]
        )
        /** Custom Search */
        .where(function () {
          if (search && search !== '' && search !== null) {
            this.where('mt4_users.NAME', 'LIKE', '%' + search + '%')
              .orWhere('mt4_users.EMAIL', 'LIKE', '%' + search + '%')
              .orWhere(
                'client_trading_accounts.trading_account_no',
                'LIKE',
                '%' + search + '%'
              )
              .orWhere(
                'client_trading_accounts.created_at',
                'LIKE',
                '%' + search + '%'
              )
          } else {
            1 // for all search criteria
          }
        })
        /** End of Custom Search */
        /** Date Search */
        .where(function () {
          if (
            fromDate &&
            toDate &&
            fromDate !== moment().format('YYYY-MM-DD') &&
            toDate !== moment().format('YYYY-MM-DD')
          ) {
            this.whereBetween('client_trading_accounts.created_at', [
              fromDate,
              toDate,
            ])
          } else {
            1 // for all date
          }
        })
        /** End of Date Search */
        .sum('mt4_users.BALANCE as TotalValue')
      // console.log(totalTradingAccountsBalance)
      return totalTradingAccountsBalance
        ? totalTradingAccountsBalance[0].TotalValue.toFixed(2)
        : 0
    } catch (totalAccountsError) {
      return 0
    }
  }
  /**
   * Getting the Details of a SpecificAccount of Total Trading Accounts Equity
   * @param account_id
   * @param is_live
   */
  async getTotalTradingAccountsEquity(client_id, is_live = -1) {
    try {
      // is_live = 1 => Live, 0 => demo, 2 => testing, -1 => All
      const totalTradingAccountsEquity = await Tradingaccount.query()
        .innerJoin(
          'mt4_users',
          'mt4_users.LOGIN',
          'client_trading_accounts.trading_account_no'
        )
        .where('client_trading_accounts.client_account_id', client_id)
        .where('client_trading_accounts.is_mt5', 0) // only MT4
        .whereIn(
          'client_trading_accounts.is_live',
          is_live === -1 ? [0, 1, 2] : [is_live]
        )
        .sum('mt4_users.EQUITY as TotalValue')
      // console.log(totalTradingAccountsEquity)
      return totalTradingAccountsEquity
        ? totalTradingAccountsEquity[0].TotalValue.toFixed(2)
        : 0
    } catch (totalAccountsError) {
      return 0
    }
  }
  /**
   * Getting the Details of a Specific Account of Total Trading Accounts
   * Equity Based on Search Query
   * @param request
   * @param is_live
   */
  async getTotalFilteredTradingAccountsEquity(request, is_live = -1) {
    try {
      // request ==> search query
      // is_live = 1 => Live, 0 => demo, 2 => testing, -1 => all
      let { clientId, search, fromDate, toDate, sortBy } = request.all()
      //console.log(sortBy)
      sortBy = sortBy ? sortBy : null // single sort
      const totalTradingAccountsEquity = await Tradingaccount.query()
        .innerJoin(
          'mt4_users',
          'mt4_users.LOGIN',
          'client_trading_accounts.trading_account_no'
        )
        .where('client_trading_accounts.client_account_id', clientId)
        .where('client_trading_accounts.is_mt5', 0) // only MT4
        .whereIn(
          'client_trading_accounts.is_live',
          is_live === -1 ? [0, 1, 2] : [is_live]
        )
        /** Custom Search */
        .where(function () {
          if (search && search !== '' && search !== null) {
            this.where('mt4_users.NAME', 'LIKE', '%' + search + '%')
              .orWhere('mt4_users.EMAIL', 'LIKE', '%' + search + '%')
              .orWhere(
                'client_trading_accounts.trading_account_no',
                'LIKE',
                '%' + search + '%'
              )
              .orWhere(
                'client_trading_accounts.created_at',
                'LIKE',
                '%' + search + '%'
              )
          } else {
            1 // for all search criteria
          }
        })
        /** End of Custom Search */
        /** Date Search */
        .where(function () {
          if (
            fromDate &&
            toDate &&
            fromDate !== moment().format('YYYY-MM-DD') &&
            toDate !== moment().format('YYYY-MM-DD')
          ) {
            this.whereBetween('client_trading_accounts.created_at', [
              fromDate,
              toDate,
            ])
          } else {
            1 // for all date
          }
        })
        /** End of Date Search */
        .sum('mt4_users.EQUITY as TotalValue')
      // console.log(totalTradingAccountsEquity)
      return totalTradingAccountsEquity
        ? totalTradingAccountsEquity[0].TotalValue.toFixed(2)
        : 0
    } catch (totalAccountsError) {
      return 0
    }
  }
  /**
   * Total Number of trades
   * @param client_id
   */
  async getTotalTrades(client_id) {
    try {
      const totalTrades = await Tradingaccount.query()
        .innerJoin(
          'mt4_trades',
          'mt4_trades.LOGIN',
          'client_trading_accounts.trading_account_no'
        )
        .where('client_trading_accounts.client_account_id', client_id)
        .where('client_trading_accounts.is_live', 1) // only live accounts
        .where('client_trading_accounts.is_mt5', 0) // only MT4
        .count('mt4_trades.LOGIN AS TotalTrades')
      // console.log(totalTrades[0].TotalTrades)
      return totalTrades && totalTrades[0] && totalTrades[0].TotalTrades
        ? totalTrades[0].TotalTrades
        : 0
    } catch (error) {
      return 0
    }
  }
  /**
   * Total Number of Profitable trades
   * @param client_id
   */
  async getTotalProfitableTrades(client_id) {
    try {
      const totalProfitableTrades = await Tradingaccount.query()
        .innerJoin(
          'mt4_trades',
          'mt4_trades.LOGIN',
          'client_trading_accounts.trading_account_no'
        )
        .where('client_trading_accounts.client_account_id', client_id)
        .where('client_trading_accounts.is_live', 1) // only live accounts
        .where('client_trading_accounts.is_mt5', 0) // only MT4
        .where('mt4_trades.PROFIT', '>', 0) // only Profit
        .where('mt4_trades.CMD', '<', 2) // only BUY/SELL
        .where('mt4_trades.CLOSE_TIME', '<>', '1970-01-01 00:00:00') // only Closed
        .count('mt4_trades.LOGIN AS TotalProfitableTrades')
      // console.log(totalProfitableTrades[0].TotalProfitableTrades)
      return totalProfitableTrades &&
        totalProfitableTrades[0] &&
        totalProfitableTrades[0].TotalProfitableTrades
        ? totalProfitableTrades[0].TotalProfitableTrades
        : 0
    } catch (error) {
      return 0
    }
  }
  /**
   * Total Number of Loss trades
   * @param client_id
   */
  async getTotalLossTrades(client_id) {
    try {
      const totalLossTrades = await Tradingaccount.query()
        .innerJoin(
          'mt4_trades',
          'mt4_trades.LOGIN',
          'client_trading_accounts.trading_account_no'
        )
        .where('client_trading_accounts.client_account_id', client_id)
        .where('client_trading_accounts.is_live', 1) // only live accounts
        .where('client_trading_accounts.is_mt5', 0) // only MT4
        .where('mt4_trades.PROFIT', '<', 0) // only Profit
        .count('mt4_trades.LOGIN AS TotalLossTrades')
      // console.log(totalLossTrades[0].TotalLossTrades)
      return totalLossTrades &&
        totalLossTrades[0] &&
        totalLossTrades[0].TotalLossTrades
        ? totalLossTrades[0].TotalLossTrades
        : 0
    } catch (error) {
      return 0
    }
  }
  /**
   * Total LOTS traded
   * @param client_id
   */
  async getTotalLots(client_id) {
    try {
      const totalLots = await Tradingaccount.query()
        .innerJoin(
          'mt4_trades',
          'mt4_trades.LOGIN',
          'client_trading_accounts.trading_account_no'
        )
        .where('client_trading_accounts.client_account_id', client_id)
        .where('client_trading_accounts.is_live', 1) // only live accounts
        .where('client_trading_accounts.is_mt5', 0) // only MT4
        .sum('mt4_trades.VOLUME AS TotalVolume')
      // console.log(totalLots[0].TotalVolume)
      return totalLots && totalLots[0] && totalLots[0].TotalVolume
        ? (totalLots[0].TotalVolume / 100).toFixed(2)
        : 0
    } catch (error) {
      return 0
    }
  }
  /**
   * Total Profits earned through traded
   * @param client_id
   */
  async getTotalProfits(client_id) {
    try {
      const totalProfits = await Tradingaccount.query()
        .innerJoin(
          'mt4_trades',
          'mt4_trades.LOGIN',
          'client_trading_accounts.trading_account_no'
        )
        .where('client_trading_accounts.client_account_id', client_id)
        .where('client_trading_accounts.is_live', 1) // only live accounts
        .where('client_trading_accounts.is_mt5', 0) // only MT4
        .where('mt4_trades.PROFIT', '>', 0) // only Profit
        .sum('mt4_trades.PROFIT AS TotalProfit')
      // console.log(totalProfits[0].TotalProfit)
      return totalProfits && totalProfits[0] && totalProfits[0].TotalProfit
        ? totalProfits[0].TotalProfit.toFixed(2)
        : 0
    } catch (error) {
      return 0
    }
  }
  /**
   * Total Loss through traded
   * @param client_id
   */
  async getTotalLoss(client_id) {
    try {
      const totalLoss = await Tradingaccount.query()
        .innerJoin(
          'mt4_trades',
          'mt4_trades.LOGIN',
          'client_trading_accounts.trading_account_no'
        )
        .where('client_trading_accounts.client_account_id', client_id)
        .where('client_trading_accounts.is_live', 1) // only live accounts
        .where('client_trading_accounts.is_mt5', 0) // only MT4
        .where('mt4_trades.PROFIT', '<', 0) // only Profit
        .sum('mt4_trades.PROFIT AS TotalLoss')
      // console.log(totalLoss[0].TotalLoss)
      return totalLoss && totalLoss[0] && totalLoss[0].TotalLoss
        ? totalLoss[0].TotalLoss.toFixed(2)
        : 0
    } catch (error) {
      return 0
    }
  }
}

module.exports = AccountServices
