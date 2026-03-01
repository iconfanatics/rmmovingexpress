'use strict'

/**
 ** File Name: ServiceContentController.js
 ** Controlling Admin Section
 ** Namespace: App/Controllers/Http/Admin
 ** Developed By: Md. Mijanur Rahman
 ** Maintained By: Md. Mijanur Rahman
 ** Email: mizandev000@gmail.com
 **/

/** Packages Section */
const moment = use('moment')
const Jimp = use("jimp");
const ENV = use("Env");
const Helpers = use("Helpers");
const Drive = use("Drive");

/** Models Section */
const ServiceSectionTwo = use('App/Models/ServiceSectionTwo')
const ServiceName = use('App/Models/ServiceName')

/** Exception Section */
const EServices = use('App/Services/Exceptions/ExceptionsServices')
const ExceptionsServices = new EServices()

/**
 * Resourceful controller for interacting with servicesectiontwos
 */
class ServiceSectionTwoController {
    /**
   * Show a list of all Service Page.
   * GET getServicePage
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async getServiceSectionTwoSignle({ request, response, params }) {
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
      const servicePage = await ServiceSectionTwo.query()
       .with('serviceName', (builder) => {
          builder.select('name', 'pretty_name', 'id')
        })
        .where('service_name_id', pageId)
        .select(
          'id',
          'service_name_id',
          'title',
          'sub_title',
          'details',
          'need_title',
          'need_details'
        )
        .fetch()
      return servicePage
    } catch (servicePageError) {
      console.log(servicePageError)
    }
  }

     /**
   * Show a list of all Service Page.
   * GET getServicePage
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async getServiceSectionTwoPage({ request, response }) {
    try {
      // Getting all the Advertisements
      const servicePage = await ServiceSectionTwo.query()
        .with('serviceName', (builder) => {
          builder.select('name', 'pretty_name', 'id')
        })
        .select(
          'id',
          'service_name_id',
          'title',
          'sub_title',
          'details',
          'need_title',
          'need_details'
        )
        .fetch()
      return servicePage
    } catch (servicePageError) {
      console.log(servicePageError)
    }
  }

  /**
   * Render a form to be used for creating a new servicesectiontwo.
   * GET servicesectiontwos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
    async addServiceSectionTwo ({ request, response, view }) {
  
      try {
        const { 
          service_name_id, 
          title, 
          sub_title,
          details,
          need_title,
          need_details,
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

        // Adding Service Section Two
        const serviceSectionTwo = new ServiceSectionTwo()
        serviceSectionTwo.service_name_id = service_name_id
        serviceSectionTwo.title = title
        serviceSectionTwo.sub_title = sub_title
        serviceSectionTwo.details = details
        serviceSectionTwo.need_title = need_title
        serviceSectionTwo.need_details = need_details
        await serviceSectionTwo.save()
        // returning response
        return ExceptionsServices.resourceAddSuccessful('Service Section Two')
      } catch (addServiceSectionTwoError) {
          console.log(addServiceSectionTwoError)
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
    async getServiceSectionTwoUpdate({ request, response }) {
      try {
        // console.log(request.all())
        const { 
          id, 
          service_name_id, 
        title, 
        sub_title,
        details,
        need_title,
        need_details,
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
        const serviceSectionTwo = await ServiceSectionTwo.query()
          .where('id', id)
          .select(
            'id',
            'service_name_id',
            'title',
            'sub_title',
            'details',
            'need_title',
            'need_details'
          )
          .first()
        if (serviceSectionTwo && serviceSectionTwo !== undefined) {
          serviceSectionTwo.service_name_id = service_name_id
          serviceSectionTwo.title = title
          serviceSectionTwo.sub_title = sub_title
          serviceSectionTwo.details = details
          serviceSectionTwo.need_title = need_title
          serviceSectionTwo.need_details = need_details
          await serviceSectionTwo.save()
        }
        // return successful
        return ExceptionsServices.resourceUpdateSuccessful('Service Section Two')
      } catch (updateServiceSectionTwoError) {
        console.log(updateServiceSectionTwoError)
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
      async deleteServiceSectionTwo({ params, response, request }) {
      try {
        const { id } = params;
       
        const serviceSectionTwoInfo = await ServiceSectionTwo.query()
          .where("id", id)
          .first();

          if (!serviceSectionTwoInfo) {
              return ExceptionsServices.resourceMissing('Service Section Two')
          }
       
          await serviceSectionTwoInfo.delete();
          return response.json({
            TYPE: 'success',
            MESSAGE:
              'Service Section Two Successfully Deleted',
              serviceSectionTwoInfo: serviceSectionTwoInfo.toJSON(),
          })
    
      } catch (deleteErrorFaq) {
        console.log(deleteErrorFaq);
      }
  }

}

module.exports = ServiceSectionTwoController
