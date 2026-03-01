import Auth from './auth'

import './middleware'

// Active schemes
import scheme_003d9a64 from './schemes/local.js'
import scheme_c4abc344 from './schemes/_2FAStrategy.js'
import scheme_236b4855 from './schemes/_authStrategy.js'

export default function (ctx, inject) {
  // Options
  const options = {"resetOnError":false,"scopeKey":"scope","rewriteRedirects":true,"fullPathRedirect":false,"watchLoggedIn":true,"redirect":{"login":"/login","logout":"/login","home":"/","callback":false},"vuex":{"namespace":"auth"},"cookie":{"prefix":"","options":{"path":"/"}},"localStorage":false,"token":{"prefix":"_najd_a_t_"},"refresh_token":{"prefix":"_najd_a_r_t_"},"defaultStrategy":"local","tokenRequired":true,"tokenName":"Authorization","tokenType":"Bearer"}

  // Create a new Auth instance
  const $auth = new Auth(ctx, options)

  // Register strategies
  // local
  $auth.registerStrategy('local', new scheme_003d9a64($auth, {"endpoints":{"login":{"url":"/api/auth/login","method":"post","propertyName":"token"},"logout":{"url":"/api/auth/logout","method":"post"},"user":{"url":"/api/auth/user","method":"get","propertyName":"user"}},"_name":"local"}))

  // _2FA
  $auth.registerStrategy('_2FA', new scheme_c4abc344($auth, {"endpoints":{"login":{"url":"/login/2fa","method":"post","propertyName":"data.token"},"user":{"url":"/user/info","method":"get","propertyName":false},"logout":false},"autoFetchUser":false,"_name":"_2FA"}))

  // _local
  $auth.registerStrategy('_local', new scheme_236b4855($auth, {"endpoints":{"login":{"url":"admin/auth/login","method":"post","propertyName":"data.token"},"user":{"url":"/user/info","method":"get","propertyName":false},"logout":false},"autoFetchUser":false,"_name":"_local"}))

  // Inject it to nuxt context as $auth
  inject('auth', $auth)
  ctx.$auth = $auth

  // Initialize auth
  return $auth.init().catch(error => {
    if (process.client) {
      console.error('[ERROR] [AUTH]', error)
    }
  })
}
