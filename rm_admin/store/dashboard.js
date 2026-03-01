/**
 ** File Name: dashboard.js
 ** Handling store for Dashboard
 ** Namespace: store
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
import { getServerConfigs } from '~/__helpers/variables'
export const strict = process.env.NODE_ENV !== 'production'
export const namespaced = true
export const state = () => ({
  serverConfigs: [],
  server: process.server,
  client: process.client
})
export const getters = {}
export const mutations = {
  SET_SERVER_CONFIGURATIONS(state, configs) {
    state.serverConfigs = configs
  }
}
export const actions = {
  /**
   * Getting the Server Configurations data
   * @param null
   */
  async getServerConfigurations({ commit }) {
    try {
      this.$axios
        .$get(getServerConfigs)
        .then((response) => {
          commit('SET_SERVER_CONFIGURATIONS', response)
        })
        .catch((error) => {})
    } catch (configFetchError) {}
  }
}
