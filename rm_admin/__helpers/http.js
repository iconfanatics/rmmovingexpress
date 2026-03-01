/**
 ** http.js
 ** Module to handle AXIOS Requests
 ** __hepers
 ** Developed By: Devech Ltd.
 ** Company Website: https://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Contact Info:
 ** License:
 **/

import axios from 'axios'
export default () => {
  const instance = axios.create({
    baseURL: store.state.baseUrl,
    // timeout: 50000,
    headers: {
      Authorization: `Bearer ${store.state.authentication.token}`,
      locale: 'en'
    }
  })
  /** Axios Interceptors */
  instance.interceptors.response.use(
    function(response) {
      return response
    },
    function(error) {
      const originalRequest = error.config
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        store.commit('authentication/REMOVE_TOKEN')
      }
      return Promise.reject(error)
    }
  )
  /** End of Interceptors */
  return instance
}
