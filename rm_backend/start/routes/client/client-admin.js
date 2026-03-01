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

/** Getting All Client */
Route.get('/client/all', 'ClientController.getAllClients').as(
  'adminAllClientsGet'
)
/** Getting Search Client */
Route.get('/client/search', 'ClientController.getSearchClients').as(
  'adminSearchClientsGet'
)
/** Updating Client */
Route.post('/client/change', 'ClientController.clientsChange').as(
  'adminClientsChangeGet'
)
/** Getting All settings */
Route.get('/settings/all', 'ClientController.getAllSettings').as(
  'adminAllSettingsGet'
)
/** Updating settings */
Route.post('/settings/update', 'ClientController.updateSettings').as(
  'adminSettingsUpdate'
)
/** Get Office */
Route.get('/office/all', 'CompanySettingController.getOffice').as(
  'adminOfficeGet'
)
/** Add Office */
Route.post('/office/add', 'CompanySettingController.postOffice').as(
  'adminOfficeAdd'
)
/** Updating Office Status */
Route.post('/office/change', 'CompanySettingController.officeChange').as(
  'adminOfficeChange'
)
/** Updating Office */
Route.post('/office/update', 'CompanySettingController.updateOffice').as(
  'adminOfficeUpdate'
)
/** Delete Office */
Route.delete("office/delete/:id", "CompanySettingController.deleteOffice");

/** Add Payment */
Route.post('/payment/image/add', 'CompanySettingController.postPayment').as(
  'adminPaymentAdd'
)
/** Getting Payment */
Route.get('/payment/image/all', 'CompanySettingController.getPayment').as(
  'adminPaymentGet'
)
/** Updating Payment */
Route.post('/payment/image/update', 'CompanySettingController.updatePayment').as(
  'adminPaymentUpdate'
)
/** Updating Payment Status */
Route.post('/payment/image/change', 'CompanySettingController.paymentStatusChange').as(
  'adminPaymentStatusChange'
)
/** Delete Payment */
Route.delete("payment/delete/:id", "CompanySettingController.deletePayment");

/** Add Support */
Route.post('/support/add', 'CompanySettingController.postSupport').as(
  'adminSupportAdd'
)
/** Updating Support */
Route.post('/support/update', 'CompanySettingController.updateSupport').as(
  'adminSupportUpdate'
)
/** Getting Support */
Route.get('/support/all', 'CompanySettingController.getSupport').as(
  'adminSupportGet'
)
/** Delete Support */
Route.delete('/support/delete/:id', 'CompanySettingController.deleteSupport')

/** Add Support Category */
Route.post('/support/category/add', 'CompanySettingController.postSupportCategory').as(
  'adminSupportCategoryAdd'
)
/** Getting Support Category */
Route.get('/support/category/all', 'CompanySettingController.getSupportCategory').as(
  'adminSupportCategoryGet'
)
/** Updating Support Category*/
Route.post('/support/category/update', 'CompanySettingController.updateSupportCategory').as(
  'adminSupportCategoryUpdate'
)
/** Updating Support Category Status */
Route.post('/support/category/change', 'CompanySettingController.supportCategoryChange').as(
  'adminSupportCategoryChange'
)
/** Getting Support Category For Admin */
Route.get('/support/category/admin/all', 'CompanySettingController.getSupportCategoryAdmin').as(
  'adminSupportCategoryAdminGet'
)









