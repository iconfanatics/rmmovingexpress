'use strict'

/**
 ** File Name: Blog.js
 ** Controlling Common Section
 ** Namespace: App/Controllers/Http/Common
 ** Developed By: Md. Mijanur Rahman
 ** Maintained By: Md. Mijanur Rahman
 ** Email: mizandev000@gmail.com
 **/


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
      .where('status', 1)
        .select(
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
   * Show a list of single blogs.
   * GET blogs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
async getBlogSingle({ params, response }) {
  try {
    const { slug } = params;

    console.log("slug from route:", slug);

    const blog = await Blog.query()
      .where('status', 1)
      .where('slug', slug)
      .select('title', 'details', 'photo', 'status')
      .first();

    if (!blog) {
      return response.status(404).json({
        message: 'Blog not found',
      });
    }

    return blog;
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Something went wrong',
    });
  }
}

   /**
   * Show a list of all blogs.
   * GET blogs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async getBlogDetails ({ request, response }) {
    try {
      // Getting all the Blog
      const blog = await Blog.query()
      .where('status', 1)
        .select(
          'title',
          'details',
          'photo',
          'status'
        )
        // .fetch()
        .orderBy("id", "DESC")
        // .fetch();
        .paginate(1, 5);
        // .paginate(1, 1);
      return blog
    } catch (blogError) {
      console.log(blogError)
    }
  }

}

module.exports = BlogController
