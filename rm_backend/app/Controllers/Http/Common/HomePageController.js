'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

 /** Models Section */
 const HouseMovingExpert = use('App/Models/HouseMovingExpert')
 const HomeService = use('App/Models/HomeService')
 const HappyCustomer = use('App/Models/HappyCustomer')

/**
 * Resourceful controller for interacting with contacts
 */
class ContactController {

  /**
   * Display a home MovingE xpert.
   * GET contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async getClientMovingExpert ({ auth, request, response }) {
    try{
      const houseMovingExpert = await HouseMovingExpert.query()
      .select('id', 'sort_title', 'title', 'details', 'photo', 'status')
      .fetch();

      return houseMovingExpert

    }catch(movingExpertError){
      console.log(movingExpertError)
    }
  }

    /**
   * Display a Home Service.
   * GET contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
    async getClientHomeService ({ auth, request, response }) {
      try{
        const service = await HomeService.query()
        .with('serviceName', (builder) => {
          builder.select('name', 'pretty_name', 'id')
        })
        .select('id', 'service_name_id', 'icon', 'details', 'link')
        .fetch();
  
        return service
  
      }catch(getServiceError){
        console.log(getServiceError)
      }
    }
    
       /**
   * Display a Happy Customer
   * GET contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  
     async getClientHomeTestimonial ({ auth, request, response }) {
    try{
      const happyCustomerInfo = await HappyCustomer.query()
      .select(
        'id', 
        'f_name', 
        'l_name', 
        'star', 
        'details', 
        'created_at', 
        'photo', 
        'status'
      )
      .fetch();

      return happyCustomerInfo

    }catch(happyCustomerError){
      console.log(happyCustomerError)
    }
  }

}

module.exports = ContactController
