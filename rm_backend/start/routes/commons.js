/**
 ** File Name: admins.js
 ** All the incoming request from Admin/Client Frontend (Which is common for both admin and client) will be defined here.
 ** Namespace: /start/routes/
 ** Developed By: Md Mijanur Rahman.
 ** Maintained By: Md Mijanur Rahman.
 ** Email: mizandev000@gmail.com
 **/
'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
/** Authentication */
// require('./auth/authentication.js')
/** Service */
require('./service/service.js')
/** Blog */
require('./blog/client-blog.js')
/** Moving Expert */
require('./home/home-client.js')
/** About */
require('./about/about-client.js')
/** Service */
require('./service/service-client.js')