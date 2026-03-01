/**
 ** File Name: CookiesStorage.js
 ** Handling the Automatic Token Authentication
 ** Namespace: plugins
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'

export default ({ store }) => {
  createPersistedState({
    key: '_zerofx_a_t',
    paths: ['authentication.token'],
    storage: {
      getItem: (key) => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 3 }),
      removeItem: (key) => Cookies.remove(key)
    }
  })(store)
}
