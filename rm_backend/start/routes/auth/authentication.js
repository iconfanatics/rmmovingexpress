/**
 ** File Name: authentication.js
 ** All the incoming request for Authentication Frontend will be defined here.
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

/** Registration Users */
Route.post('/auth/registration', 'AuthenticationController.postRegistration')
  .as('registrationClient')
  // .validator('Auth/Registration')
  
/** Logging Users */
Route.post('/auth/login', 'AuthenticationController.postLogin')
  .as('loginClient')
  .validator('Auth/Login')

/** Refresh Token */
Route.post('/auth/refresh', 'AuthenticationController.refreshToken').as(
  'refreshToken'
)

