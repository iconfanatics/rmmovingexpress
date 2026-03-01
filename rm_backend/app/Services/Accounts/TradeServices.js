'use strict'
/**
 ** File Name: TradeServices.js
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
const Tradingaccount = use('App/Models/Clients/Tradingaccount')
/** Modules Sections */
const Database = use('Database')
const moment = use('moment')
class TradeServices {
  constructor() {}
  /**
   *
   * SINGLE/SPECIFIC ACCOUNT/USER OERATION SECTION
   * OPERATIONS TO FIND OUT ALL DATA FOR SINGLE/SPECIFIC ACCOUNT/USER
   *
   */
  /**
   * Counting total Live Trades for Specific User/Account
   * @param request
   * @param is_mt5
   * @param is_live
   * @param status
   */
  async countLiveTrades(request, is_mt5 = 0, is_live = -1, status = 1) {
    try {
      let { clientId, limit, page, sortBy, sortDesc, search } = request.all()
      // Counting Live Trades
      let totalLiveTrades = await Tradingaccount.query()
        .innerJoin(
          'mt4_trades',
          'mt4_trades.LOGIN',
          'client_trading_accounts.trading_account_no'
        )
        .where('client_trading_accounts.client_account_id', Number(clientId))
        .where('mt4_trades.CMD', '<', 2)
        .where('mt4_trades.CLOSE_TIME', '1970-01-01 00:00:00')
        .where('client_trading_accounts.is_mt5', 0) // only MT4
        .where('client_trading_accounts.is_testing', 0) // only Real
        .whereIn(
          'client_trading_accounts.is_live',
          is_live === -1 ? [0, 1, 2] : [is_live]
        )
        .whereIn(
          'client_trading_accounts.status',
          status === 2 ? [0, 1] : [status]
        )
        // search criteria
        .where(function () {
          if (search && search != '') {
            this.where('mt4_trades.TICKET', 'LIKE', '%' + search + '%')
              .orWhere('mt4_trades.SYMBOL', 'LIKE', '%' + search + '%')
              .orWhere('mt4_trades.LOGIN', 'LIKE', '%' + search + '%')
          } else {
            1 // all search
          }
        })
        // end of search options
        .select('mt4_trades.TICKET')
        .getCount()
      return totalLiveTrades
    } catch (countingError) {
      return 0
    }
  }

  /**
   * Counting Live Trades Details for Specific User/Account
   * @param request
   * @param is_mt5
   * @param is_live
   * @param status
   */
  async getLiveTradesDetail(request, is_mt5 = 0, is_live = 1, status = 1) {
    try {
      let { clientId, limit, page, sortBy, sortDesc, search } = request.all()
      // Live Trades Detail
      let liveTradesDetail = await Tradingaccount.query()
        .innerJoin(
          'mt4_trades',
          'mt4_trades.LOGIN',
          'client_trading_accounts.trading_account_no'
        )
        .where('client_trading_accounts.client_account_id', Number(clientId))
        .where('mt4_trades.CMD', '<', 2)
        .where('mt4_trades.CLOSE_TIME', '1970-01-01 00:00:00')
        .where('client_trading_accounts.is_mt5', 0) // only MT4
        .where('client_trading_accounts.is_testing', 0) // only Real
        .whereIn(
          'client_trading_accounts.is_live',
          is_live === -1 ? [0, 1, 2] : [is_live]
        )
        .whereIn(
          'client_trading_accounts.status',
          status === 2 ? [0, 1] : [status]
        )
        // search criteria
        .where(function () {
          if (search && search != '') {
            this.where('mt4_trades.TICKET', 'LIKE', '%' + search + '%')
              .orWhere('mt4_trades.SYMBOL', 'LIKE', '%' + search + '%')
              .orWhere('mt4_trades.LOGIN', 'LIKE', '%' + search + '%')
          } else {
            1 // all search
          }
        })
        // end of search options
        .select(
          'client_trading_accounts.is_mt5 as MTType',
          'mt4_trades.LOGIN as Login',
          'mt4_trades.OPEN_TIME as TimeCreate',
          'mt4_trades.TICKET as Position',
          'mt4_trades.SYMBOL as Symbol',
          'mt4_trades.CMD as Action',
          'mt4_trades.VOLUME as Volume',
          'mt4_trades.OPEN_PRICE as PriceOpen',
          'mt4_trades.SL as PriceSL',
          'mt4_trades.TP as PriceTP',
          'mt4_trades.CLOSE_PRICE as PriceCurrent',
          'mt4_trades.SWAPS as Storage',
          'mt4_trades.PROFIT as Profit'
        )
        .orderBy('mt4_trades.TICKET', 'desc')
        // pagination
        // .forPage(
        //   page,
        //   limit && Number(limit) !== -1
        //     ? limit
        //     : Number(limit) === -1
        //     ? 9999999
        //     : 10 // default rowsPerPage 10
        // )
        .fetch()
      return liveTradesDetail ? liveTradesDetail.toJSON() : []
    } catch (liveTradesDetailError) {
      return []
    }
  }
  /**
   * Counting total Closed Trades for Specific User/Account
   * @param request
   * @param is_mt5
   * @param is_live
   * @param status
   */
  async countSingleAccountClosedTrades(
    request,
    is_mt5 = 0,
    is_live = -1,
    status = 1
  ) {
    try {
      let {
        clientId,
        limit,
        page,
        sortBy,
        sortDesc,
        search,
        group_name,
        fromDate,
        toDate,
      } = request.all()
      // total trade history counting
      let totalTradeHistory = await Database.table('mt4_trades')
        // joining the client_trading_accounts
        .innerJoin(
          'client_trading_accounts',
          'client_trading_accounts.trading_account_no',
          'mt4_trades.LOGIN'
        )
        // joining the trading_account_types
        .innerJoin(
          'trading_account_types',
          'trading_account_types.id',
          'client_trading_accounts.trading_account_type_id'
        )
        .where('client_trading_accounts.client_account_id', Number(clientId))
        .where('client_trading_accounts.is_mt5', 0) // mt4 only
        .where('client_trading_accounts.is_testing', 0) // only Real
        .where('client_trading_accounts.is_live', 1) // live only
        .where('mt4_trades.CLOSE_TIME', '<>', '1970-01-01 00:00:00') // closed only
        .where('mt4_trades.CMD', '<', 2) // BUY/SELL only
        /** Group Filtering */
        // .where(function () {
        //   if (group_name && group_name !== '') {
        //     this.where(
        //       'trading_account_types.account_type_display',
        //       Number(group_name)
        //     )
        //   } else {
        //     1 // for all group
        //   }
        // })
        /** End of Group Filtering */
        // search criteria
        .where(function () {
          if (search && search !== '') {
            this.where('mt4_trades.TICKET', 'LIKE', '%' + search + '%')
              .orWhere('mt4_trades.SYMBOL', 'LIKE', '%' + search + '%')
              .orWhere('mt4_trades.LOGIN', 'LIKE', '%' + search + '%')
              .orWhere(
                'trading_account_types.account_type_display',
                'LIKE',
                '%' + search + '%'
              )
              .orWhere(
                'trading_account_types.account_type_real',
                'LIKE',
                '%' + search + '%'
              )
          } else {
            1 // all search
          }
        })
        // end of search options
        /** Date Options */
        .where(function () {
          if (
            fromDate &&
            toDate &&
            fromDate !== moment().format('YYYY-MM-DD') &&
            toDate !== moment().format('YYYY-MM-DD')
          ) {
            this.whereBetween('mt4_trades.CLOSE_TIME', [fromDate, toDate])
          } else {
            1 // for all date
          }
        })
        /** End of Date Options */
        .select('mt4_trades.TICKET')
        .getCount()
      return totalTradeHistory
    } catch (countingError) {
      return 0
    }
  }

  /**
   * Closed Trades Details for Specific User/Account
   * @param request
   * @param is_mt5
   * @param is_live
   * @param status
   */
  async getSingleAccountClosedTradesDetail(
    request,
    is_mt5 = 0,
    is_live = 1,
    status = 1
  ) {
    try {
      let {
        clientId,
        limit,
        page,
        search,
        group_name,
        fromDate,
        toDate,
      } = request.all()
      let tradesHistory = await Database.table('mt4_trades')
        // joining the client_trading_accounts
        .innerJoin(
          'client_trading_accounts',
          'client_trading_accounts.trading_account_no',
          'mt4_trades.LOGIN'
        )
        // joining the trading_account_types
        .innerJoin(
          'trading_account_types',
          'trading_account_types.id',
          'client_trading_accounts.trading_account_type_id'
        )
        .innerJoin(
          'mt4_users',
          'mt4_users.LOGIN',
          'client_trading_accounts.trading_account_no'
        )
        .where('client_trading_accounts.client_account_id', Number(clientId))
        .where('client_trading_accounts.is_mt5', 0)
        .where('client_trading_accounts.is_live', 1)
        .where('client_trading_accounts.is_testing', 0) // only Real
        .where('mt4_trades.CLOSE_TIME', '<>', '1970-01-01 00:00:00')
        .where('mt4_trades.CMD', '<', 2)
        /** Group Filtering */
        // .where(function () {
        //   if (group_name && group_name !== '') {
        //     this.where(
        //       'client_trading_accounts.trading_account_type_id',
        //       Number(group_name)
        //     )
        //   } else {
        //     1 // for all group
        //   }
        // })
        /** End of Group Filtering */
        // search criteria
        .where(function () {
          if (search && search !== '') {
            this.where('mt4_trades.TICKET', 'LIKE', '%' + search + '%')
              .orWhere('mt4_trades.SYMBOL', 'LIKE', '%' + search + '%')
              .orWhere('mt4_trades.LOGIN', 'LIKE', '%' + search + '%')
              .orWhere(
                'trading_account_types.account_type_display',
                'LIKE',
                '%' + search + '%'
              )
              .orWhere(
                'trading_account_types.account_type_real',
                'LIKE',
                '%' + search + '%'
              )
          } else {
            1 // all search
          }
        })
        // end of search options
        /** Date Options */
        .where(function () {
          if (
            fromDate &&
            toDate &&
            fromDate !== moment().format('YYYY-MM-DD') &&
            toDate !== moment().format('YYYY-MM-DD')
          ) {
            this.whereBetween('mt4_trades.CLOSE_TIME', [fromDate, toDate])
          } else {
            1 // for all date
          }
        })
        /** End of Date Options */
        .select(
          'client_trading_accounts.is_mt5 as MTType',
          'client_trading_accounts.trading_account_no as Login',
          'mt4_trades.OPEN_TIME as TimeSetup',
          'mt4_trades.TICKET as Deal',
          'mt4_trades.CMD as Action',
          'mt4_trades.VOLUME as Volume',
          'mt4_trades.SYMBOL as Symbol',
          'mt4_trades.OPEN_PRICE as PriceOrder',
          'mt4_trades.SL as PriceSL',
          'mt4_trades.TP as PriceTP',
          'mt4_trades.CLOSE_TIME as TimeDone',
          'mt4_trades.CLOSE_PRICE as PriceClose',
          'mt4_trades.PROFIT as Profit',
          'mt4_trades.SWAPS as Storage',
          'mt4_trades.COMMISSION as Commission',
          'mt4_trades.COMMENT as Comment',
          'mt4_users.BALANCE as Balance',
          'mt4_users.EQUITY as Equity',
          'mt4_users.GROUP as Group'
        )
        .orderBy('mt4_trades.OPEN_TIME', 'desc')
        // pagination
        .forPage(
          page,
          limit && Number(limit) !== -1
            ? limit
            : Number(limit) === -1
            ? 9999999
            : 10 // default rowsPerPage 10
        )
      return tradesHistory ? tradesHistory : []
    } catch (closedTradesDetailError) {
      console.log(closedTradesDetailError)
      return []
    }
  }

  /**
   * Getting the Summation of Profit, Loss, Lots
   * Single/Specific Account
   * @param request
   * @param account_type
   * @param is_mt5
   * @param is_live
   * @param status // 2 means both active/inactive, 1 means active, 0 means inactive
   */
  async getSingleAccountClosedTradesSummation(
    request,
    sumField,
    account_type,
    is_mt5 = 0,
    is_live = 1,
    status = 2
  ) {
    try {
      let { clientId, search, fromDate, toDate } = request.all()
      let totalAmount = await Database.table('mt4_trades')
        // joining the client_trading_accounts
        .innerJoin(
          'client_trading_accounts',
          'client_trading_accounts.trading_account_no',
          'mt4_trades.LOGIN'
        )
        // joining the trading_account_types
        .innerJoin(
          'trading_account_types',
          'trading_account_types.id',
          'client_trading_accounts.trading_account_type_id'
        )
        .where('client_trading_accounts.client_account_id', Number(clientId))
        .where('client_trading_accounts.is_mt5', 0) // mt4 only
        .where('client_trading_accounts.is_testing', 0) // only Real
        .where('client_trading_accounts.is_live', 1) // live only
        .where('mt4_trades.CLOSE_TIME', '<>', '1970-01-01 00:00:00') // closed only
        .where('mt4_trades.CMD', '<', 2) // BUY/SELL only
        /** Group Filtering */
        // .where(function () {
        //   if (group_name && group_name !== '') {
        //     this.where(
        //       'client_trading_accounts.trading_account_type_id',
        //       Number(group_name)
        //     )
        //   } else {
        //     1 // for all group
        //   }
        // })
        /** End of Group Filtering */
        // search criteria
        .where(function () {
          if (search && search !== '') {
            this.where('mt4_trades.TICKET', 'LIKE', '%' + search + '%')
              .orWhere('mt4_trades.SYMBOL', 'LIKE', '%' + search + '%')
              .orWhere('mt4_trades.LOGIN', 'LIKE', '%' + search + '%')
              .orWhere(
                'trading_account_types.account_type_display',
                'LIKE',
                '%' + search + '%'
              )
              .orWhere(
                'trading_account_types.account_type_real',
                'LIKE',
                '%' + search + '%'
              )
          } else {
            1 // all search
          }
        })
        // end of search options
        /** Date Options */
        .where(function () {
          if (
            fromDate &&
            toDate &&
            fromDate !== moment().format('YYYY-MM-DD') &&
            toDate !== moment().format('YYYY-MM-DD')
          ) {
            this.whereBetween('mt4_trades.CLOSE_TIME', [fromDate, toDate])
          } else {
            1 // for all date
          }
        })
        /** End of Date Options */
        /** Profit/Loss Options */
        .where(function () {
          if (sumField && sumField === 'Profit') {
            this.where('mt4_trades.PROFIT', '>', 0)
          }
          if (sumField && sumField === 'Loss') {
            this.where('mt4_trades.PROFIT', '<', 0)
          } else {
            1
          }
        })
        /** End of Profit/Loss Options */
        .sum(
          sumField === 'Profit'
            ? 'mt4_trades.PROFIT as TotalValue'
            : sumField === 'Loss'
            ? 'mt4_trades.PROFIT as TotalValue'
            : sumField === 'Lot'
            ? 'mt4_trades.VOLUME as TotalValue'
            : 'mt4_trades.PROFIT'
        )
      // console.log(totalAmount)
      return totalAmount ? totalAmount[0].TotalValue.toFixed(2) : 0
    } catch (summationError) {
      return 0
    }
  }

  /**
   *
   * ALL ACCOUNTS OERATION SECTION
   * OPERATIONS TO FIND OUT ALL DATA FOR ALL ACCOUNTS
   *
   */
  /**
   * Counting total Live Trades for All User/Account
   * @param request
   * @param is_mt5
   * @param is_live
   * @param status
   */
  async countAllAccountLiveTrades(
    request,
    is_mt5 = 0,
    is_live = -1,
    status = 1
  ) {
    try {
      let {
        limit,
        page,
        sortBy,
        sortDesc,
        search,
        fromDate,
        toDate,
      } = request.all()
      let totalLiveTrades = await Tradingaccount.query()
        .innerJoin(
          'mt4_trades',
          'mt4_trades.LOGIN',
          'client_trading_accounts.trading_account_no'
        )
        .where('mt4_trades.CMD', '<', 2)
        .where('mt4_trades.CLOSE_TIME', '1970-01-01 00:00:00')
        .where('client_trading_accounts.is_mt5', 0) // only MT4
        .whereIn(
          'client_trading_accounts.is_live',
          is_live === -1 ? [0, 1, 2] : [is_live]
        )
        .whereIn(
          'client_trading_accounts.status',
          status === 2 ? [0, 1] : [status]
        )
        .where('client_trading_accounts.is_testing', 0) // only Real
        /** Search Options */
        .where(function () {
          if (search && search != '') {
            this.where('mt4_trades.TICKET', 'LIKE', '%' + search + '%')
              .orWhere('mt4_trades.SYMBOL', 'LIKE', '%' + search + '%')
              .orWhere('mt4_trades.LOGIN', 'LIKE', '%' + search + '%')
          } else {
            1 // all search
          }
        })
        /** End of Search Options */
        /** Date Options */
        .where(function () {
          if (
            fromDate &&
            toDate &&
            fromDate !== moment().format('YYYY-MM-DD') &&
            toDate !== moment().format('YYYY-MM-DD')
          ) {
            this.whereBetween('mt4_trades.OPEN_TIME', [fromDate, toDate])
          } else {
            1 // for all date
          }
        })
        /** End of Date Options */
        .select('mt4_trades.TICKET')
        .getCount()
      return totalLiveTrades
    } catch (countingError) {
      return 0
    }
  }

  /**
   * Counting Live Trades Details for All User/Account
   * @param request
   * @param is_mt5
   * @param is_live
   * @param status
   */
  async getAllAccountLiveTradesDetail(
    request,
    is_mt5 = 0,
    is_live = 1,
    status = 1
  ) {
    try {
      let {
        limit,
        page,
        sortBy,
        sortDesc,
        search,
        fromDate,
        toDate,
      } = request.all()
      let liveTradesDetail = await Tradingaccount.query()
        .innerJoin(
          'mt4_trades',
          'mt4_trades.LOGIN',
          'client_trading_accounts.trading_account_no'
        )
        .where('mt4_trades.CMD', '<', 2)
        .where('mt4_trades.CLOSE_TIME', '1970-01-01 00:00:00')
        .where('client_trading_accounts.is_mt5', 0) // only MT4
        .where('client_trading_accounts.is_testing', 0) // only Real
        .whereIn(
          'client_trading_accounts.is_live',
          is_live === -1 ? [0, 1, 2] : [is_live]
        )
        .whereIn(
          'client_trading_accounts.status',
          status === 2 ? [0, 1] : [status]
        )
        // search criteria
        .where(function () {
          if (search && search != '') {
            this.where('mt4_trades.TICKET', 'LIKE', '%' + search + '%')
              .orWhere('mt4_trades.SYMBOL', 'LIKE', '%' + search + '%')
              .orWhere('mt4_trades.LOGIN', 'LIKE', '%' + search + '%')
          } else {
            1 // all search
          }
        })
        // end of search options
        /** Date Options */
        .where(function () {
          if (
            fromDate &&
            toDate &&
            fromDate !== moment().format('YYYY-MM-DD') &&
            toDate !== moment().format('YYYY-MM-DD')
          ) {
            this.whereBetween('mt4_trades.OPEN_TIME', [fromDate, toDate])
          } else {
            1 // for all date
          }
        })
        /** End of Date Options */
        .select(
          'client_trading_accounts.is_mt5 as MTType',
          'mt4_trades.LOGIN as Login',
          'mt4_trades.OPEN_TIME as TimeCreate',
          'mt4_trades.TICKET as Position',
          'mt4_trades.SYMBOL as Symbol',
          'mt4_trades.CMD as Action',
          'mt4_trades.VOLUME as Volume',
          'mt4_trades.OPEN_PRICE as PriceOpen',
          'mt4_trades.SL as PriceSL',
          'mt4_trades.TP as PriceTP',
          'mt4_trades.CLOSE_PRICE as PriceCurrent',
          'mt4_trades.SWAPS as Storage',
          'mt4_trades.PROFIT as Profit'
        )
        .orderBy('mt4_trades.TICKET', 'desc')
        // pagination
        .forPage(
          page,
          limit && Number(limit) !== -1
            ? limit
            : Number(limit) === -1
            ? 9999999
            : 10 // default rowsPerPage 10/2 = 5
        )
        .fetch()
      return liveTradesDetail ? liveTradesDetail.toJSON() : []
    } catch (liveTradesDetailError) {
      return []
    }
  }

  /**
   * Getting the Summation of Profit, Loss, Lots
   * @param request
   * @param account_type
   * @param is_mt5
   * @param is_live
   * @param status // 2 means both active/inactive, 1 means active, 0 means inactive
   */
  async getLiveTradesSummation(
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

      let totalAmount = await Tradingaccount.query()
        .innerJoin(
          'mt4_trades',
          'mt4_trades.LOGIN',
          'client_trading_accounts.trading_account_no'
        )
        .where('mt4_trades.CMD', '<', 2) // BUY/SELL
        .where('mt4_trades.CLOSE_TIME', '1970-01-01 00:00:00') // Live only
        .where('client_trading_accounts.is_mt5', 0) // only MT4
        .where('client_trading_accounts.is_testing', 0) // only Real
        .whereIn(
          'client_trading_accounts.is_live',
          is_live === -1 ? [0, 1, 2] : [is_live]
        )
        .whereIn(
          'client_trading_accounts.status',
          status === 2 ? [0, 1] : [status]
        )
        // search criteria
        .where(function () {
          if (search && search != '') {
            this.where('mt4_trades.TICKET', 'LIKE', '%' + search + '%')
              .orWhere('mt4_trades.SYMBOL', 'LIKE', '%' + search + '%')
              .orWhere('mt4_trades.LOGIN', 'LIKE', '%' + search + '%')
          } else {
            1 // all search
          }
        })
        // end of search options
        /** Date Options */
        .where(function () {
          if (
            fromDate &&
            toDate &&
            fromDate !== moment().format('YYYY-MM-DD') &&
            toDate !== moment().format('YYYY-MM-DD')
          ) {
            this.whereBetween('mt4_trades.OPEN_TIME', [fromDate, toDate])
          } else {
            1 // for all date
          }
        })
        /** End of Date Options */
        /** Profit/Loss Options */
        .where(function () {
          if (sumField && sumField === 'Profit') {
            this.where('mt4_trades.PROFIT', '>', 0)
          }
          if (sumField && sumField === 'Loss') {
            this.where('mt4_trades.PROFIT', '<', 0)
          } else {
            1
          }
        })
        /** End of Profit/Loss Options */
        .sum(
          sumField === 'Profit'
            ? 'mt4_trades.PROFIT as TotalValue'
            : sumField === 'Loss'
            ? 'mt4_trades.PROFIT as TotalValue'
            : sumField === 'Lot'
            ? 'mt4_trades.VOLUME as TotalValue'
            : 'mt4_trades.PROFIT'
        )
      // console.log(totalAmount)
      return totalAmount ? totalAmount[0].TotalValue.toFixed(2) : 0
    } catch (summationError) {
      return 0
    }
  }

  /**
   * Counting total   Closed Trades for All User/Account
   * @param request
   * @param is_mt5
   * @param is_live
   * @param status
   */
  async countAllAccountClosedTrades(
    request,
    is_mt5 = 0,
    is_live = -1,
    status = 1
  ) {
    try {
      let {
        limit,
        page,
        sortBy,
        sortDesc,
        search,
        group_name,
        fromDate,
        toDate,
      } = request.all()
      // total trade history counting
      let totalTradeHistory = await Database.table('mt4_trades')
        // joining the client_trading_accounts
        .innerJoin(
          'client_trading_accounts',
          'client_trading_accounts.trading_account_no',
          'mt4_trades.LOGIN'
        )
        // joining the trading_account_types
        .innerJoin(
          'trading_account_types',
          'trading_account_types.id',
          'client_trading_accounts.trading_account_type_id'
        )
        .where('client_trading_accounts.is_mt5', 0) // mt4 only
        .where('client_trading_accounts.is_live', 1) // live only
        .where('client_trading_accounts.is_testing', 0) // only Real
        .where('mt4_trades.CLOSE_TIME', '<>', '1970-01-01 00:00:00') // closed only
        .where('mt4_trades.CMD', '<', 2) // BUY/SELL only
        /** Group Filtering */
        // .where(function () {
        //   if (group_name && group_name !== '') {
        //     this.where(
        //       'trading_account_types.account_type_display',
        //       Number(group_name)
        //     )
        //   } else {
        //     1 // for all group
        //   }
        // })
        /** End of Group Filtering */
        // search criteria
        .where(function () {
          if (search && search !== '') {
            this.where('mt4_trades.TICKET', 'LIKE', '%' + search + '%')
              .orWhere('mt4_trades.SYMBOL', 'LIKE', '%' + search + '%')
              .orWhere('mt4_trades.LOGIN', 'LIKE', '%' + search + '%')
              .orWhere(
                'trading_account_types.account_type_display',
                'LIKE',
                '%' + search + '%'
              )
              .orWhere(
                'trading_account_types.account_type_real',
                'LIKE',
                '%' + search + '%'
              )
          } else {
            1 // all search
          }
        })
        // end of search options
        /** Date Options */
        .where(function () {
          if (
            fromDate &&
            toDate &&
            fromDate !== moment().format('YYYY-MM-DD') &&
            toDate !== moment().format('YYYY-MM-DD')
          ) {
            this.whereBetween('mt4_trades.CLOSE_TIME', [fromDate, toDate])
          } else {
            1 // for all date
          }
        })
        /** End of Date Options */
        .select('mt4_trades.TICKET')
        .getCount()
      return totalTradeHistory
    } catch (countingError) {
      return 0
    }
  }

  /**
   * Counting Live Trades Details for All User/Account
   * @param request
   * @param is_mt5
   * @param is_live
   * @param status
   */
  async getAllAccountClosedTradesDetail(
    request,
    is_mt5 = 0,
    is_live = 1,
    status = 1
  ) {
    try {
      let {
        limit,
        page,
        sortBy,
        sortDesc,
        search,
        group_name,
        fromDate,
        toDate,
      } = request.all()
      let tradesHistory = await Database.table('mt4_trades')
        // joining the client_trading_accounts
        .innerJoin(
          'client_trading_accounts',
          'client_trading_accounts.trading_account_no',
          'mt4_trades.LOGIN'
        )
        // joining the trading_account_types
        .innerJoin(
          'trading_account_types',
          'trading_account_types.id',
          'client_trading_accounts.trading_account_type_id'
        )
        .innerJoin(
          'mt4_users',
          'mt4_users.LOGIN',
          'client_trading_accounts.trading_account_no'
        )
        .where('client_trading_accounts.is_mt5', 0)
        .where('client_trading_accounts.is_live', 1)
        .where('client_trading_accounts.is_testing', 0) // only Real
        .where('mt4_trades.CLOSE_TIME', '<>', '1970-01-01 00:00:00')
        .where('mt4_trades.CMD', '<', 2)
        /** Group Filtering */
        // .where(function () {
        //   if (group_name && group_name !== '') {
        //     this.where(
        //       'client_trading_accounts.trading_account_type_id',
        //       Number(group_name)
        //     )
        //   } else {
        //     1 // for all group
        //   }
        // })
        /** End of Group Filtering */
        // search criteria
        .where(function () {
          if (search && search !== '') {
            this.where('mt4_trades.TICKET', 'LIKE', '%' + search + '%')
              .orWhere('mt4_trades.SYMBOL', 'LIKE', '%' + search + '%')
              .orWhere('mt4_trades.LOGIN', 'LIKE', '%' + search + '%')
              .orWhere(
                'trading_account_types.account_type_display',
                'LIKE',
                '%' + search + '%'
              )
              .orWhere(
                'trading_account_types.account_type_real',
                'LIKE',
                '%' + search + '%'
              )
          } else {
            1 // all search
          }
        })
        // end of search options
        /** Date Options */
        .where(function () {
          if (
            fromDate &&
            toDate &&
            fromDate !== moment().format('YYYY-MM-DD') &&
            toDate !== moment().format('YYYY-MM-DD')
          ) {
            this.whereBetween('mt4_trades.CLOSE_TIME', [fromDate, toDate])
          } else {
            1 // for all date
          }
        })
        /** End of Date Options */
        .select(
          'client_trading_accounts.is_mt5 as MTType',
          'client_trading_accounts.trading_account_no as Login',
          'mt4_trades.OPEN_TIME as TimeSetup',
          'mt4_trades.TICKET as Deal',
          'mt4_trades.CMD as Action',
          'mt4_trades.VOLUME as Volume',
          'mt4_trades.SYMBOL as Symbol',
          'mt4_trades.OPEN_PRICE as PriceOrder',
          'mt4_trades.SL as PriceSL',
          'mt4_trades.TP as PriceTP',
          'mt4_trades.CLOSE_TIME as TimeDone',
          'mt4_trades.CLOSE_PRICE as PriceClose',
          'mt4_trades.PROFIT as Profit',
          'mt4_trades.SWAPS as Storage',
          'mt4_trades.COMMISSION as Commission',
          'mt4_trades.COMMENT as Comment',
          'mt4_users.BALANCE as Balance',
          'mt4_users.EQUITY as Equity',
          'mt4_users.GROUP as Group'
        )
        .orderBy('mt4_trades.OPEN_TIME', 'desc')
        // pagination
        .forPage(
          page,
          limit && Number(limit) !== -1
            ? limit
            : Number(limit) === -1
            ? 9999999
            : 10 // default rowsPerPage 10/2 = 5
        )
      return tradesHistory ? tradesHistory : []
    } catch (closedTradesDetailError) {
      console.log(closedTradesDetailError)
      return []
    }
  }

  /**
   * Getting the Summation of Profit, Loss, Lots
   * @param request
   * @param account_type
   * @param is_mt5
   * @param is_live
   * @param status // 2 means both active/inactive, 1 means active, 0 means inactive
   */
  async getClosedTradesSummation(
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

      let totalAmount = await Database.table('mt4_trades')
        // joining the client_trading_accounts
        .innerJoin(
          'client_trading_accounts',
          'client_trading_accounts.trading_account_no',
          'mt4_trades.LOGIN'
        )
        // joining the trading_account_types
        .innerJoin(
          'trading_account_types',
          'trading_account_types.id',
          'client_trading_accounts.trading_account_type_id'
        )
        .where('client_trading_accounts.is_mt5', 0) // mt4 only
        .where('client_trading_accounts.is_live', 1) // live only
        .where('client_trading_accounts.is_testing', 0) // only Real
        .where('mt4_trades.CLOSE_TIME', '<>', '1970-01-01 00:00:00') // closed only
        .where('mt4_trades.CMD', '<', 2) // BUY/SELL only
        /** Group Filtering */
        // .where(function () {
        //   if (group_name && group_name !== '') {
        //     this.where(
        //       'client_trading_accounts.trading_account_type_id',
        //       Number(group_name)
        //     )
        //   } else {
        //     1 // for all group
        //   }
        // })
        /** End of Group Filtering */
        // search criteria
        .where(function () {
          if (search && search !== '') {
            this.where('mt4_trades.TICKET', 'LIKE', '%' + search + '%')
              .orWhere('mt4_trades.SYMBOL', 'LIKE', '%' + search + '%')
              .orWhere('mt4_trades.LOGIN', 'LIKE', '%' + search + '%')
              .orWhere(
                'trading_account_types.account_type_display',
                'LIKE',
                '%' + search + '%'
              )
              .orWhere(
                'trading_account_types.account_type_real',
                'LIKE',
                '%' + search + '%'
              )
          } else {
            1 // all search
          }
        })
        // end of search options
        /** Date Options */
        .where(function () {
          if (
            fromDate &&
            toDate &&
            fromDate !== moment().format('YYYY-MM-DD') &&
            toDate !== moment().format('YYYY-MM-DD')
          ) {
            this.whereBetween('mt4_trades.CLOSE_TIME', [fromDate, toDate])
          } else {
            1 // for all date
          }
        })
        /** End of Date Options */
        /** Profit/Loss Options */
        .where(function () {
          if (sumField && sumField === 'Profit') {
            this.where('mt4_trades.PROFIT', '>', 0)
          }
          if (sumField && sumField === 'Loss') {
            this.where('mt4_trades.PROFIT', '<', 0)
          } else {
            1
          }
        })
        /** End of Profit/Loss Options */
        .sum(
          sumField === 'Profit'
            ? 'mt4_trades.PROFIT as TotalValue'
            : sumField === 'Loss'
            ? 'mt4_trades.PROFIT as TotalValue'
            : sumField === 'Lot'
            ? 'mt4_trades.VOLUME as TotalValue'
            : 'mt4_trades.PROFIT'
        )
      // console.log(totalAmount)
      return totalAmount ? totalAmount[0].TotalValue.toFixed(2) : 0
    } catch (summationError) {
      return 0
    }
  }
}

module.exports = TradeServices
