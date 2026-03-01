/**
 ** File Name: home-admin.js
 ** All the incoming request from Client Frontend will be defined here.
 ** Namespace: /start/routes/client
 ** Developed By: Md Mijanur Rahman
 ** Maintained By: Md Mijanur Rahman
 ** Email: mizandev000.com
 **/
 'use strict'

 /** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
 const Route = use('Route')

//  HOME SLIDER
// Add Home Slider
Route.post('/home/banner/add', 'HomeBannerController.addHomeSlider').as(
    'clientServiceNameAdd'
  )
// Get Home Slider
Route.get('/home/banner/get', 'HomeBannerController.getHomeBanner').as(
    'clientServiceNameGet'
  )
// Update Home Slider
Route.post('/home/banner/update', 'HomeBannerController.updateHomeBanner').as(
    'clientServiceNameUpdate'
  )
// Update Home Slider Status 
Route.post('/home/banner/status', 'HomeBannerController.postHomeBannerStatus').as(
    'clientHomeBannerStatus'
  )
// Delete Home Slider
Route.delete("/home/banner/delete/:id", "HomeBannerController.deleteHomeSlider");


//  Moving Expert
// Add Moving Expert
Route.post('/moving/expert/add', 'HouseMovingExpertController.addMovingExpert').as(
  'clientMovingExpertAdd'
)
// Get Moving Expert
Route.get('/moving/expert/get', 'HouseMovingExpertController.getMovingExpert').as(
  'clientMovingExpertGet'
)
// Update Moving Expert
Route.post('/moving/expert/update', 'HouseMovingExpertController.movingExpertUpdate').as(
  'clientMovingExpertUpdate'
)
// Update Moving Expert Status 
Route.post('/moving/expert/status', 'HouseMovingExpertController.getServicePageStatus').as(
  'clientServicePageStatusUpdate'
)
// Delete Moving Expert
Route.delete("/moving/expert/delete/:id", "HouseMovingExpertController.deleteMovingExpert");


//  Happy Customer
// Add Happy Customer
Route.post('/happy/customer/add', 'HappyCustomerController.addHappyCustomer').as(
  'clientMovingExpertAdd'
)
// Get Happy Customer
Route.get('/happy/customer/get', 'HappyCustomerController.getHappyCustomer').as(
  'clientMovingExpertGet'
)
// Update Happy Customer
Route.post('/happy/customer/update', 'HappyCustomerController.happyCustomerUpdate').as(
  'clientMovingExpertUpdate'
)
// Update Happy Customer Status 
Route.post('/happy/customer/status', 'HappyCustomerController.getHappyCustomerStatus').as(
  'clientServicePageStatusUpdate'
)
// Delete Happy Customer
Route.delete("/happy/customer/delete/:id", "HappyCustomerController.deleteHappyCustomer");


//  Home Service
// Add Home Service
Route.post('/home/service/add', 'HomeServiceController.addHomeService').as(
  'clientHomeServiceAdd'
)
// Get Home Service
Route.get('/home/service/get', 'HomeServiceController.getHomeService').as(
  'clientHomeServiceGet'
)
// Update Home Service
Route.post('/home/service/update', 'HomeServiceController.homeServiceUpdate').as(
  'clientHomeServiceUpdate'
)
// Update Home Service Status 
Route.post('/home/service/status', 'HomeServiceController.updateHomeServiceStatus').as(
  'clientHomeServiceUpdate'
)
// Delete Home Service
Route.delete("/home/service/delete/:id", "HomeServiceController.deleteHomeService");

//  Home Service
// Add  Home Service
Route.post('/home/service/add', 'HomeServiceController.addHomeService').as(
  'clientServiceNameAdd'
)
// Get  Home Service
Route.get('/home/service/get', 'HomeServiceController.getHomeService').as(
  'clientServiceNameGet'
)
// Update  Home Service
Route.post('/home/service/update', 'HomeServiceController.updateHomeService').as(
  'clientServiceNameUpdate'
)
// Update  Home Service Status 
Route.post('/home/service/status', 'HomeServiceController.homeServiceStatus').as(
  'clientServiceNameStatusUpdate'
)
// Delete  Home Service
Route.delete("/home/service/delete/:id", "HomeServiceController.deleteHomeService");

