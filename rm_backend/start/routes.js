/**
 ** File Name: routes.js
 ** Entry Point of the EarthSquare Application
 ** Namespace: start/
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
/**
 * Importing the required reoutes for both Admin & Client
 */
/** Authentication Section */
Route.group(() => {
  // Admin Authentication
  require('./routes/auth/authentication-admin.js')
}).prefix('/api/v1')
/** Admin Routes */
Route.group(() => {
  require('./routes/admins')
})
  .prefix('/api/v1/admin')
  .namespace('Admin')
  .middleware(['auth:jwtAdmin'])
/** Client Routes */
Route.group(() => {
  require('./routes/clients')
})
  .prefix('/api/v1/client')
  .namespace('Client')
  .middleware(['auth:jwt'])

/** Common Routes */
Route.group(() => {
  require('./routes/commons')
})
  .prefix('/api/v1/common')
  .namespace('Common')



/* Shceduler */
// require('./Schedulers')
