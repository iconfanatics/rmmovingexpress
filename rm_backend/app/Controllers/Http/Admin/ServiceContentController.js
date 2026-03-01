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
const ServicePage = use('App/Models/ServiceContent')
const ServiceName = use('App/Models/ServiceName')

/** Exception Section */
const EServices = use('App/Services/Exceptions/ExceptionsServices')
const ExceptionsServices = new EServices()
class ServiceContentController {
     /**
   * Show a list of all Service Page.
   * GET getServicePage
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async getServiceSignlePage({ request, response, params }) {
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
      const servicePage = await ServicePage.query()
        .where('service_name_id', pageId)
        .select(
          'id',
          'service_name_id',
          'sort_title',
          'title',
          'details',
          'costs_title',
          'costs_details',
          'position',
          'photo',
          'status'
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
  async getServicePage({ request, response }) {
    try {
      // Getting all the Advertisements
      const servicePage = await ServicePage.query()
        .with('serviceName', (builder) => {
          builder.select('name', 'pretty_name', 'id')
        })
        .select(
          'id',
          'service_name_id',
          'sort_title',
          'title',
          'details',
          'costs_title',
          'costs_details',
          'position',
          'photo',
          'status'
        )
        .fetch()
      return servicePage
    } catch (servicePageError) {
      console.log(servicePageError)
    }
  }
      /**
   * Adding New Service Page
   * @return {Object}
   */
  async addServicePage({ request, response }) {
    try {
        
      const {
        service_name_id,
        sort_title,
        title,
        details,
        costs_title,
        costs_details,
        position,
      } = request.input('newServicePage')

      console.log(typeof position);
      // return;

      let pos= 0;

// If position is string
if (typeof position === 'string') {
  if (position.toLowerCase() === 'true' || position === '1') {
    pos = 1;
  } else {
    pos = 0;
  }
} else if (typeof position === 'boolean') {
  pos = position ? 1 : 0;
} else {
  pos = Number(position) ? 1 : 0;
}

// serviceCatInfo.position = pos;
      
      
    
        if (!service_name_id) {
          return response.json({
            STATUS: '400',
            MESSAGE:
              'Page Name is required.',
          })
        }
        if (!title) {
          return response.json({
            STATUS: '400',
            MESSAGE:
              'Title is required.',
          })
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
        const serviceCatInfo = new ServicePage()
        serviceCatInfo.service_name_id = service_name_id
        serviceCatInfo.sort_title  = sort_title 
        serviceCatInfo.title  = title  
        serviceCatInfo.details = details
        serviceCatInfo.costs_title = costs_title
        serviceCatInfo.costs_details = costs_details
        serviceCatInfo.position = pos;
        serviceCatInfo.photo = newimageName
        await serviceCatInfo.save()

        // Getting last Service Content
        const lastServiceCategory = await ServicePage.query()
        .where('id', serviceCatInfo.id)
        .select(
            'id',
            'service_name_id',
            'title',
            'details',
            'costs_title',
            'costs_details',
            'position',
            'photo',
            'status',
        )
        .first()

        return response.json({
            TYPE: 'success',
            MESSAGE:
            'Service Content Successfully Added',
            DATA: lastServiceCategory
        })
    }
    
}
    
      
    } catch (addServiceContentError) {
      console.log(addServiceContentError)
    }
  }
   /**
   * Updating Advertisement
   * @param advertisementInfo
   * @return {Object}
   */
   async getServicePageUpdate({ request, response }) {
    try {
     
      const {
        id,
        service_name_id,
        sort_title,
        title,
        details,
        costs_title,
        costs_details,
        position
      } = request.input('editServicePage')
      

      // Finding Service Page
      const findServicePage = await ServicePage.query()
        .where('id', id)
        .select(
          'id',
          'service_name_id',
          'title',
          'details',
          'costs_title',
          'costs_details',
          'position',
          'photo',
          'status'
        )
        .first()
        
      if (findServicePage && findServicePage !== undefined) {

        const fileInfo = request.file("photo");

        if(!fileInfo){
          findServicePage.service_name_id = service_name_id
          findServicePage.sort_title  = sort_title 
          findServicePage.title  = title 
          findServicePage.details  = details 
          findServicePage.costs_title  = costs_title 
          findServicePage.costs_details  = costs_details 
          findServicePage.position  = Number(position) ? 1 : 0;
          await findServicePage.save()

          // return successful
          return response.json({
            STATUS: '400',
            TYPE: 'success',
            MESSAGE:
              'Service Content Successfully Updated'
          })
        }

           // check photo
           if (fileInfo == null) {
            return response.json({
              STATUS: '400',
              MESSAGE:
                'Service Content Image Missing',
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
              await Drive.delete(imageUploadUrl + findServicePage.content_image);
              findServicePage.service_name_id = service_name_id
              findServicePage.sort_title  = sort_title 
              findServicePage.title  = title 
              findServicePage.details  = details 
              findServicePage.costs_title  = costs_title 
              findServicePage.costs_details  = costs_details 
              findServicePage.position  = Number(position) ? 1 : 0; 
              findServicePage.photo = newimageName
              await findServicePage.save()

             // return successful
              return response.json({
                STATUS: '400',
                TYPE: 'success',
                MESSAGE:
                  'Service Content Successfully Updated'
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
  async getServicePageStatus({ request, response }) {
    try {
      // console.log(request.all())
      const { servicePageId } = request.all()
      if (!servicePageId || isNaN(servicePageId)) return 'error'
      // Finding Service Page
      const findServicePage = await ServicePage.query()
        .where('id', servicePageId)
        .select('id', 'status')
        .first()
      if (findServicePage && findServicePage !== undefined) {
        findServicePage.status = findServicePage.status === 1 ? 0 : 1
        await findServicePage.save()
      }
        // return successful
        return response.json({
        TYPE: 'success',
        MESSAGE:
          'Service Page Status Successfully Changed',
        DATA: findServicePage
      })
        // return successful
        // return ExceptionsServices.resourceUpdateSuccessful('Service status')
    } catch (updatePageStatusError) {
      console.log(updatePageStatusError)
    }
  }
    /**
   * Delete Category
   * @param advertisementId
   * @return {Object}
   */
    async deleteServicePage({ params, response, request }) {
      try {
        const { id } = params;
       
        const servicePageInfo = await ServicePage.query()
          .where("id", id)
          .select("id", "service_name_id")
          .first();
  
        if (!servicePageInfo) {
          return response.json({
            STATUS: '400',
            MESSAGE:
              'Please reload the page',
          })
        }
        if (servicePageInfo != null) {
          const fileName = servicePageInfo.content_image;
          var imageUploadUrl = ENV.get("IMG_URL");
          await Drive.delete(imageUploadUrl + fileName);
        }
        await servicePageInfo.delete();
        return response.json({
          TYPE: 'success',
          MESSAGE:
            'Service Page successfully Deleted',
            servicePageInfo: servicePageInfo.toJSON(),
        })
    
      } catch (deleteErrorAd) {
        console.log(deleteErrorAd);
      }
    }

}

module.exports = ServiceContentController
