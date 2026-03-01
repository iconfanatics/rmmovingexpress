/**
 ** File Name: index.js
 ** Index file of store
 ** Namespace: store
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
import {
  fetchGroups,
  fetchLeverages,
  fetchNotifications
} from '~/__helpers/variables'

export const state = () => ({
  accountTypes: [],
  leverages: [],
  ip_address: '',
  singleClientWallets: [
    { wallet: 'Cash Wallet', balance: 0, wallet_id: 1 },
    { wallet: 'Commission Wallet', balance: 0, wallet_id: 7 }
  ],
  notifications: [],
  notificationCounter: 0,
  notificationSocketStatus: false
})
export const getters = {}
export const mutations = {
  /** Setting Account Types */
  SET_ACCOUNT_TYPES(state, types) {
    state.accountTypes = types
  },
  /** Setting Leverages */
  SET_LEVERAGES(state, leverages) {
    state.leverages = leverages
  },
  /** Setting IP Address */
  SET_IP_ADDRESS(state, address) {
    state.ip_address = address && address != null ? address.ip : null
  },
  /** Setting the Single Client Wallets */
  SET_SINGLE_CLIENT_WALLETS(state, wallets) {
    state.singleClientWallets = wallets
  },
  /** Set Notifications */
  SET_NOTIFICATIONS(state, nots) {
    state.notifications = nots
  },
  ADD_NOTIFICATIONS(state, noti) {
    state.notifications.unshift(noti)
  },
  /** Reset Notifications */
  RESET_NOTIFICATIONS(state) {
    state.notifications = []
  },
  /** Set Notifications Counter */
  SET_NOTIFICATIONS_COUNTER(state, counter) {
    state.notificationCounter = counter
  },
  /** Increase Notifications */
  INCREASE_NOTIFICATIONS_COUNTER(state) {
    state.notificationCounter = +state.notificationCounter + +1
  },
  /** Decrease Notifications */
  DECREASE_NOTIFICATIONS_COUNTER(state) {
    state.notificationCounter != 0 ? state.notificationCounter-- : 0
  },
  /** Reset Notifications Counter */
  RESET_NOTIFICATIONS_COUNTER(state) {
    state.notificationCounter = 0
  },
  /** Setting the status of the Notification Socket Initialization */
  SET_NOTIFICATION_SOCKET_INITIALIZATION_STATUS(state, status) {
    state.notificationSocketStatus = status
  }
}
export const actions = {
  /**
   * Nuxt Server Init To fetch Common Data
   * This will be used throughout the application
   * @param null
   */
  async nuxtServerInit({ commit, dispatch }, { req, $axios }) {
    // Getting the IP Address of the visitor
    await $axios
      .$get('https://jsonip.com/', { mode: 'cors' })
      .then((response) => {
        commit('SET_IP_ADDRESS', response)
      })
      .catch((error) => {
        commit('SET_IP_ADDRESS', null)
      })
    // getting the Account Types/Groups
    await this.$axios
      .$get(fetchGroups)
      .then((response) => {
        commit('SET_ACCOUNT_TYPES', response)
      })
      .catch((error) => {})
    // getting the Leverages
    await this.$axios
      .$get(fetchLeverages)
      .then((response) => {
        commit('SET_LEVERAGES', response)
      })
      .catch((error) => {})
  },
  /**
   * Getting all Unread Notifications
   * @param null
   */
  async getAllUnreadNotifications({ state, commit }) {
    let _this = this
    try {
      // getting the Notifications
      await _this.$axios
        .$get(fetchNotifications)
        .then((response) => {
          commit('SET_NOTIFICATIONS', response.notifications)
          commit('SET_NOTIFICATIONS_COUNTER', response.totalNotifications)
        })
        .catch((error) => {})
    } catch (unreadNotiError) {}
  },
  /**
   * Initializing the Socket Connection
   * Instead of each layout, doing it in the store
   * @param null
   */
  async initializeSocket({ commit }) {
    let _this = this
    try {
      // console.log(_this.$ws1)
      // const notificationController = _this.$notificationSocketController
      // checking this is already subscribed or not
      const checkSubscription = _this.$ws1.getSubscription('notification')
      let notificationController = ''
      if (checkSubscription && checkSubscription != undefined) {
        notificationController = checkSubscription
      } else {
        notificationController = _this.$ws1.subscribe('notification')
      }
      if (
        notificationController &&
        notificationController != null &&
        notificationController != undefined
      ) {
        // Updating the socket initialization status
        commit('SET_NOTIFICATION_SOCKET_INITIALIZATION_STATUS', true)
        /**
         * Receiving the Emitted Message from Backend
         * @param event // new notification object
         */
        notificationController.on('newnotification', (event) => {
          commit('ADD_NOTIFICATIONS', event)
          commit('INCREASE_NOTIFICATIONS_COUNTER')
        })
      }
    } catch (socketInitializationError) {}
  },
  /**
   * Logging Out the Account/User
   * @param null
   */
  async logout() {
    let _this = this
    try {
      // logout request to nuxt server-side to logout from Backend api
      _this.$axios
        .$post(`${process.env.BASE_URL || 'http://localhost:3001'}/napi/logout`)
        .then((response) => {})
        .catch((err) => {})
      // logout from browser
      _this.$auth.logout()
      _this.$toast.success(
        _this.$i18n.t('commons.logoutText'),
        'topRight',
        5000,
        'success'
      )
      return _this.$router.push(_this.app.localePath('login'))
    } catch (logoutError) {
      _this.$toast.error(
        _this.$i18n.t('commons.commonError'),
        'topRight',
        5000,
        'error'
      )
    }
  },
  /**
   * Fullscreen Window
   * @param null
   */
  async controlAppScreen() {
    try {
      var fullScreenWindowss = new fullScreenWindow()
    } catch (error) {}
  }
}
