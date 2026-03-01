  /**
 ** File Name: about-client.js
 ** All the incoming request from Client Frontend will be defined here.
 ** Namespace: /start/routes/about/about-client.js
 ** Developed By: Md Mijanur Rahman
 ** Maintained By: Md Mijanur Rahman
 ** Email: mizandev000.com
 **/
 'use strict'

 /** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
 const Route = use('Route')

Route.get('/test/about', async ({ response }) => {
  return response.json({
    status: 'success',
    message: 'Test route working!',
  })
}).as('testRoute')

Route.get('/company/information', 'AboutUsClientController.getCompanyInformation').as(
    'clientCompanyInformationGet'
  )
Route.get('/company/team', 'AboutUsClientController.getClientTeam').as(
    'clientCompanyTeamGet'
  )