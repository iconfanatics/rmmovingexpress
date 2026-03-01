/**
 ** File Name: contact-admin.js
 ** All the incoming request from Client Frontend will be defined here.
 ** Namespace: /start/routes/client
 ** Developed By: Md Mijanur Rahman
 ** Maintained By: Md Mijanur Rahman
 ** Email: mizandev000.com
 **/
 'use strict'

 /** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
 const Route = use('Route')

//  Contact US

// Get Contact US
Route.get('/contact/get', 'ContactController.getContact').as(
    'clientContactGet'
  )
