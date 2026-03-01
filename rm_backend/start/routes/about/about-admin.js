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

//  ABOUT US
// Add About Us
Route.post('/about/us/add', 'AboutUsController.addAboutUs').as(
    'clientAboutUsAdd'
  )
// Get About Us
Route.get('/about/us/get', 'AboutUsController.getAboutUs').as(
    'clientAboutUsGet'
  )
// Update About Us
Route.post('/about/us/update', 'AboutUsController.aboutUsUpdate').as(
    'clientAboutUsUpdate'
  )
// Update About Us Status 
Route.post('/about/us/status', 'AboutUsController.aboutUsStatus').as(
    'clientAboutUsUpdate'
  )
// Delete About Us
Route.delete("/about/us/delete/:id", "AboutUsController.deleteAboutUs");



//  Team
// Add Team
Route.post('/team/add', 'TeamController.addTeam').as(
    'clientTeamAdd'
  )
// Get About Us
Route.get('/team/get', 'TeamController.getTeam').as(
    'clientTeamGet'
  )
// Update About Us
Route.post('/team/update', 'TeamController.teamUpdate').as(
    'clientTeamUpdate'
  )
// Update About Us Status 
Route.post('/team/status', 'TeamController.teamStatus').as(
    'clientTeamUpdate'
  )
// Delete About Us
Route.delete("/team/delete/:id", "TeamController.deleteTeam");

