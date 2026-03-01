'use strict'

/**
 ** File Name: WhyChooseUsController.js
 ** Controlling Admin Section
 ** Namespace: App/Controllers/Http/Admin
 ** Developed By: Md. Mijanur Rahman
 ** Maintained By: Md. Mijanur Rahman
 ** Email: mizandev000@gmail.com
 **/

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** Packages Section */
const ENV = use("Env");
const Helpers = use("Helpers");
const Drive = use("Drive");

/** Models Section */
const WhyChooseUs = use('App/Models/WhyChooseUs')

/** Exception Section */
const EServices = use('App/Services/Exceptions/ExceptionsServices')
const ExceptionsServices = new EServices()


/**
 * Resourceful controller for interacting with whychooseuses
 */
class WhyChooseUsController {
  /**
   * Show a list of all teams.
   * GET teams
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async getWhyChooseUs({ request, response }) {
    try {
      // Getting all the why choose us
      const whyChooseUs = await WhyChooseUs.query()
        .select(
          'id',
          'title',
          'sub_title',
          'details',
          'photo',
          'status'
        )
        .fetch()
      return whyChooseUs
    } catch (whyChooseUsError) {
      console.log(whyChooseUsError)
    }
  }

 /**
   * Render a form to be used for creating a new team.
   * GET teams/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
 async addWhyChooseUs({ request, response }) {
  try {
    const {
      title,
      sub_title,
      details
    } = request.input('newWhyChoose')

  const fileInfo = request.file("photo");
 
  // check photo
  if (!fileInfo) {
      return ExceptionsServices.resourceMissing('Why Choose Us image')
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
        const whyChooseUsfo = new WhyChooseUs()
        whyChooseUsfo.title = title
        whyChooseUsfo.sub_title = sub_title
        whyChooseUsfo.details = details
        whyChooseUsfo.photo = newimageName
        await whyChooseUsfo.save()

        // Getting Why Choose Us
        const lastWhyChooseUs = await WhyChooseUs.query()
        .where('id', whyChooseUsfo.id)
        .select(
            'id',
            'title',
            'sub_title',
            'details',
            'photo',
            'status',
        )
        .first()

        return response.json({
            TYPE: 'success',
            MESSAGE:
            'Why Choose Us Successfully Added',
            DATA: lastWhyChooseUs
        })
    }
  }
    
  } catch (addWhyChooseUsError) {
    console.log(addWhyChooseUsError)
  }
}

  /**
   * Create/save a new whychooseus.
   * POST whychooseuses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async updateWhyChooseUs({ request, response }) {
    try {
    
      const {
        id,
        title,
        sub_title,
        details,
      } = request.input('editWhyChoose')

      // Finding Why Choose Us
      const findWhyChoose = await WhyChooseUs.query()
        .where('id', id)
        .select(
          'id',
          'title',
          'sub_title',
          'details',
          'photo',
          'status'
        )
        .first()
        
      if (findWhyChoose && findWhyChoose !== undefined) {

        const fileInfo = request.file("photo");

        if(!fileInfo){
          findWhyChoose.title  = title
          findWhyChoose.sub_title  = sub_title
          findWhyChoose.details  = details
          await findWhyChoose.save()

          // return successful
          return response.json({
            STATUS: '400',
            TYPE: 'success',
            MESSAGE:
              'Team Successfully Updated'
          })
        }

           // check photo
           if (fileInfo == null) {
            return response.json({
              STATUS: '400',
              MESSAGE:
                'Team Image Missing',
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
              await Drive.delete(imageUploadUrl + findWhyChoose.photo);
              findWhyChoose.title = title
              findWhyChoose.sub_title  = sub_title 
              findWhyChoose.details  = details 
              findWhyChoose.photo = newimageName
              await findWhyChoose.save()

             // return successful
              return response.json({
                STATUS: '400',
                TYPE: 'success',
                MESSAGE:
                  'Team Successfully Updated'
              })
            }
          
          }
     
      }
     
    } catch (updateWhyChooseError) {
      console.log(updateWhyChooseError)
    }
  }

   /**
   * Updating why choose us
   * Updating the Status from 1 to 0 or Vice Versa
   * @param categoryId
   * @return {Object}
   */

  async whyChooseUsStatus({ request, response }) {
    try {
      const { whyChooseId } = request.all()
      if (!whyChooseId || isNaN(whyChooseId)) return 'error'
      // Finding Why Choose Us
      const findWhyChooseUs = await WhyChooseUs.query()
        .where('id', whyChooseId)
        .select('id', 'status')
        .first()
      if (findWhyChooseUs && findWhyChooseUs !== undefined) {
        findWhyChooseUs.status = findWhyChooseUs.status === 1 ? 0 : 1
        await findWhyChooseUs.save()
      }
      // return successful
      return response.json({
        TYPE: 'success',
        MESSAGE:
          'Why Choose Us Status Successfully Changed',
        DATA: findWhyChooseUs
      })
     
    } catch (statusWhyChooseUsError) {
      console.log(statusWhyChooseUsError)
    }
  }

  /**
   * Delete a whychooseus with id.
   * DELETE whychooseuses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async deleteWhyChooseUs({ params, response, request }) {
    try {
      const { id } = params;
     
      const whyChooseUsInfo = await WhyChooseUs.query()
        .where("id", id)
        .select("id", "photo")
        .first();

      if (!whyChooseUsInfo) {
        return response.json({
          STATUS: '400',
          MESSAGE:
            'Please reload the page',
        })
      }
      if (whyChooseUsInfo != null) {
        const fileName = whyChooseUsInfo.photo;
        var imageUploadUrl = ENV.get("IMG_URL");
        await Drive.delete(imageUploadUrl + fileName);
      }
      await whyChooseUsInfo.delete();
      return response.json({
        TYPE: 'success',
        MESSAGE:
          'Why ChooseUs Info successfully Deleted',
          whyChooseUsInfo: whyChooseUsInfo.toJSON(),
      })
  
    } catch (deleteErrorTeam) {
      console.log(deleteErrorTeam);
    }
  }
}

module.exports = WhyChooseUsController
