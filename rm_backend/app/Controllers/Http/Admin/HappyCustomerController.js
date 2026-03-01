'use strict'

/**
 ** File Name: HappyCustomerController.js
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
const HappyCustomer = use('App/Models/HappyCustomer')

/** Exception Section */
const EServices = use('App/Services/Exceptions/ExceptionsServices')
const ExceptionsServices = new EServices()

/**
 * Resourceful controller for interacting with happycustomers
 */
class HappyCustomerController {
  /**
   * Show a list of all happycustomers.
   * GET happycustomers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async getHappyCustomer ({ auth, request, response }) {
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

  /**
   * Render a form to be used for creating a new happycustomer.
   * GET happycustomers/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async addHappyCustomer({ request, response }) {
    try {
    
      const {
        f_name,
        l_name,
        star,
        details
      } = request.input('newServicePage')
     
      // Check First Name
      if (!f_name) {
        return ExceptionsServices.resourceMissing('First Name')
      }
      // Check Last Name
      if (!l_name) {
        return ExceptionsServices.resourceMissing('Last Name')
      }
      // Check First Name
      if (!star) {
        return ExceptionsServices.resourceMissing('Star')
      }
    
    const fileInfo = request.file("photo");

    // check photo
    if (!fileInfo) {
        return ExceptionsServices.resourceMissing('Moving Expert image')
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
            const happyCustomerInfo = new HappyCustomer()
            happyCustomerInfo.f_name = f_name
            happyCustomerInfo.l_name = l_name
            happyCustomerInfo.star = star
            happyCustomerInfo.details = details
            happyCustomerInfo.photo = newimageName
            await happyCustomerInfo.save()

            // Getting Happy Customer
            const lastHappyCustomer = await HappyCustomer.query()
            .where('id', happyCustomerInfo.id)
            .select(
              'id', 
              'f_name', 
              'l_name', 
              'star', 
              'details', 
              'photo', 
              'status'
            )
            .first()
          
            return response.json({
                TYPE: 'success',
                MESSAGE:
                'Happy Customer Successfully Added',
                DATA: lastHappyCustomer
            })
        }
        
    }
    
      
    } catch (addHappyCustomerError) {
      console.log(addHappyCustomerError)
    }
  }

  
  /**
   * Update happycustomer details.
   * PUT or PATCH happycustomers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async happyCustomerUpdate({ request, response }) {
    try {
     
      const {
        id,
        f_name,
        l_name,
        star,
        details
      } = request.input('editServicePage')
      

      // Finding Happy Customer
      const findHappyCustomer = await HappyCustomer.query()
        .where('id', id)
        .select(
          'id', 
          'f_name', 
          'l_name', 
          'star', 
          'details', 
          'photo', 
          'status'
        )
        .first()
        
      if (findHappyCustomer && findHappyCustomer !== undefined) {

        const fileInfo = request.file("photo");

        if(!fileInfo){
          findHappyCustomer.f_name = f_name
          findHappyCustomer.l_name  = l_name 
          findHappyCustomer.star  = star 
          findHappyCustomer.details  = details 
          await findHappyCustomer.save()

          // return successful
          return response.json({
            STATUS: '400',
            TYPE: 'success',
            MESSAGE:
              'Happy Customer Successfully Updated'
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
              await Drive.delete(imageUploadUrl + findHappyCustomer.photo);
              findHappyCustomer.f_name = f_name
              findHappyCustomer.l_name  = l_name 
              findHappyCustomer.star  = star 
              findHappyCustomer.details  = details 
              findHappyCustomer.photo = newimageName
              await findHappyCustomer.save()

             // return successful
              return response.json({
                STATUS: '400',
                TYPE: 'success',
                MESSAGE:
                  'Happy Customer Successfully Updated'
              })
            }
          
          }
     
      }
     
    } catch (updateHappyCustomerError) {
      console.log(updateHappyCustomerError)
    }
  }

      /**
   * Updating Category Status
   * Updating the Status from 1 to 0 or Vice Versa
   * @param categoryId
   * @return {Object}
   */
  async getHappyCustomerStatus({ request, response }) {
    try {
      const { happyCustomerId } = request.all()
      if (!happyCustomerId || isNaN(happyCustomerId)) return 'error'
      // Finding Happy Customer
      const findHappyCustomer = await HappyCustomer.query()
        .where('id', happyCustomerId)
        .select('id', 'status')
        .first()
      if (findHappyCustomer && findHappyCustomer !== undefined) {
        findHappyCustomer.status = findHappyCustomer.status === 1 ? 0 : 1
        await findHappyCustomer.save()
      }
        // return successful
        return response.json({
        TYPE: 'success',
        MESSAGE:
          'Happy Customer Status Successfully Changed',
        DATA: findHappyCustomer
      })
    
    } catch (updateHappyCustomerError) {
      console.log(updateHappyCustomerError)
    }
  }
  /**
   * Delete a happycustomer with id.
   * DELETE happycustomers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async deleteHappyCustomer({ params, response, request }) {
      try {
        const { id } = params;
       
        const happyCustomerInfo = await HappyCustomer.query()
          .where("id", id)
          .select("id", "photo")
          .first();
  
        if (!happyCustomerInfo) {
          return response.json({
            STATUS: '400',
            MESSAGE:
              'Please reload the page',
          })
        }
        if (happyCustomerInfo != null) {
          const fileName = happyCustomerInfo.photo;
          var imageUploadUrl = ENV.get("IMG_URL");
          await Drive.delete(imageUploadUrl + fileName);
        }
        await happyCustomerInfo.delete();
        return response.json({
          TYPE: 'success',
          MESSAGE:
            'Happy Customer Expert successfully Deleted',
            servicePageInfo: happyCustomerInfo.toJSON(),
        })
    
      } catch (deleteErrorHappyCustomer) {
        console.log(deleteErrorHappyCustomer);
      }
    }
}

module.exports = HappyCustomerController
