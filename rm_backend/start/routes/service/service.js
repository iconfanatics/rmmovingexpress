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

 /** Get in Touch */
Route.post('/contact', 'ContactController.postContact')
.as('contactClient')
Route.post('/quote', 'ContactController.postQuote')
.as('postQuoteClient')







Route.get('/testsss', async ({ response }) => {
  return response.send('test api is ok')
})

Route.get('/test', async ({ response }) => {
  return response.send('This is a test route')
})
  