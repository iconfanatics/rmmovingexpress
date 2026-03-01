/**
 ** File Name: service.js
 ** All the incoming request from Client Frontend will be defined here.
 ** Namespace: /start/routes/client
 ** Developed By: Md Mijanur Rahman
 ** Maintained By: Md Mijanur Rahman
 ** Email: mizandev000.com
 **/
 'use strict'

 /** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
 const Route = use('Route')

// service get all
// Route.get('/service/all', 'ServicePageController.getServicePage').as(
//     'clientServiceAllGet'
//   )
  Route.get('/services/menu', 'ServicePageController.getServiceMenu').as(
    'clientServiceMenuGet'
  )

  Route.get('/services/:params', 'ServicePageController.getServicePage').as(
    'clientServicePageGet'
  )


  