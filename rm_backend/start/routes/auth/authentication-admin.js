/**
 ** File Name: authentication.js
 ** All the incoming request for Authentication Admin Frontend will be defined here.
 ** Namespace: /start/routes/auth
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Limited
 **/
'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
/** Logging Users */
Route.post('/auth/login', 'AdminController.postLogin')
  .as('loginAdmin')
  .namespace('Admin')
  .prefix('/admin')
// .validator('Auth/Login')
/** Admin Info */
Route.get('/user/info', 'AdminController.getAdminInfo')
  .as('getAdminInfo')
  .namespace('Admin')
  // .prefix('/admin')
  // .middleware('auth:jwt')

// Route.get('/auth/refresh', 'AuthenticationController.refreshToken').as(
//   'refreshToken'
// )

// refresh token
Route.post(
  '/auth/token/refresh',
  'AdminController.postTokenRefresh'
).as('auth.token.refresh')