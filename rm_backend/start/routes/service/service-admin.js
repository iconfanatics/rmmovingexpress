/**
 ** File Name: appointment.js
 ** All the incoming request from Client Frontend will be defined here.
 ** Namespace: /start/routes/client
 ** Developed By: Md Mijanur Rahman
 ** Maintained By: Md Mijanur Rahman
 ** Email: mizandev000.com
 **/
 'use strict'

 /** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
 const Route = use('Route')

//  SERVIE NAME SECTION
// Add Service Name
Route.post('/service/name/add', 'ServiceNameController.addServiceName').as(
    'clientServiceNameAdd'
  )
// Get Service Name 
Route.get('/service/name/get', 'ServiceNameController.getServiceName').as(
    'clientServiceNameGet'
  )
// Update Service Name 
Route.post('/service/name/update', 'ServiceNameController.updateServiceName').as(
    'clientServiceNameUpdate'
  )
// Update Service Name Status 
Route.post('/service/name/status', 'ServiceNameController.postUpdateServiceNameStatus').as(
    'clientServiceNameStatusUpdate'
  )
// Delete Service Name 
Route.delete("/service/name/delete/:id", "ServiceNameController.deleteServiceName");

//  SERVIE CATEGORY SECTION
// Add Service Category
Route.post('/service/category/add', 'ServiceCategoryController.addServiceCategory').as(
  'clientServiceNameAdd'
)
// get Service Category
Route.get('/service/category/get', 'ServiceCategoryController.getServiceCategory').as(
  'clientServiceNameGet'
)
 // update Service Category
Route.post('/service/category/update', 'ServiceCategoryController.getServiceCategoryUpdate').as(
  'clientServiceCategoryUpdate'
)
 // update Service Category status
Route.post('/service/category/status', 'ServiceCategoryController.getServiceCategoryStatus').as(
  'clientServiceCatStatusGet'
)
// Delete Service Category
Route.delete("/service/category/delete/:id", "ServiceCategoryController.deleteServiceCategory");


//  SERVIE PAGE SECTION
// Add Service content
Route.post('/service/content/add', 'ServiceContentController.addServicePage').as(
  'clientServicePageAdd'
)
// get Service content
Route.get('/service/content/get', 'ServiceContentController.getServicePage').as(
  'clientServicePageGet'
)

// get Service content
Route.get('/service/content/single/get', 'ServiceContentController.getServiceSignlePage').as(
  'clientServiceSignlePageGet'
)
 // update Service content
Route.post('/service/content/update', 'ServiceContentController.getServicePageUpdate').as(
  'clientServiceCategoryUpdate'
)
//  // update Service content status
Route.post('/service/content/status', 'ServiceContentController.getServicePageStatus').as(
  'clientServicePageStatus'
)
// Delete Service content
Route.delete("/service/content/delete/:id", "ServiceContentController.deleteServicePage");



//  SERVIE SECTION TWO
// Add Service section two
Route.post('/service/section/two/add', 'ServiceSectionTwoController.addServiceSectionTwo').as(
  'clientServiceSectionTwoAdd'
)
// get Service section two
Route.get('/service/section/two/get', 'ServiceSectionTwoController.getServiceSectionTwoPage').as(
  'clientServiceSectionTwoSignleGet'
)
// get Service section two
Route.get('/service/section/two/single/get', 'ServiceSectionTwoController.getServiceSectionTwoSignle').as(
  'clientServiceSectionTwoPageGet'
)
 // update Service section two
Route.post('/service/section/two/update', 'ServiceSectionTwoController.getServiceSectionTwoUpdate').as(
  'clientServiceSectionTwoUpdateUpdate'
)

// Delete Service section two
Route.delete("/service/section/two/delete/:id", "ServiceSectionTwoController.deleteServiceSectionTwo");



//  SERVIE FAQS SECTION
// Add Service faq
Route.post('/service/faq/add', 'FaqController.addServiceFaq').as(
  'clientServiceFaqAdd'
)
// get Service faq
Route.get('/service/faq/get', 'FaqController.getServiceFaq').as(
  'clientServiceFaqGet'
)
// get Service faq
Route.get('/service/faq/signle/get', 'FaqController.getServiceSignleFaq').as(
  'clientServiceSignleFaqGet'
)
 // update Service faq
Route.post('/service/faq/update', 'FaqController.getServiceFaqUpdate').as(
  'clientServiceCategoryUpdate'
)
//  // update Service faq status
Route.post('/service/faq/status', 'FaqController.updateServiceFaqStatus').as(
  'clientServiceFaqStatus'
)
// Delete Service faq
Route.delete("/service/faq/delete/:id", "FaqController.deleteServiceFaq");




//  SERVIE BANNER SECTION
// Add Service banner
Route.post('/service/banner/add', 'ServiceBannerController.addServiceBanner').as(
  'clientServiceBannerAdd'
)
// get Service banner
Route.get('/service/banner/get', 'ServiceBannerController.getServiceBanner').as(
  'clientServiceBannerGet'
)
// get Service banner
Route.get('/service/banner/signle/get', 'ServiceBannerController.getServiceSignleBanner').as(
  'clientServiceSignleBannerGet'
)
 // update Service banner
Route.post('/service/banner/update', 'ServiceBannerController.getServiceBannerUpdate').as(
  'clientServiceBannerUpdate'
)
//  // update Service banner status
Route.post('/service/banner/status', 'ServiceBannerController.updateServiceBannerStatus').as(
  'clientServiceBannerStatus'
)
// Delete Service banner
Route.delete("/service/banner/delete/:id", "ServiceBannerController.deleteServiceBanner");
