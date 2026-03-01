/**
 ** File Name: admins.js
 ** All the incoming request from Admin Frontend will be defined here.
 ** Namespace: /start/routes/
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Limited
 **/
'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

/** Admin Section */
require('./admin/admin.js')
require('./service/service-admin.js')

/** Abuot Section */
require('./about/about-admin.js')


/** Home Section */
require('./home/home-admin.js')

/** blog Section */
require('./blog/admin-blog.js')

/** contact Section */
require('./contact/contact-admin.js')
