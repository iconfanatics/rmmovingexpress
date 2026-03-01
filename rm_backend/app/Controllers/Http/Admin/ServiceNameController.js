'use strict'

/**
 ** File Name: ServiceNameController.js
 ** Controlling Admin Section
 ** Namespace: App/Controllers/Http/Admin
 ** Developed By: Md. Mijanur Rahman
 ** Maintained By: Md. Mijanur Rahman
 ** Email: mizandev000@gmail.com
 **/


/** Models Section */
const ServiceName = use('App/Models/ServiceName')

/** Exception Section */
const EServices = use('App/Services/Exceptions/ExceptionsServices')
const ExceptionsServices = new EServices()

class ServiceNameController {

   /**
   * Show a list of all Service name.
   * GET Service name
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async getServiceName ({ auth, request, response }) {
    try{
      const serviceName = await ServiceName.query()
      .select('id', 'name', 'pretty_name', 'status')
      .fetch();

      return serviceName

    }catch(getServiceNameerror){
      console.log(getServiceNameerror)
    }
  }
    /**
   * Create Service Name.
   * GET contacts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

    async addServiceName ({ request, response, view }) {
        try {
        const { name  } = request.input('serviceNameInfo')

        // check missing name
        if (!name) {
          return ExceptionsServices.resourceMissing('name')
        }

      
        const pretty_name = name.replace(/\s+/g, '-').toLowerCase();

        // check exiting name
        const findName = await ServiceName.query()
        .where('name', name)
        .orWhere('pretty_name', pretty_name)
        .first();

        if(findName){
            return ExceptionsServices.duplicateResource('Name Or Pretty Name')
        }

        // Adding Service Name Info
        const serviceNameInfo = new ServiceName()
        serviceNameInfo.name = name
        serviceNameInfo.pretty_name = pretty_name
        await serviceNameInfo.save()
        // returning response
        return ExceptionsServices.resourceAddSuccessful('Service name')
    } catch (addServiceNameError) {
        console.log(addServiceNameError)
    }
    }

   /**
   * Updating Category
   * @param categoryInfo
   * @return {Object}
   */
  async updateServiceName({ request, response }) {
    try {
      // console.log(request.all())
      const { id, name } = request.input('serviceNameInfo')
      // check missing name
      if (!name) {
        return ExceptionsServices.resourceMissing('name')
      }
      // Finding Service Name
      const findServiceName = await ServiceName.query()
        .where('id', id)
        .select('id', 'name')
        .first()
      if (findServiceName && findServiceName !== undefined) {
        findServiceName.name = name
        await findServiceName.save()
      }
      // return successful
      return ExceptionsServices.resourceUpdateSuccessful('Service name')
    } catch (updateServiceNameError) {
      console.log(updateServiceNameError)
    }
  }

    /**
   * Delete Advertisement
   * @param advertisementId
   * @return {Object}
   */
    async deleteServiceName({ params, response, request }) {
        try {
          const { id } = params;
         
          const serviceNameInfo = await ServiceName.query()
            .where("id", id)
            .first();

            if (!serviceNameInfo) {
                return ExceptionsServices.resourceMissing('resource')
            }
         
          await serviceNameInfo.delete();
          return response.json({
            TYPE: 'success',
            MESSAGE:
              'Service Name successfully Deleted',
              serviceNameInfo: serviceNameInfo.toJSON(),
          })
      
        } catch (deleteErrorServiceName) {
          console.log(deleteErrorServiceName);
        }
    }
      /**
   * Updating Category Status
   * Updating the Status from 1 to 0 or Vice Versa
   * @param categoryId
   * @return {Object}
   */
  async postUpdateServiceNameStatus({ request, response }) {
    try {
      // console.log(request.all())
      const { serviceNameId } = request.all()
      if (!serviceNameId || isNaN(serviceNameId)) return 'error'
      // Finding Service Name
      const findServiceName = await ServiceName.query()
        .where('id', serviceNameId)
        .select('id', 'status')
        .first()
      if (findServiceName && findServiceName !== undefined) {
        findServiceName.status = findServiceName.status === 1 ? 0 : 1
        await findServiceName.save()
      }
       // return successful
       return response.json({
        TYPE: 'success',
        MESSAGE:
          'Service Name Status Successfully Changed',
        DATA: findServiceName
      })
        // return successful
        // return ExceptionsServices.resourceUpdateSuccessful('Service status')
    } catch (updateCategoryStatusError) {
      console.log(updateCategoryStatusError)
    }
  }

}

module.exports = ServiceNameController
