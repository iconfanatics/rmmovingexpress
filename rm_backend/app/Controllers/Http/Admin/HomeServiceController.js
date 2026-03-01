'use strict'

/**
 ** File Name: HomeServiceController.js
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
const HomeService = use('App/Models/HomeService')

/** Exception Section */
const EServices = use('App/Services/Exceptions/ExceptionsServices')
const ExceptionsServices = new EServices()

/**
 * Resourceful controller for interacting with homeservices
 */
class HomeServiceController {
  /**
   * Show a list of all homeservices.
   * GET homeservices
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async getHomeService ({ auth, request, response }) {
      try{
        const faq = await HomeService.query()
        .with('serviceName', (builder) => {
          builder.select('name', 'pretty_name', 'id')
        })
        .select('id', 'service_name_id', 'icon', 'details', 'link')
        .fetch();
  
        return faq
  
      }catch(getFaqrror){
        console.log(getFaqrror)
      }
    }


  /**
   * Render a form to be used for creating a new homeservice.
   * GET homeservices/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
    async addHomeService ({ request, response, view }) {
    try {
      const { service_name_id, icon, details, link } = request.input('faqInfo')

      // check missing icon
      if (!icon) {
        return ExceptionsServices.resourceMissing('Icon')
      }
      // check missing Details
      if (!details) {
        return ExceptionsServices.resourceMissing('Details')
      }
      // check missing Link
      if (!link) {
        return ExceptionsServices.resourceMissing('Link')
      }

      // check exiting name
      const findName = await HomeService.query()
      .where('service_name_id', service_name_id)
      .first();

      if(findName){
          return ExceptionsServices.duplicateResource('Content')
      }

      // Adding Home Service Info
      const homeServiceInfo = new HomeService()
      homeServiceInfo.service_name_id = service_name_id
      homeServiceInfo.icon = icon
      homeServiceInfo.details = details
      homeServiceInfo.link = link
      await homeServiceInfo.save()
      // returning response
      return ExceptionsServices.resourceAddSuccessful('Home Service')
    } catch (addFaqError) {
        console.log(addFaqError)
    }
  }

  /**
   * Update homeservice details.
   * PUT or PATCH homeservices/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async homeServiceUpdate({ request, response }) {
      try {
        // console.log(request.all())
        const { id, service_name_id, icon, details, link } = request.input('faqInfo')
        // check missing id
        if (!id) {
          return ExceptionsServices.resourceMissing('id')
        }
        // check missing Page Name
        if (!service_name_id) {
          return ExceptionsServices.resourceMissing('Page Name')
        }
        // check missing Icon
        if (!icon) {
          return ExceptionsServices.resourceMissing('Icon')
        }
        // check missing Details
        if (!details) {
          return ExceptionsServices.resourceMissing('Details')
        }
        // check missing Link
        if (!link) {
          return ExceptionsServices.resourceMissing('Link')
        }
        // Finding Home Service
        const findHomeService = await HomeService.query()
          .where('id', id)
          .select(
            'id',
            'service_name_id',
            'icon', 
            'details',
            'link'
          )
          .first()
        if (findHomeService && findHomeService !== undefined) {
          findHomeService.service_name_id = service_name_id
          findHomeService.icon = icon
          findHomeService.details = details
          findHomeService.link = link
          await findHomeService.save()
        }
        // return successful
        return ExceptionsServices.resourceUpdateSuccessful('Home Service')
      } catch (updateServiceNameError) {
        console.log(updateServiceNameError)
      }
    }

     /**
   * Updating Faq Status
   * Updating the Status from 1 to 0 or Vice Versa
   * @param faqId
   * @return {Object}
   */
  async updateHomeServiceStatus({ request, response }) {
    try {
      const { faqId } = request.all()
      if (!faqId || isNaN(faqId)) return 'error'
      // Finding Home Service
      const findHomeService = await HomeService.query()
        .where('id', faqId)
        .select('id', 'status')
        .first()
      if (findHomeService && findHomeService !== undefined) {
        findHomeService.status = findHomeService.status === 1 ? 0 : 1
        await findHomeService.save()
      }
       // return successful
       return response.json({
        TYPE: 'success',
        MESSAGE:
          'Faq Status Successfully Changed',
        DATA: findHomeService
      })
    } catch (updateFaqStatusError) {
      console.log(updateFaqStatusError)
    }
  }

  /**
   * Delete a homeservice with id.
   * DELETE homeservices/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
    async deleteHomeService({ params, response, request }) {
      try {
        const { id } = params;
       
        const homeServiceInfo = await HomeService.query()
          .where("id", id)
          .first();

          if (!homeServiceInfo) {
              return ExceptionsServices.resourceMissing('resource')
          }
       
          await homeServiceInfo.delete();
          return response.json({
            TYPE: 'success',
            MESSAGE:
              'Faq Successfully Deleted',
              faqInfo: homeServiceInfo.toJSON(),
          })
    
      } catch (deleteErrorFaq) {
        console.log(deleteErrorFaq);
      }
  }
}

module.exports = HomeServiceController
