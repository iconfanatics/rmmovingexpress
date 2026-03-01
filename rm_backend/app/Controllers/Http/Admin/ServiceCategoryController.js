'use strict'

/**
 ** File Name: ServiceCategoryController.js
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
const ServiceCategory = use('App/Models/ServiceCategory')
const ServiceName = use('App/Models/ServiceName')


/** Exception Section */
const EServices = use('App/Services/Exceptions/ExceptionsServices')
const ExceptionsServices = new EServices()

class ServiceCategoryController {
   /**
   * Show a list of all appointments.
   * GET appointments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async getServiceCategory({ request, response }) {
    try {
      // Getting all the Advertisements
      const serviceCategory = await ServiceCategory.query()
        .with('serviceName', (builder) => {
          builder.select('name', 'pretty_name', 'id')
        })
        .select(
          'id',
          'service_name_id',
          'name',
          'pretty_name',
          'total_worker',
          'booking_worker',
          'sub_service_tx',
          'sub_service_image',
          'status'
        )
        .fetch()
      return serviceCategory
    } catch (serviceCategoryError) {
      console.log(serviceCategoryError)
    }
  }
     /**
   * Adding New Advertisement
   * @param advertisementInfo
   * @return {Object}
   */
  async addServiceCategory({ request, response }) {
    try {
        
      const {
        service_name_id,
        name,
        total_worker,
        booking_worker,
        sub_service_tx
      } = request.input('newServiceCat')
      
   
        if (!service_name_id) {
          return response.json({
            STATUS: '400',
            MESSAGE:
              'Page Name is required.',
          })
        }
        if (!name) {
          return response.json({
            STATUS: '400',
            MESSAGE:
              'Name is required.',
          })
        }

        const pretty_name = name.replace(/\s+/g, '-').toLowerCase();
        
         // check exiting name
         const findName = await ServiceCategory.query()
         .where('name', name)
         .orWhere('pretty_name', pretty_name)
         .first();
 
         if(findName){
             return ExceptionsServices.duplicateResource('Name Or Pretty Name')
         }

        
        

     // Finding Service Name
      const findServiceName = await ServiceName.query()
      .where('id', service_name_id)
      .where('status', 1)
      .select('*')
      .first()

    if (!findServiceName) {
        return ExceptionsServices.resourceMissing('Service Name')
    }

    const fileInfo = request.file("photo");

    // check photo
    if (!fileInfo) {
        return ExceptionsServices.resourceMissing('Service category image')
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
    let newimageName = random1 + "_service." + fileExtension;

    var imageUploadUrl = ENV.get("IMG_URL");

    await fileInfo.move(Helpers.tmpPath(imageUploadUrl), {
        name: newimageName,
        overwrite: true,
    });

        if (fileInfo.moved()) {
        const serviceCatInfo = new ServiceCategory()
        serviceCatInfo.service_name_id = service_name_id
        serviceCatInfo.name  = name 
        serviceCatInfo.pretty_name  = pretty_name  
        serviceCatInfo.total_worker = total_worker
        serviceCatInfo.booking_worker = booking_worker
        serviceCatInfo.sub_service_tx = sub_service_tx
        serviceCatInfo.sub_service_image = newimageName
        await serviceCatInfo.save()

        // Getting last Service Category
        const lastServiceCategory = await ServiceCategory.query()
        .where('id', serviceCatInfo.id)
        .select(
            'id',
            'service_name_id',
            'name',
            'pretty_name',
            'total_worker',
            'booking_worker',
            'sub_service_tx',
            'sub_service_image',
            'status'
        )
        .first()

        return response.json({
            TYPE: 'success',
            MESSAGE:
            'Service Category Successfully Added',
            DATA: lastServiceCategory
        })
    }
    
}
   
     
    } catch (addAdvertisementError) {
      console.log(addAdvertisementError)
    }
  }
  /**
   * Updating Advertisement
   * @param advertisementInfo
   * @return {Object}
   */
  async getServiceCategoryUpdate({ request, response }) {
    try {
     
      const {
        id,
        service_name_id,
        name,
        total_worker,
        booking_worker,
        sub_service_tx
      } = request.input('editServiceCat')

      // Finding Service Category
      const findServiceCategory = await ServiceCategory.query()
        .where('id', id)
        .select(
          'id',
          'service_name_id',
          'name',
          'total_worker',
          'booking_worker',
          'sub_service_tx',
          'status'
        )
        .first()
      if (findServiceCategory && findServiceCategory !== undefined) {

        const fileInfo = request.file("photo");

        if(!fileInfo){
          findServiceCategory.service_name_id = service_name_id
          findServiceCategory.name = name
          findServiceCategory.total_worker = total_worker
          findServiceCategory.booking_worker = booking_worker
          findServiceCategory.sub_service_tx = sub_service_tx
          await findServiceCategory.save()

          // return successful
          return response.json({
            STATUS: '400',
            TYPE: 'success',
            MESSAGE:
              'Service Category Successfully Updated'
          })
        }

           // check photo
           if (fileInfo == null) {
            return response.json({
              STATUS: '400',
              MESSAGE:
                'Service Category Image Missing',
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
          let newimageName = random1 + "_ad." + fileExtension;
  
          var imageUploadUrl = ENV.get("IMG_URL");
  
          await fileInfo.move(Helpers.tmpPath(imageUploadUrl), {
            name: newimageName,
            overwrite: true,
          });
  
            if (fileInfo.moved()) {
              await Drive.delete(imageUploadUrl + findServiceCategory.sub_service_image);
              findServiceCategory.service_name_id = service_name_id
              findServiceCategory.name = name
              findServiceCategory.total_worker = total_worker
              findServiceCategory.booking_worker = booking_worker
              findServiceCategory.sub_service_tx = sub_service_tx
              findServiceCategory.sub_service_image = newimageName
              await findServiceCategory.save()

             // return successful
              return response.json({
                STATUS: '400',
                TYPE: 'success',
                MESSAGE:
                  'Service Category Successfully Updated'
              })
            }
          
          }
     
      }
     
    } catch (updateAdvertisementError) {
      console.log(updateAdvertisementError)
    }
  }
     /**
   * Updating Category Status
   * Updating the Status from 1 to 0 or Vice Versa
   * @param categoryId
   * @return {Object}
   */
    async getServiceCategoryStatus({ request, response }) {
      try {
        // console.log(request.all())
        const { serviceNameId } = request.all()
        if (!serviceNameId || isNaN(serviceNameId)) return 'error'
        // Finding Service Category
        const findServiceCat = await ServiceCategory.query()
          .where('id', serviceNameId)
          .select('id', 'status')
          .first()
        if (findServiceCat && findServiceCat !== undefined) {
          findServiceCat.status = findServiceCat.status === 1 ? 0 : 1
          await findServiceCat.save()
        }
          // return successful
          return response.json({
          TYPE: 'success',
          MESSAGE:
            'Service Category Status Successfully Changed',
          DATA: findServiceCat
        })
          // return successful
          // return ExceptionsServices.resourceUpdateSuccessful('Service status')
      } catch (updateCategoryStatusError) {
        console.log(updateCategoryStatusError)
      }
    }
     /**
   * Delete Category
   * @param advertisementId
   * @return {Object}
   */
  async deleteServiceCategory({ params, response, request }) {
    try {
      const { id } = params;
     
      const serviceCatInfo = await ServiceCategory.query()
        .where("id", id)
        .select("id", "sub_service_image")
        .first();

      if (!serviceCatInfo) {
        return response.json({
          STATUS: '400',
          MESSAGE:
            'Please reload the page',
        })
      }
      if (serviceCatInfo != null) {
        const fileName = serviceCatInfo.sub_service_image;
        var imageUploadUrl = ENV.get("IMG_URL");
        await Drive.delete(imageUploadUrl + fileName);
      }
      await serviceCatInfo.delete();
      return response.json({
        TYPE: 'success',
        MESSAGE:
          'Service Category successfully Deleted',
          serviceCatInfo: serviceCatInfo.toJSON(),
      })
  
    } catch (deleteErrorAd) {
      console.log(deleteErrorAd);
    }
  }
}

module.exports = ServiceCategoryController
