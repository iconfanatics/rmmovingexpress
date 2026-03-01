/**
 ** File Name: home-client.js
 ** All the incoming request from Client Frontend will be defined here.
 ** Namespace: /start/routes/home/home-client.js
 ** Developed By: Md Mijanur Rahman
 ** Maintained By: Md Mijanur Rahman
 ** Email: mizandev000.com
 **/
 'use strict'

 /** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
 const Route = use('Route')


// get Home Moving Expert
Route.get('/home/moving/expert/all', 'HomePageController.getClientMovingExpert').as(
    'clientMovingExpertGet'
  )
// get Home Service
Route.get('/home/service/all', 'HomePageController.getClientHomeService').as(
    'clientHomeServiceGet'
  )
// get Home testimonial all
Route.get('/home/testimonial/all', 'HomePageController.getClientHomeTestimonial').as(
    'clientHomeTestimonialGet'
  )