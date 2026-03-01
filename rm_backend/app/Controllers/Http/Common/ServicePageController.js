'use strict'

/**
 ** File Name: ServicePageController.js
 ** Controlling Client Section
 ** Namespace: App/Controllers/Http/Client
 ** Developed By: Md. Mijanur Rahman
 ** Maintained By: Md. Mijanur Rahman
 ** Email: mizandev000@gmail.com
 **/

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

 /** Models Section */
 const ServiceName = use('App/Models/ServiceName')

/**
 * Resourceful controller for interacting with servicepages
 */
class ServicePageController {
  
   /**
   * Show a All Service Name
   * GET Service Name
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async getServicePage({ request, response, params }) {
    try {
      const param = params.params.replace(/%0A/gi, '');
       
      // Getting all the Advertisements
      const servicePage = await ServiceName.query()
        .with('banner', (builder) => {
          builder.select(
          'id',
          'service_name_id',
          'title',
          'sub_title'
        )
        })
        .with('content', (builder) => {
          builder.select(
          'id',
          'service_name_id ',
          'sort_title',
          'title',
          'details',
          'costs_title',
          'costs_details',
          'position',
          'photo',
          'status'
        )
        })
        .with('sectionTwo', (builder) => {
          builder.select(
          'id',
          'service_name_id',
          'title',
          'sub_title',
          'details',
          'need_title',
          'need_details'
        )
        })
        .with('faq', (builder) => {
          builder.select(
          'id',
          'service_name_id',
          'title',
          'sub_title'
        )
        })
        .where('pretty_name', param)
        .select('id', 'name', 'pretty_name')
        .first()
      return servicePage
    } catch (servicePageError) {
      console.log(servicePageError)
    }
  }

      /**
   * Display Service Menu
   * GET contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  
   async getServiceMenu ({ auth, request, response }) {
    try{
      const serviceNameInfo = await ServiceName.query()
      .select(
         'id',
          'name',
          'pretty_name',
          'status'
      )
      .fetch();

      return serviceNameInfo

    }catch(serviceNameInfoError){
      console.log(serviceNameInfoError)
    }
  }
  
}

module.exports = ServicePageController
