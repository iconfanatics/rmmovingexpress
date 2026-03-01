'use strict'
/**
 ** File Name: WalletsServices.js
 ** Services to help the task related to Wallets
 ** Wallet Checking (Finding, Deleting, Updating Status)
 ** All Transactions (deposit, transfer, withdraw)
 ** Namespace: App/Services/Wallets
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
/** Models Sections */
/** Wallets Models */
const Clientwallet = use('App/Models/Wallets/Clientwallet')
const Walletdeposit = use('App/Models/Wallets/Walletdeposit')
const Walletwithdraw = use('App/Models/Wallets/Walletwithdraw')
const Wallethistory = use('App/Models/Wallets/Wallethistory')
/** Modules Sections */
const Logger = use('Logger')
const moment = use('moment')
class WalletsServices {
  constructor() {}
  /**
   * Incleasing Balance to Wallet
   * @param wallet_id
   * @param amount
   */
  async addBalanceToWallet(wallet_id, amount) {
    try {
      // finding the cash wallet
      const findWallet = await Clientwallet.query()
        .where('id', wallet_id) // client_wallets id
        .select('id', 'current_balance', 'initial_balance')
        .first()
      // console.log(findWallet.toJSON())
      if (findWallet) {
        findWallet.initial_balance = +findWallet.initial_balance + +amount
        findWallet.current_balance = +findWallet.current_balance + +amount
        await findWallet.save()
      }
      return 'success'
    } catch (addBalanceError) {
      console.log(addBalanceError)
      return 'error'
    }
  }
}

module.exports = WalletsServices
