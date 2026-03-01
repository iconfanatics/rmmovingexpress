/**
 ** File Name: buttonloaders.js
 ** Handling all kinds of Loading state
 ** Namespace: store/__helpers
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: MIT
 **/
export const strict = process.env.NODE_ENV !== 'production'
export const namespaced = true
export const state = () => ({
  isCommonLoading: false,
  isAddAccountLoading: false,
  isUpdateServerConfigs: false,
  isSendingPin: false,
  showModalLoader: false,
  modalLoaderMessage: 'Loading...',
  isListItemLoaderLoading: false,
  skeletonType: 'list-item-three-line'
})
export const getters = () => ({})
export const mutations = {
  /**
   * Common Sections
   */
  /** Add New Account */
  SHOW_COMMON_BUTTON_LOADER(state) {
    state.isCommonLoading = true
  },
  HIDE_COMMON_BUTTON_LOADER(state) {
    state.isCommonLoading = false
  },
  /**
   * Common Dialog Loader
   */
  SHOW_LOADER_MODAL_DIALOG(state, message = 'Loading...') {
    state.modalLoaderMessage =
      message && message !== null ? message : state.modalLoaderMessage
    state.showModalLoader = true
  },
  HIDE_LOADER_MODAL_DIALOG(state) {
    state.showModalLoader = false
  },
  /**
   * Accounts Sections
   */
  /** Add New Account */
  SHOW_ADD_ACCOUNT_BUTTON_LOADER(state) {
    state.isAddAccountLoading = true
  },
  HIDE_ADD_ACCOUNT_BUTTON_LOADER(state) {
    state.isAddAccountLoading = false
  },
  /**
   * Settings Sections
   */
  /** Update Server Configs */
  SHOW_UPDATE_CONFIG_BUTTON_LOADER(state) {
    state.isUpdateServerConfigs = true
  },
  HIDE_UPDATE_CONFIG_BUTTON_LOADER(state) {
    state.isUpdateServerConfigs = false
  },
  /** Sendning PIN */
  SHOW_SENDING_PIN_BUTTON_LOADER(state) {
    state.isSendingPin = true
  },
  HIDE_SENDING_PIN_BUTTON_LOADER(state) {
    state.isSendingPin = false
  },
  /**
   * List Item Loader
   */
  SHOW_LIST_ITEM_LOADER(state, type = 'list-item-three-line') {
    state.skeletonType = type
    state.isListItemLoaderLoading = true
  },
  HIDE_LIST_ITEM_LOADER(state) {
    state.isListItemLoaderLoading = false
  }
}
export const actions = {
  /**
   * Showing the Add Account Button Loader
   * @param null
   */
  showAddAccountButtonLoader({ state, commit }) {
    try {
      commit('SHOW_ADD_ACCOUNT_BUTTON_LOADER')
    } catch (error) {
      console.log(error)
    }
  },
  /**
   * Hiding the Add Account ButtonLoader
   * @param null
   */
  hideAddAccountDialog({ state, commit }) {
    try {
      commit('HIDE_ADD_ACCOUNT_BUTTON_LOADER')
    } catch (error) {
      console.log(error)
    }
  }
}
