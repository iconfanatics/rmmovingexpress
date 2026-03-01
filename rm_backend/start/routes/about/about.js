/**
 ** File Name: about-client.js
 ** All the incoming request from Client Frontend will be defined here.
 ** Namespace: /start/routes/client
 ** Developed By: Md Mijanur Rahman
 ** Maintained By: Md Mijanur Rahman
 ** Email: mizandev000.com
 **/
 'use strict'

 /** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
 const Route = use('Route')

//  CHAIRMAN SECTION
// chairman get all
Route.get('/chairman/message', 'AboutController.getChairman').as(
  'clientChairmanGet'
)
// company information get all
Route.get('/company/information', 'AboutController.getCompanyInformation').as(
  'clientCompanyInformationGet'
)
// company team members all
Route.get('/team/members', 'AboutController.getTeamMember').as(
  'clientTeamMemberGet'
)
// company team members all
Route.get('/official/documents', 'AboutController.getOfficialDocument').as(
  'clientOfficialDocumentGet'
)
// resources all
Route.get('/resources', 'AboutController.getResources').as(
  'clientResourcesGet'
)
// project all
Route.get('/project', 'AboutController.getProject').as(
  'clientProjectGet'
)
