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
Route.get('/blog/get', 'BlogController.getBlog').as(
    'clientBlogGet'
  )
// Add blog 
Route.post('/blog/add', 'BlogController.addBlog').as(
    'clientBlogAdd'
  )
// // Update blog 
Route.post('/blog/update', 'BlogController.updateBlog').as(
    'clientBlogUpdate'
  )

// // Delete blog 
Route.delete("/blog/delete/:id", "BlogController.deleteBlog");

// // Update Status Blog 
Route.post('/blog/status', 'BlogController.blogStatus').as(
    'clientblogStatus'
  )
  