/**
 ** File Name: Notifications.js
 ** Handling the Toast Messages
 ** Namespace: plugins/
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/

import Vue from 'vue'
import swal from 'sweetalert2'
/** Notifications */
import Toast from 'izitoast' // https://github.com/dolce/iziToast
import 'izitoast/dist/css/iziToast.min.css'
import '@sweetalert2/themes/borderless/borderless.scss'

/** Declaring Different Toast Types */
const toast = {
  // Success Notification
  success: (
    message,
    position = 'topRight',
    timeout = 5000,
    title = 'Success'
  ) => {
    return Toast.success({
      // title: '',
      message: message,
      position: position,
      timeout: timeout
    })
  },
  // End of Success Notification
  // Error Notification
  error: (message, position = 'topRight', timeout = 5000, title = 'Error') => {
    return Toast.error({
      // title: '',
      message: message,
      position: position,
      timeout: timeout
    })
  },
  // End of Error Notification
  // Info Notification
  info: (message, position = 'topRight', timeout = 5000, title = 'Info') => {
    return Toast.info({
      // title: '',
      message: message,
      position: position,
      timeout: timeout
    })
  },
  // End of Info Notification
  // Warning Notification
  warning: (
    message,
    position = 'topRight',
    timeout = 5000,
    title = 'Warning'
  ) => {
    return Toast.warning({
      // title: '',
      message: message,
      position: position,
      timeout: timeout
    })
  }
  // End of Warning Notification
}

export default ({ app }, inject) => {
  // Injecting toast Message for server side Access
  inject('toast', toast)
}

/** Declaration for Global Use */
Vue.prototype.$toast = toast
Vue.prototype.$swal = swal
