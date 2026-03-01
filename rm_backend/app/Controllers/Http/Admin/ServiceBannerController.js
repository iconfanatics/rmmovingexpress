'use strict'

/**
 ** File Name: ServiceBannerController.js
 ** Controlling Admin Section
 ** Namespace: App/Controllers/Http/Admin
 ** Developed By: Md. Mijanur Rahman
 ** Maintained By: Md. Mijanur Rahman
 ** Email: mizandev000@gmail.com
 **/

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


/** Models Section */
const ServiceBanner = use('App/Models/ServiceBanner')
const ServiceName = use('App/Models/ServiceName')

/** Exception Section */
const EServices = use('App/Services/Exceptions/ExceptionsServices')
const ExceptionsServices = new EServices()

/**
 * Resourceful controller for interacting with servicebanners
 */
class ServiceBannerController {
  /**
   * Show a list of all servicebanners.
   * GET servicebanners
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async getServiceBannerSignle({ request, response, params }) {
    try {
      const { pageId } = request.all()

      if (!pageId) {
        return response.json({
          STATUS: '400',
          MESSAGE:
            'Page Not Found.',
        })
      }
   
      // Getting Single the service Content
      const serviceBanner = await ServiceBanner.query()
       .with('serviceName', (builder) => {
          builder.select('name', 'pretty_name', 'id')
        })
        .where('service_name_id', pageId)
        .select(
          'id',
          'service_name_id',
          'title',
          'sub_title',
        )
        .fetch()
      return serviceBanner
    } catch (serviceBannerError) {
      console.log(serviceBannerError)
    }
  }

    /**
   * Show a list of all Service Page.
   * GET getServiceBannerPage
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async getServiceBanner({ request, response }) {
    try {
      // Getting all the Service Banner
      const serviceBanner = await ServiceBanner.query()
        .with('serviceName', (builder) => {
          builder.select('name', 'pretty_name', 'id')
        })
        .select(
          'id',
          'service_name_id',
          'title',
          'sub_title',
        )
        .fetch()
      return serviceBanner
    } catch (serviceBannerError) {
      console.log(serviceBannerError)
    }
  }

  /**
   * Render a form to be used for creating a new servicebanner.
   * GET servicebanners/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
    async addServiceBanner ({ request, response, view }) {
  
      try {
        const { 
          service_name_id, 
          title, 
          sub_title,
          } = request.input('serviceInfo')

        // check missing service_name_id
        if (!service_name_id) {
          return ExceptionsServices.resourceMissing('name')
        }
        // check missing title
        if (!title) {
          return ExceptionsServices.resourceMissing('name')
        }
        // check missing sub_title
        if (!sub_title) {
          return ExceptionsServices.resourceMissing('name')
        }

        // Adding Service Banner
        const serviceBanner = new ServiceBanner()
        serviceBanner.service_name_id = service_name_id
        serviceBanner.title = title
        serviceBanner.sub_title = sub_title
        await serviceBanner.save()
        // returning response
        return ExceptionsServices.resourceAddSuccessful('Service Banner')
      } catch (addServiceBannerError) {
          console.log(addServiceBannerError)
      }
  }

   /**
   * Update servicesectiontwo details.
   * PUT or PATCH servicesectiontwos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
    /**
   * Updating Category
   * @param categoryInfo
   * @return {Object}
   */
  
  async getServiceBannerUpdate({ request, response }) {
      try {
        const { 
          id, 
          service_name_id, 
          title, 
          sub_title,
         } = request.input('serviceInfo')
        // check missing name
        if (!id) {
          return ExceptionsServices.resourceMissing('id')
        }
        // check missing service_name_id
        if (!service_name_id) {
          return ExceptionsServices.resourceMissing('name')
        }
        // check missing title
        if (!title) {
          return ExceptionsServices.resourceMissing('Title')
        }
        // check missing sub_title
        if (!sub_title) {
          return ExceptionsServices.resourceMissing('Sub Title')
        }
        // Finding Service Section Two
        const serviceBanner = await ServiceBanner.query()
          .where('id', id)
          .select(
            'id',
            'service_name_id',
            'title',
            'sub_title',
          )
          .first()
        if (serviceBanner && serviceBanner !== undefined) {
          serviceBanner.service_name_id = service_name_id
          serviceBanner.title = title
          serviceBanner.sub_title = sub_title
          await serviceBanner.save()
        }
        // return successful
        return ExceptionsServices.resourceUpdateSuccessful('Service Banner')
      } catch (updateServiceBannerError) {
        console.log(updateServiceBannerError)
      }
    }

 

    /**
   * Delete a servicesectiontwo with id.
   * DELETE servicesectiontwos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
      async deleteServiceBanner({ params, response, request }) {
      try {
        const { id } = params;
       
        const serviceBannerInfo = await ServiceBanner.query()
          .where("id", id)
          .first();

          if (!serviceBannerInfo) {
              return ExceptionsServices.resourceMissing('Service Banner')
          }
       
          await serviceBannerInfo.delete();
          return response.json({
            TYPE: 'success',
            MESSAGE:
              'Service Banner Successfully Deleted',
              serviceBannerInfo: serviceBannerInfo.toJSON(),
          })
    
      } catch (deleteErrorServiceBanner) {
        console.log(deleteErrorServiceBanner);
      }
  }

 
}

module.exports = ServiceBannerController
