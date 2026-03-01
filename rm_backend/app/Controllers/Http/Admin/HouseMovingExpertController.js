'use strict'


/**
 ** File Name: HouseMovingExpertController.js
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
const HouseMovingExpert = use('App/Models/HouseMovingExpert')

/** Exception Section */
const EServices = use('App/Services/Exceptions/ExceptionsServices')
const ExceptionsServices = new EServices()

/**
 * Resourceful controller for interacting with housemovingexperts
 */
class HouseMovingExpertController {
  /**
   * Show a list of all housemovingexperts.
   * GET housemovingexperts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async getMovingExpert ({ auth, request, response }) {
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
   * Render a form to be used for creating a new housemovingexpert.
   * GET housemovingexperts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async addMovingExpert({ request, response }) {
    try {
    
      const {
        sort_title,
        title,
        details
      } = request.input('newServicePage')
     
      
    
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
            const houseMovingExpertInfo = new HouseMovingExpert()
            houseMovingExpertInfo.sort_title = sort_title
            houseMovingExpertInfo.title  = title 
            houseMovingExpertInfo.details  = details 
            houseMovingExpertInfo.photo = newimageName
            await houseMovingExpertInfo.save()

            // Getting last Moving Expert
            const lastMovingExpert = await HouseMovingExpert.query()
            .where('id', houseMovingExpertInfo.id)
            .select(
                'id',
                'sort_title',
                'title',
                'details',
                'photo',
                'status',
            )
            .first()
          
            return response.json({
                TYPE: 'success',
                MESSAGE:
                'Moving Expert Successfully Added',
                DATA: lastMovingExpert
            })
        }
        
    }
    
      
    } catch (addMovingExpertError) {
      console.log(addMovingExpertError)
    }
  }
 

  /**
   * Update housemovingexpert details.
   * PUT or PATCH housemovingexperts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
    async movingExpertUpdate({ request, response }) {
    try {
     
      const {
        id,
        sort_title,
        title,
        details
      } = request.input('editServicePage')
      

      // Finding Moving Expert
      const findMovingExpert = await HouseMovingExpert.query()
        .where('id', id)
        .select(
          'id',
          'sort_title',
          'title',
          'details',
          'photo',
          'status',
        )
        .first()
        
      if (findMovingExpert && findMovingExpert !== undefined) {

        const fileInfo = request.file("photo");

        if(!fileInfo){
          findMovingExpert.sort_title = sort_title
          findMovingExpert.title  = title 
          findMovingExpert.details  = details 
          await findMovingExpert.save()

          // return successful
          return response.json({
            STATUS: '400',
            TYPE: 'success',
            MESSAGE:
              'Moving Expert Successfully Updated'
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
              await Drive.delete(imageUploadUrl + findMovingExpert.photo);
              findMovingExpert.sort_title = sort_title
              findMovingExpert.title  = title 
              findMovingExpert.details  = details 
              findMovingExpert.photo = newimageName
              await findMovingExpert.save()

             // return successful
              return response.json({
                STATUS: '400',
                TYPE: 'success',
                MESSAGE:
                  'Moving Expert Successfully Updated'
              })
            }
          
          }
     
      }
     
    } catch (updateMovingExpertError) {
      console.log(updateMovingExpertError)
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
      const { movingExpertId } = request.all()
      if (!movingExpertId || isNaN(movingExpertId)) return 'error'
      // Finding Service Page
      const findHouseMovingExpert = await HouseMovingExpert.query()
        .where('id', movingExpertId)
        .select('id', 'status')
        .first()
      if (findHouseMovingExpert && findHouseMovingExpert !== undefined) {
        findHouseMovingExpert.status = findHouseMovingExpert.status === 1 ? 0 : 1
        await findHouseMovingExpert.save()
      }
        // return successful
        return response.json({
        TYPE: 'success',
        MESSAGE:
          'Moving Expert Status Successfully Changed',
        DATA: findHouseMovingExpert
      })
    
    } catch (updatePageStatusError) {
      console.log(updatePageStatusError)
    }
  }

  /**
   * Delete a housemovingexpert with id.
   * DELETE housemovingexperts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
     async deleteMovingExpert({ params, response, request }) {
      try {
        const { id } = params;
       
        const movingExpertInfo = await HouseMovingExpert.query()
          .where("id", id)
          .select("id", "photo")
          .first();
  
        if (!movingExpertInfo) {
          return response.json({
            STATUS: '400',
            MESSAGE:
              'Please reload the page',
          })
        }
        if (movingExpertInfo != null) {
          const fileName = movingExpertInfo.photo;
          var imageUploadUrl = ENV.get("IMG_URL");
          await Drive.delete(imageUploadUrl + fileName);
        }
        await movingExpertInfo.delete();
        return response.json({
          TYPE: 'success',
          MESSAGE:
            'House Moving Expert successfully Deleted',
            servicePageInfo: movingExpertInfo.toJSON(),
        })
    
      } catch (deleteErrorMovingExpert) {
        console.log(deleteErrorMovingExpert);
      }
    }
}

module.exports = HouseMovingExpertController
