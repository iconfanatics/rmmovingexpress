/**
 * This Plugin will handle the websocket connection throughout the Application
 */

import Ws from '@adonisjs/websocket-client/index'
import 'babel-polyfill'
import Cookies from 'js-cookie'
export default (ctx, inject, $auth) => {
  const wsEndPoint = ctx.env.WEBSOCKET_CONNECTION_ENDPOINT
  const wsEndPointProtocol = ctx.env.WEBSOCKET_CONNECTION_PROTOCOL
  const wsEndPointPath = ctx.env.WEBSOCKET_CONNECTION_PATH
  // Second Connection
  const wsEndPoint1 = ctx.env.WEBSOCKET_BACKEND_CONNECTION_ENDPOINT
  const wsEndPointProtocol1 = ctx.env.WEBSOCKET_BACKEND_CONNECTION_PROTOCOL
  const wsEndPointPath1 = ctx.env.WEBSOCKET_BACKEND_CONNECTION_PATH
  // checking the path is protected or not
  let currentPath = ctx && ctx.route && ctx.route.path ? ctx.route.path : ''
  const currentLocale =
    ctx && ctx.app && ctx.app.i18n && ctx.app.i18n.locale
      ? ctx.app.i18n.locale
      : 'en'
  if (
    currentPath &&
    currentPath !== '/login' &&
    currentPath !== `/${currentLocale}/login`
  ) {
    // declaring connection endpoint
    const ws = Ws(wsEndPointProtocol + '://' + wsEndPoint, {
      secure: true,
      path: wsEndPointPath || 'zerocrm'
    })
    // connecting to the server/Endpoint
    ws.connect()
    // checking the connection is established or not
    ws.on('open', () => {})
    ws.on('close', () => {})

    // Second Connection
    const ws1 = Ws(wsEndPointProtocol1 + '://' + wsEndPoint1, {
      secure: false,
      path: wsEndPointPath1 || 'zerocrm'
    })
    // connecting to the server/Endpoint
    // ws1.connect()
    let token = null
    if (Cookies.get('strategy') && Cookies.get('strategy') == '_local') {
      token = Cookies.get('_najd_a_t__local')
        ? Cookies.get('_najd_a_t__local')
        : null
    } else if (Cookies.get('strategy') && Cookies.get('strategy') == '_2FA') {
      token = Cookies.get('_najd_a_t__2FA') ? Cookies.get('_najd_a_t__2FA') : null
    }
    token = token ? token.substring(7) : null
    ws1.withJwtToken(token).connect()
    // checking the connection is established or not
    // let notificationController = ''
    ws1.on('open', () => {})
    ws1.on('close', () => {
      if (ctx.store.state.notificationSocketStatus != false) {
        ctx.store.commit('SET_NOTIFICATION_SOCKET_INITIALIZATION_STATUS', false)
      }
    })
    // end of second connection
    // try {
    //   // checking this is already subscribed or not
    //   const checkSubscription = ws1.getSubscription('notification')
    //   if (checkSubscription) {
    //     notificationController = checkSubscription
    //   } else {
    //     notificationController = ws1.subscribe('notification')
    //   }
    // } catch (error) {}
    // Adding NotificationController to the context/ctx (for both client and server)
    // ctx.$notificationSocketController = notificationController
    // inject('notificationSocketController', notificationController)
    // Adding ws to the context/ctx (for both client and server)
    ctx.$ws = ws // adding to context. Will be available as this.$ws
    inject('ws', ws) // injecting for server side
    // Adding ws1 to the context/ctx (for both client and server)
    ctx.$ws1 = ws1 // adding to context. Will be available as this.$ws1
    inject('ws1', ws1) // injecting for server side
  }
}
