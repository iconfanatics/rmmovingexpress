/**
 ** File Name: client.js
 ** All the incoming request from Client Frontend will be defined here.
 ** Namespace: /start/routes/
 ** Developed By: Md Mijanur Rahman
 ** Maintained By: Md Mijanur Rahman
 ** Email: mizandev000.com
 **/
'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
/** Getting single Client based on Search Query */
/** Check Client Info*/
// Route.get(
//   '/check/info',
//   'ClientController.getClientInfo'
// ).as('singleClientGetInfo')


/** Update Client First Last Name Gender UserId */

/** Registration Users */
Route.post('/auth/registration', 'ClientController.postRegistration')
  .as('registrationClient')



// Log out client
Route.post('/auth/logout', 'ClientController.logOut').as(
  'logOut'
)

