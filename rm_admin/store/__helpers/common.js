/**
 ** File Name: common.js
 ** Handling to get all kinds of Commonly Used data
 ** Namespace: store/__helpers
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: MIT
 **/
/** Modules */
import { fetchAllCurrency } from '~/__helpers/variables'

export const strict = process.env.NODE_ENV !== 'production'
export const namespaced = true
export const state = () => ({
  currencies: [] // holding only id and currency_name
})
export const getters = {}
export const mutations = {
  /**
   * Setting the Currency in the Store
   */
  SET_CURRENCY(state, currencies) {
    state.currencies = currencies
  }
}
export const actions = {
  /**
   * Getting all Broker Available Currencies to us throughout the Application
   * @param isCommonUse
   */
  async getBrokerCurrencies({ state, commit }) {
    try {
      let _this = this
      this.$axios
        .get(fetchAllCurrency, {
          params: {
            isCommonUse: 1
          }
        })
        .then((response) => {
          commit('SET_CURRENCY', response.data)
        })
        .catch((error) => {})
    } catch (getCurrenciesError) {}
  }
}
