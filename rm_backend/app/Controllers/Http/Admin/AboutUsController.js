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
const AboutUs = use('App/Models/AboutUs')

/** Exception Section */
const EServices = use('App/Services/Exceptions/ExceptionsServices')
const ExceptionsServices = new EServices()

/**
 * Resourceful controller for interacting with aboutuses
 */
class AboutUsController {
  /**
   * Show a list of all aboutuses.
   * GET aboutuses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
    async getAboutUs ({ auth, request, response }) {
      try{
        const aboutUsInfo = await AboutUs.query()
        .select('id', 'sort_title', 'title', 'details', 'photo', 'status')
        .fetch();

        return aboutUsInfo

      }catch(aboutUsError){
        console.log(aboutUsError)
      }
    }

   
    
  /**
   * Render a form to be used for creating a new aboutus.
   * GET aboutuses/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async addAboutUs({ request, response }) {
    try {
    
      const {
        sort_title,
        title,
        details
      } = request.input('newServicePage')
    
    const fileInfo = request.file("photo");

    // check photo
    if (!fileInfo) {
        return ExceptionsServices.resourceMissing('About Us image')
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
            const aboutUsInfo = new AboutUs()
            aboutUsInfo.sort_title = sort_title
            aboutUsInfo.title  = title 
            aboutUsInfo.details  = details 
            aboutUsInfo.photo = newimageName
            await aboutUsInfo.save()

            // Getting last About Us
            const lastAboutUs = await AboutUs.query()
            .where('id', aboutUsInfo.id)
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
                'About Us Successfully Added',
                DATA: lastAboutUs
            })
        }
        
    }
    
      
    } catch (addAboutUsError) {
      console.log(addAboutUsError)
    }
  }
 

  /**
   * Update aboutus details.
   * PUT or PATCH aboutuses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async aboutUsUpdate({ request, response }) {
    try {
     
      const {
        id,
        sort_title,
        title,
        details
      } = request.input('editServicePage')
      

      // Finding About Us
      const findAboutUs = await AboutUs.query()
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
        
      if (findAboutUs && findAboutUs !== undefined) {

        const fileInfo = request.file("photo");

        if(!fileInfo){
          findAboutUs.sort_title = sort_title
          findAboutUs.title  = title 
          findAboutUs.details  = details 
          await findAboutUs.save()

          // return successful
          return response.json({
            STATUS: '400',
            TYPE: 'success',
            MESSAGE:
              'About Us Successfully Updated'
          })
        }

           // check photo
           if (fileInfo == null) {
            return response.json({
              STATUS: '400',
              MESSAGE:
                'About Us Image Missing',
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
              await Drive.delete(imageUploadUrl + findAboutUs.photo);
              findAboutUs.sort_title = sort_title
              findAboutUs.title  = title 
              findAboutUs.details  = details 
              findAboutUs.photo = newimageName
              await findAboutUs.save()

             // return successful
              return response.json({
                STATUS: '400',
                TYPE: 'success',
                MESSAGE:
                  'About Us Successfully Updated'
              })
            }
          
          }
     
      }
     
    } catch (updateAboutUsError) {
      console.log(updateAboutUsError)
    }
  }

        /**
   * Updating Category Status
   * Updating the Status from 1 to 0 or Vice Versa
   * @param categoryId
   * @return {Object}
   */
  async aboutUsStatus({ request, response }) {
    try {
      const { aboutUsId } = request.all()
      if (!aboutUsId || isNaN(aboutUsId)) return 'error'
      // Finding Service Page
      const findAboutUs = await AboutUs.query()
        .where('id', aboutUsId)
        .select('id', 'status')
        .first()
      if (findAboutUs && findAboutUs !== undefined) {
        findAboutUs.status = findAboutUs.status === 1 ? 0 : 1
        await findAboutUs.save()
      }
        // return successful
        return response.json({
        TYPE: 'success',
        MESSAGE:
          'About Us Status Successfully Changed',
        DATA: findAboutUs
      })
    
    } catch (updateAboutUsError) {
      console.log(updateAboutUsError)
    }
  }

  /**
   * Delete a aboutus with id.
   * DELETE aboutuses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
     async deleteAboutUs({ params, response, request }) {
      try {
        const { id } = params;
       
        const aboutUsInfo = await AboutUs.query()
          .where("id", id)
          .select("id", "photo")
          .first();
  
        if (!aboutUsInfo) {
          return response.json({
            STATUS: '400',
            MESSAGE:
              'Please reload the page',
          })
        }
        if (aboutUsInfo != null) {
          const fileName = aboutUsInfo.photo;
          var imageUploadUrl = ENV.get("IMG_URL");
          await Drive.delete(imageUploadUrl + fileName);
        }
        await aboutUsInfo.delete();
        return response.json({
          TYPE: 'success',
          MESSAGE:
            'About Us successfully Deleted',
            servicePageInfo: aboutUsInfo.toJSON(),
        })
    
      } catch (deleteAboutUsInfoExpert) {
        console.log(deleteAboutUsInfoExpert);
      }
    }
}

module.exports = AboutUsController
