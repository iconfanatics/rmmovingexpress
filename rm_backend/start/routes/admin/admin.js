'use strict'

/**
 ** File Name: admin.js
 ** This is the entry point for the admin of the Application. All the required routes related to
 ** admin will be defined here.
 ** Namespace: start/routes
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route')


/** Getting all admins */
Route.get('/admins/all', 'AdminController.getAllAdmins').as('admins.all')
// Adding New Admin
Route.post('/admins/add', 'AdminController.postAddAdmin')
  .as('admin.add')

