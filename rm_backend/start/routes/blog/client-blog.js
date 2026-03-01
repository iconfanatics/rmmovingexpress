/**
 ** File Name: blog.js
 ** All the incoming request from Client Frontend will be defined here.
 ** Namespace: /start/routes/blog
 ** Developed By: Md Mijanur Rahman
 ** Maintained By: Md Mijanur Rahman
 ** Email: mizandev000.com
 **/
 'use strict'

 /** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
 const Route = use('Route')

// Get blog 
Route.get('/blog/all', 'BlogController.getBlog').as(
    'clientBlogGet'
  )
Route.get('/blog/details', 'BlogController.getBlogDetails').as(
    'clientBlogDetailsGet'
  )
Route.get('/blog/:slug', 'BlogController.getBlogSingle')
  .as('clientBlogSingleGet')