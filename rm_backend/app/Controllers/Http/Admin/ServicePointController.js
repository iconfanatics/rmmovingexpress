'use strict'

/**
 ** File Name: HomeSliderController.js
 ** Controlling Admin Section
 ** Namespace: App/Controllers/Http/Admin
 ** Developed By: Md. Mijanur Rahman
 ** Maintained By: Md. Mijanur Rahman
 ** Email: mizandev000@gmail.com
 **/

 /** Models Section */
const ServicePoint = use('App/Models/ServicePoint')
const HomeService = use('App/Models/HomeService')
const HomeSlider = use('App/Models/HomeSlider')

/** Exception Section */
const EServices = use('App/Services/Exceptions/ExceptionsServices')
const ExceptionsServices = new EServices()

/**
 * Resourceful controller for interacting with servicepoints
 */
class ServicePointController {
  /**
   * Show a list of all servicepoints.
   * GET servicepoints
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async getServicePoint ({ auth, request, response }) {
    try{
      // return Service Point
      const servicePoint = await ServicePoint.query()
      .with('homeService', (builder) => {
        builder.select('title', 'id')
      })
      .select(
        'id',
        'home_service_id',
        'name',
        'status'
      )
      .fetch();

      return servicePoint

    }catch(getServicePointError){
      console.log(getServicePointError)
    }
  }

  /**
   * Render a form to be used for creating a new servicepoint.
   * GET servicepoints/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async addServicePoint ({ request, response, view }) {
    try {
    const { home_service_id, name  } = request.input('servicePointInfo')
   
    // check home service id 
      if (!home_service_id) {
        return ExceptionsServices.resourceMissing('Titile')
      }
      // check missing titile
      if (!name) {
        return ExceptionsServices.resourceMissing('Sub Titile')
      }
      
      // Finding Service Name
      const findServicePoint = await HomeService.query()
      .where('id', home_service_id)
      .where('status', 1)
      .select('*')
      .first()
    
      if (!findServicePoint) {
          return ExceptionsServices.resourceMissing('Home Service')
      }

      // Adding Service Point
      const servicePointInfo = new ServicePoint()
      servicePointInfo.home_service_id = home_service_id
      servicePointInfo.name = name
      await servicePointInfo.save()
      // returning response
      return ExceptionsServices.resourceAddSuccessful('Service Point')
    } catch (addServicePointError) {
        console.log(addServicePointError)
    }
}

  /**
   * Update servicepoint details.
   * PUT or PATCH servicepoints/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async updateHomeSlider({ request, response }) {
    try {
      const { id, home_service_id, name } = request.input('editServicePointInfo')
     
      // check missing ID
      if (!id) {
        return ExceptionsServices.resourceMissing('Id ')
      }
      // check missing titile
      if (!home_service_id) {
        return ExceptionsServices.resourceMissing('Home service page')
      }
      // check missing titile
      if (!name) {
        return ExceptionsServices.resourceMissing('Name')
      }

      // Finding Service Point
      const findHomeService = await HomeService.query()
      .where('id', home_service_id)
      .where('status', 1)
      .select('*')
      .first()

      if (!findHomeService) {
          return ExceptionsServices.resourceMissing('Service Point')
      }
      
      const findServicePointInfo = await ServicePoint.query()
        .where('id', id)
        .select('id', 'home_service_id', 'name')
        .first()
      if (findServicePointInfo && findServicePointInfo !== undefined) {
        findServicePointInfo.home_service_id = home_service_id
        findServicePointInfo.name = name
        await findServicePointInfo.save()
      }
      // return successful
      return ExceptionsServices.resourceUpdateSuccessful('Service Point')
    } catch (updateServicePointError) {
      console.log(updateServicePointError)
    }
  }

   /**
   * Updating Service Point Status
   * Updating the Status from 1 to 0 or Vice Versa
   * @param categoryId
   * @return {Object}
   */
    async postUpdateServicePointStatus({ request, response }) {
    try {
      const { servicePointId } = request.all()
      if (!servicePointId || isNaN(servicePointId)) return 'error'
      // Finding Service Point
      const findServicePoint = await ServicePoint.query()
        .where('id', servicePointId)
        .select('id', 'status')
        .first()
      if (findServicePoint && findServicePoint !== undefined) {
        findServicePoint.status = findServicePoint.status === 1 ? 0 : 1
        await findServicePoint.save()
      }
        // return successful
        return response.json({
        TYPE: 'success',
        MESSAGE:
          'Service Point Status Successfully Changed',
        DATA: findServicePoint
      })
    } catch (updateServicePointError) {
      console.log(updateServicePointError)
    }
  }

  /**
   * Delete a servicepoint with id.
   * DELETE servicepoints/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async deleteHomeSlider({ params, response, request }) {
    try {
      const { id } = params;
     
      const servicePointInfo = await ServicePoint.query()
        .where("id", id)
        .first();

        if (!servicePointInfo) {
            return ExceptionsServices.resourceMissing('Service Point')
        }
     
      await servicePointInfo.delete();
      return response.json({
        TYPE: 'success',
        MESSAGE:
          'Service Point successfully Deleted',
          servicePointInfo: servicePointInfo.toJSON(),
      })
  
    } catch (deleteErrorHomeServicePoint) {
      console.log(deleteErrorHomeServicePoint);
    }
  }
}

module.exports = ServicePointController
