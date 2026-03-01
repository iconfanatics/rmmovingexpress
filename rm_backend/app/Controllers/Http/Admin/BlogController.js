'use strict'

/**
 ** File Name: Blog.js
 ** Controlling Admin Section
 ** Namespace: App/Controllers/Http/Admin
 ** Developed By: Md. Mijanur Rahman
 ** Maintained By: Md. Mijanur Rahman
 ** Email: mizandev000@gmail.com
 **/

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** Packages Section */
const moment = use('moment')
const ENV = use("Env");
const Helpers = use("Helpers");
const Drive = use("Drive");
const Jimp = use("jimp");

/** Exception Section */
const EServices = use('App/Services/Exceptions/ExceptionsServices')
const ExceptionsServices = new EServices()


 /** Models Section */
 const Blog = use('App/Models/Blog')

/**
 * Resourceful controller for interacting with blogs
 */
class BlogController {
  /**
   * Show a list of all blogs.
   * GET blogs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async getBlog({ request, response }) {
    try {
      // Getting all the Blog
      const blog = await Blog.query()
        .select(
          'id',
          'title',
          'details',
          'photo',
          'status'
        )
        .fetch();
        // .orderBy("id", "DESC")
        // .paginate(page, limit);
        // .paginate(1, 1);
      return blog
    } catch (blogError) {
      console.log(blogError)
    }
  }

  /**
   * Render a form to be used for creating a new blog.
   * GET blogs/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async addBlog({ request, response }) {
    try {
      const {
        title,
        details,
      } = request.input('newBlog')
      
      const fileInfo = request.file("photo");

        // check photo
        if (!fileInfo) {
            return ExceptionsServices.resourceMissing('Blog image')
        }

        if(fileInfo){
            if (fileInfo.size > 2000000) {
            return response.json({
                STATUS: '400',
                MESSAGE:
                'Keep in mind that the maximum file size for uploading files to Intercom is 2MB.',
            })
            }

        let fileExtension = fileInfo.extname;
        // checking files are valid
        const allowedTypes = ["png", "PNG", "jpg", "jpeg", "JPEG", "JPG", "gif", "GIF", "webp"];

        if (!allowedTypes.includes(fileExtension)) {
            return response.json({
            message: fileExtension + " File Format Not Supported",
            insertError: "File size error",
            });
        }

        let min = 11111111;
        let max = 99999999;
        let random1 = Math.floor(Math.random() * (+max - +min)) + +min;
        let newimageName = random1 + "_blog." + fileExtension;

        var imageUploadUrl = ENV.get("IMG_URL");


    
        await fileInfo.move(Helpers.tmpPath(imageUploadUrl), {
            name: newimageName,
            overwrite: true,
        });

            if (fileInfo.moved()) {
            const blogInfo = new Blog()
            blogInfo.title  = title 
            blogInfo.details  = details  
            blogInfo.photo = newimageName
            await blogInfo.save()

            // Getting last Blog
            const lastBlog = await Blog.query()
            .where('id', blogInfo.id)
            .select(
                'id',
                'title',
                'details',
                'photo',
                'status',
            )
            .first()

            return response.json({
                TYPE: 'success',
                MESSAGE:
                'Blog Content Successfully Added',
                DATA: lastBlog
            })
        }
        
    }
    
      
    } catch (addBlogError) {
      console.log(addBlogError)
    }
  }

  /**
   * Update blog details.
   * PUT or PATCH blogs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async updateBlog({ request, response }) {
    try {
     
      const {
        id,
        title ,
        details
      } = request.input('editBlog')

      console.log( id,
        title ,
        details);
      

      // Finding Blog
      const findBlog = await Blog.query()
        .where('id', id)
        .select(
          'id',
          'title',
          'details',
          'photo',
          'status'
        )
        .first()
        
      if (findBlog && findBlog !== undefined) {

        const fileInfo = request.file("photo");

        if(!fileInfo){
          findBlog.title  = title
          findBlog.details  = details
          await findBlog.save()

          // return successful
          return response.json({
            STATUS: '400',
            TYPE: 'success',
            MESSAGE:
              'Blog Successfully Updated'
          })
        }

           // check photo
           if (fileInfo == null) {
            return response.json({
              STATUS: '400',
              MESSAGE:
                'Blog Image Missing',
            })
          }
  
          if(fileInfo){
            if (fileInfo.size > 2000000) {
              return response.json({
                STATUS: '400',
                MESSAGE:
                  'Keep in mind that the maximum file size for uploading files to Intercom is 2MB.',
              })
            }
  
          let fileExtension = fileInfo.extname;
          // checking files are valid
          const allowedTypes = ["png", "PNG", "jpg", "jpeg", "JPEG", "JPG", "gif", "GIF", "webp"];
  
          if (!allowedTypes.includes(fileExtension)) {
            return response.json({
              STATUS: '400',
              MESSAGE: fileExtension + " File Format Not Supported",
            })
          }
  
          let min = 11111111;
          let max = 99999999;
          let random1 = Math.floor(Math.random() * (+max - +min)) + +min;
          let newimageName = random1 + "_blog." + fileExtension;
  
          var imageUploadUrl = ENV.get("IMG_URL");
  
          await fileInfo.move(Helpers.tmpPath(imageUploadUrl), {
            name: newimageName,
            overwrite: true,
          });
  
            if (fileInfo.moved()) {
              await Drive.delete(imageUploadUrl + findBlog.photo);
              findBlog.title = title
              findBlog.details  = details 
              findBlog.photo = newimageName
              await findBlog.save()

             // return successful
              return response.json({
                STATUS: '400',
                TYPE: 'success',
                MESSAGE:
                  'Blog Successfully Updated'
              })
            }
          
          }
     
      }
     
    } catch (updateBlogError) {
      console.log(updateBlogError)
    }
  }

    /**
   * Updating Blog Status
   * Updating the Status from 1 to 0 or Vice Versa
   * @param categoryId
   * @return {Object}
   */
   async blogStatus({ request, response }) {
    try {
      const { blogId } = request.all()
      if (!blogId || isNaN(blogId)) return 'error'
      // Finding Blog
      const findBlog = await Blog.query()
        .where('id', blogId)
        .select('id', 'status')
        .first()
      if (findBlog && findBlog !== undefined) {
        findBlog.status = findBlog.status === 1 ? 0 : 1
        await findBlog.save()
      }
      // return successful
      return response.json({
        TYPE: 'success',
        MESSAGE:
          'Blog Status Successfully Changed',
        DATA: findBlog
      })
     
    } catch (statusBlogError) {
      console.log(statusBlogError)
    }
  }

  /**
   * Delete a blog with id.
   * DELETE blogs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async deleteBlog({ params, response, request }) {
    try {
      const { id } = params;
     
      const blogInfo = await Blog.query()
        .where("id", id)
        .select("id", "photo")
        .first();

      if (!blogInfo) {
        return response.json({
          STATUS: '400',
          MESSAGE:
            'Please reload the page',
        })
      }
      if (blogInfo != null) {
        const fileName = blogInfo.photo;
        var imageUploadUrl = ENV.get("IMG_URL");
        await Drive.delete(imageUploadUrl + fileName);
      }
      await blogInfo.delete();
      return response.json({
        TYPE: 'success',
        MESSAGE:
          'Blog successfully Deleted',
          blogInfo: blogInfo.toJSON(),
      })
  
    } catch (deleteErrorBlog) {
      console.log(deleteErrorBlog);
    }
  }
}

module.exports = BlogController
