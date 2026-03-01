/**
 ** File Name: HTTP.js
 ** This is a custom plugin for handling all request going through AXIOS
 ** Namespace: plugins
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/

/** Modules */
import Cookies from 'js-cookie'
import swal from 'sweetalert2'
/** End of Modules */

/**
 * Creating Custom Instance for AXIOS
 */
export default function({ $axios, app, $nuxt }) {
  $axios.onRequest((config) => {
    // reading language from cookies and sending it as Accept-language
    config.headers.common['Accept-language'] = Cookies.get('admin_language')
      ? Cookies.get('admin_language')
      : 'en'
    // Setting the IP ADDRESS with header
    config.headers.common['ip-address'] =
      app && app.store && app.store.state && app.store.state.ip_address
        ? app.store.state.ip_address
        : null
  })

  /** request refresh token if JWT expired */
  $axios.onError(async (error) => {
    let originalRequest = error.config
    if (error && error.response && error.response.status === 401) {
      return new Promise((resolve, reject) => {
        // Send request to nuxt server-side to get refresh token from Backend api
        $axios
          .post(
            `${process.env.BASE_URL ||
              'http://localhost:3001'}/napi/get-refresh-token`
          )
          .then(async (response) => {
            if (response.status == 200) {
              // set new access token
              await app.$auth.setUserToken(response.data.tokens.token)
              // change Authorization header with new access token
              originalRequest.headers[
                'Authorization'
              ] = `Bearer ${response.data.tokens.token}`
            }
            resolve(response)
          })
          .catch((e) => {
            app.$auth.logout()
          })
      })
        .then((res) => {
          if (res.status == 200) {
            return $axios(originalRequest)
          } else {
            app.$auth.logout()
          }
        })
        .catch((e) => {
          app.$auth.logout()
        })
    } else if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.status == 500 &&
      error.response.data.code == 'Refresh_Token_Error'
    ) {
      try {
        app.$auth.logout()
      } catch (error) {
        console.log(error)
      }
    }
  })

  /** Response Interceptor */
  $axios.onResponse((response) => {
    // console.log('response', response)
    response = response && response.data ? response.data : null
    /** Redirecting to 404/500 page if response is 404/405/500/403 */
    if (
      response &&
      response.TYPE === 'error' &&
      response.CODE === 'Z_RESOURCE_MISSING'
    ) {
      return $nuxt.error({
        statusCode: 404,
        message: response.MESSAGE
      })
    } else if (
      response &&
      response.TYPE === 'error' &&
      response.CODE === 'Z_ACCESS_DENIED'
    ) {
      if (response.METHOD === 'POST') {
        swal.fire({
          icon: 'error',
          title: 'ACCESS DENIED!',
          text: "You don't have permissions to access this resource."
        })
        return 1
      }
      return $nuxt.error({
        statusCode: 403,
        message: response.MESSAGE,
        resource: response.RESOURCE
      })
    }
  })
}
