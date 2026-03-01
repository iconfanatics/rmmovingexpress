'use strict'

/**
 ** File Name: HomeBannerController.js
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
const HomeBanner = use('App/Models/HomeBanner')

/** Exception Section */
const EServices = use('App/Services/Exceptions/ExceptionsServices')
const ExceptionsServices = new EServices()

/**
 * Resourceful controller for interacting with homebanners
 */
class HomeBannerController {
  /**
   * Show a list of all homeservicebanners.
   * GET homeservicebanners
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async getHomeBanner({ request, response }) {
    try {
      // Getting all the Home Banner
      const homeBanner = await HomeBanner.query()
        .select(
          'id',
          'title',
          'details',
          'link',
          'video',
          'status'
        )
        .fetch()
      return homeBanner
    } catch (homeBannerError) {
      console.log(homeBannerError)
    }
  }

  /**
   * Render a form to be used for creating a new homeservicebanner.
   * GET homeservicebanners/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async addHomeSlider ({ request, response, view }) {
   try {

     const {
        title,
        details,
        link,
      } = request.input('newServicePage')

      if (!title) {
          return response.json({
            STATUS: '400',
            MESSAGE:
              'Title Name is required.',
          })
        }
        if (!details) {
          return response.json({
            STATUS: '400',
            MESSAGE:
              'Details is required.',
          })
        }
        if (!link) {
          return response.json({
            STATUS: '400',
            MESSAGE:
              'Link is required.',
          })
        }

        const video = request.file('video')
        

        //  // check photo
        if (!video) {
            return ExceptionsServices.resourceMissing('Banner Video')
        }
        
        
      if(video){
        if (video.size > 90000000) {
          return response.json({
              STATUS: '400',
              MESSAGE:
              'Keep in mind that the maximum file size for uploading files to Intercom is 11MB.',
          })
        }
      }

        // Generate a unique name for the video
        const videoName = `${new Date().getTime()}.${video.subtype}`

        var imageUploadUrl = ENV.get("IMG_URL");

          await video.move(Helpers.tmpPath(imageUploadUrl), {
            name: videoName,
            overwrite: true,
          });

          if (!video.moved()) {
            return response.json({
                ERROR: true,
                MESSAGE:
                'Error occurred while uploading the image',
              })
          }

         if (video.moved()) {
            const homeBannerInfo = new HomeBanner()
            homeBannerInfo.title = title
            homeBannerInfo.details = details
            homeBannerInfo.link = link
            homeBannerInfo.video = videoName
            await homeBannerInfo.save()

            // Getting Home Banner
            const lastHomeBanner = await HomeBanner.query()
            .where('id', homeBannerInfo.id)
            .select(
                'id',
                'title',
                'details',
                'link',
                'video',
                'status',
            )
            .first()

            return response.json({
                TYPE: 'success',
                MESSAGE:
                'Home Banner Successfully Added',
                DATA: lastHomeBanner
            })
         }
         

   }catch(sliderError){
    console.log(sliderError)
   }
    
  }

 
  /**
   * Update homeservicebanner details.
   * PUT or PATCH homeservicebanners/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async updateHomeBanner({ request, response }) {
    try {
     
      const {
        id,
        title,
        details,
        link,
      } = request.input('editServicePage')
      

      // Finding Service Page
      const findServicePage = await HomeBanner.query()
        .where('id', id)
        .select(
          'id',
          'title',
          'details',
          'link',
          'video',
          'status',
        )
        .first()
        
      if (findServicePage && findServicePage !== undefined) {

               const video = request.file('video')

        if(!video){
          findServicePage.title  = title 
          findServicePage.details  = details 
          findServicePage.link  = link 
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
           if (video == null) {
            return response.json({
              STATUS: '400',
              MESSAGE:
                'Service Content Image Missing',
            })
          }
  
         if(video){
            if (video.size > 90000000) {
              return response.json({
                  STATUS: '400',
                  MESSAGE:
                  'Keep in mind that the maximum file size for uploading files to Intercom is 11MB.',
              })
            }
          }
  
        const videoName = `${new Date().getTime()}.${video.subtype}`

        var imageUploadUrl = ENV.get("IMG_URL");
        
        await video.move(Helpers.tmpPath(imageUploadUrl), {
          name: videoName,
          overwrite: true,
        });

        if (!video.moved()) {
          return response.json({
              ERROR: true,
              MESSAGE:
              'Error occurred while uploading the image',
            })
        }
  
       if (video.moved()) {
         await Drive.delete(imageUploadUrl + findServicePage.content_image);
            findServicePage.title = title
            findServicePage.details = details
            findServicePage.link = link
            findServicePage.video = videoName
            await findServicePage.save()
        
            return response.json({
              STATUS: '400',
              TYPE: 'success',
              MESSAGE:
                'Home Banner Successfully Updated'
            })
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
  async postHomeBannerStatus({ request, response }) {
    try {
      // console.log(request.all())
      const { servicePageId } = request.all()
      if (!servicePageId || isNaN(servicePageId)) return 'error'
      // Finding Service Page
      const findServicePage = await HomeBanner.query()
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
   * Delete a homeservicebanner with id.
   * DELETE homeservicebanners/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
    async deleteHomeSlider({ params, response, request }) {
      try {
        const { id } = params;
       
        const servicePageInfo = await HomeBanner.query()
          .where("id", id)
          .select("id", "video")
          .first();
  
        if (!servicePageInfo) {
          return response.json({
            STATUS: '400',
            MESSAGE:
              'Please reload the page',
          })
        }
        if (servicePageInfo != null) {
          const fileName = servicePageInfo.video;
          var imageUploadUrl = ENV.get("IMG_URL");
          await Drive.delete(imageUploadUrl + fileName);
        }
        await servicePageInfo.delete();
        return response.json({
          TYPE: 'success',
          MESSAGE:
            'Banner successfully Deleted',
            servicePageInfo: servicePageInfo.toJSON(),
        })
    
      } catch (deleteErrorAd) {
        console.log(deleteErrorAd);
      }
    }
}

module.exports = HomeBannerController
