'use strict'

/**
 ** File Name: FaqController.js
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
const Faq = use('App/Models/Faq')

/** Exception Section */
const EServices = use('App/Services/Exceptions/ExceptionsServices')
const ExceptionsServices = new EServices()

/**
 * Resourceful controller for interacting with faqs
 */
class FaqController {
     /**
   * Show a list of all Faq.
   * GET Faq
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
    async getServiceSignleFaq ({ auth, request, response }) {
       const { pageId } = request.all()
      try{

         if (!pageId) {
            return response.json({
              STATUS: '400',
              MESSAGE:
                'Page Not Found.',
            })
          }

        const faq = await Faq.query()
        .with('serviceName', (builder) => {
          builder.select('name', 'pretty_name', 'id')
        })
        .where('service_name_id', pageId)
        .select('id', 'service_name_id', 'title', 'sub_title')
        .fetch();
  
        return faq
  
      }catch(getFaqrror){
        console.log(getFaqrror)
      }
    }
     /**
   * Show a list of all Faq.
   * GET Faq
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
    async getServiceFaq ({ auth, request, response }) {
      try{
        const faq = await Faq.query()
        .with('serviceName', (builder) => {
          builder.select('name', 'pretty_name', 'id')
        })
        .select('id', 'service_name_id', 'title', 'sub_title')
        .fetch();
  
        return faq
  
      }catch(getFaqrror){
        console.log(getFaqrror)
      }
    }

   /**
   * Create Faq.
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

   async addServiceFaq ({ request, response, view }) {
    try {
      const { service_name_id, title, sub_title } = request.input('faqInfo')

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

      // check exiting name
      const findName = await Faq.query()
      .where('service_name_id', service_name_id)
      .where('title', title)
      .first();

      if(findName){
          return ExceptionsServices.duplicateResource('Content')
      }

 
       if(findName){
           return ExceptionsServices.duplicateResource('Content')
       }

      // Adding Faq Info
      const faqInfo = new Faq()
      faqInfo.service_name_id = service_name_id
      faqInfo.title = title
      faqInfo.sub_title = sub_title
      await faqInfo.save()
      // returning response
      return ExceptionsServices.resourceAddSuccessful('Faq')
    } catch (addFaqError) {
        console.log(addFaqError)
    }
  }

    /**
   * Updating Category
   * @param categoryInfo
   * @return {Object}
   */
    async getServiceFaqUpdate({ request, response }) {
      try {
        // console.log(request.all())
        const { id, service_name_id, title, sub_title } = request.input('faqInfo')
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
          return ExceptionsServices.resourceMissing('name')
        }
        // check missing sub_title
        if (!sub_title) {
          return ExceptionsServices.resourceMissing('name')
        }
        // Finding Faq
        const findFaq = await Faq.query()
          .where('id', id)
          .select(
            'id', 
            'service_name_id',
            'title',
            'sub_title'
          )
          .first()
        if (findFaq && findFaq !== undefined) {
          findFaq.service_name_id = service_name_id
          findFaq.title = title
          findFaq.sub_title = sub_title
          await findFaq.save()
        }
        // return successful
        return ExceptionsServices.resourceUpdateSuccessful('Service name')
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
  async updateServiceFaqStatus({ request, response }) {
    try {
      // console.log(request.all())
      const { faqId } = request.all()
      if (!faqId || isNaN(faqId)) return 'error'
      // Finding Service Name
      const findFaq = await Faq.query()
        .where('id', faqId)
        .select('id', 'status')
        .first()
      if (findFaq && findFaq !== undefined) {
        findFaq.status = findFaq.status === 1 ? 0 : 1
        await findFaq.save()
      }
       // return successful
       return response.json({
        TYPE: 'success',
        MESSAGE:
          'Faq Status Successfully Changed',
        DATA: findFaq
      })
    } catch (updateFaqStatusError) {
      console.log(updateFaqStatusError)
    }
  }
     /**
   * Delete Faq
   * @param faqId
   * @return {Object}
   */
     async deleteServiceFaq({ params, response, request }) {
      try {
        const { id } = params;
       
        const faqInfo = await Faq.query()
          .where("id", id)
          .first();

          if (!faqInfo) {
              return ExceptionsServices.resourceMissing('resource')
          }
       
          await faqInfo.delete();
          return response.json({
            TYPE: 'success',
            MESSAGE:
              'Faq Successfully Deleted',
              faqInfo: faqInfo.toJSON(),
          })
    
      } catch (deleteErrorFaq) {
        console.log(deleteErrorFaq);
      }
  }


}

module.exports = FaqController
