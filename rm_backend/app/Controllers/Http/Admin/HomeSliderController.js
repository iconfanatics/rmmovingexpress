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
const HomeSlider = use('App/Models/HomeSlider')

/** Exception Section */
const EServices = use('App/Services/Exceptions/ExceptionsServices')
const ExceptionsServices = new EServices()

/**
 * Resourceful controller for interacting with homesliders
 */
class HomeSliderController {
  /**
   * Show a list of all homesliders.
   * GET homesliders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async getHomeSlider ({ auth, request, response }) {
    try{
      const homeSlider = await HomeSlider.query()
      .select('id', 'titile', 'sub_titile', 'status')
      .fetch();

      return homeSlider

    }catch(getHomeSliderError){
      console.log(getHomeSliderError)
    }
  }

  /**
   * Render a form to be used for creating a new homeslider.
   * GET homesliders/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async addHomeSlider ({ request, response, view }) {
      try {
      const { titile, sub_titile  } = request.input('homeSliderInfo')

        // check missing titile
        if (!titile) {
          return ExceptionsServices.resourceMissing('Titile')
        }
        // check missing titile
        if (!sub_titile) {
          return ExceptionsServices.resourceMissing('Sub Titile')
        }

        // Adding Home Slider
        const homeSliderInfo = new HomeSlider()
        homeSliderInfo.titile = titile
        homeSliderInfo.sub_titile = sub_titile
        await homeSliderInfo.save()
        // returning response
        return ExceptionsServices.resourceAddSuccessful('Home Slider')
      } catch (addHomeSliderError) {
          console.log(addHomeSliderError)
      }
  }

  /**
   * Update homeslider details.
   * PUT or PATCH homesliders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async updateHomeSlider({ request, response }) {
    try {
      const { id, titile, sub_titile } = request.input('homeSliderInfo')
     
      // check missing titile
      if (!titile) {
        return ExceptionsServices.resourceMissing('Titile')
      }
      // check missing titile
      if (!sub_titile) {
        return ExceptionsServices.resourceMissing('Sub Titile')
      }
      
      const findHomeSliderInfo = await HomeSlider.query()
        .where('id', id)
        .select('id', 'titile', 'sub_titile')
        .first()
      if (findHomeSliderInfo && findHomeSliderInfo !== undefined) {
        findHomeSliderInfo.titile = titile
        findHomeSliderInfo.sub_titile = sub_titile
        await findHomeSliderInfo.save()
      }
      // return successful
      return ExceptionsServices.resourceUpdateSuccessful('Home Slider')
    } catch (updateHomeSliderError) {
      console.log(updateHomeSliderError)
    }
  }

     /**
   * Updating Category Status
   * Updating the Status from 1 to 0 or Vice Versa
   * @param categoryId
   * @return {Object}
   */
     async postUpdateHomeSliderStatus({ request, response }) {
      try {
        const { homeSliderId } = request.all()
        if (!homeSliderId || isNaN(homeSliderId)) return 'error'
        // Finding Home Slider
        const findHomeSlider = await HomeSlider.query()
          .where('id', homeSliderId)
          .select('id', 'status')
          .first()
        if (findHomeSlider && findHomeSlider !== undefined) {
          findHomeSlider.status = findHomeSlider.status === 1 ? 0 : 1
          await findHomeSlider.save()
        }
         // return successful
         return response.json({
          TYPE: 'success',
          MESSAGE:
            'Home Slider Status Successfully Changed',
          DATA: findHomeSlider
        })
      } catch (updateHomeSliderError) {
        console.log(updateHomeSliderError)
      }
    }


  /**
   * Delete a homeslider with id.
   * DELETE homesliders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async deleteHomeSlider({ params, response, request }) {
    try {
      const { id } = params;
     
      const homeSliderInfo = await HomeSlider.query()
        .where("id", id)
        .first();

        if (!homeSliderInfo) {
            return ExceptionsServices.resourceMissing('Home Slider')
        }
     
      await homeSliderInfo.delete();
      return response.json({
        TYPE: 'success',
        MESSAGE:
          'Home Slider successfully Deleted',
          homeSliderInfo: homeSliderInfo.toJSON(),
      })
  
    } catch (deleteErrorHomeSlider) {
      console.log(deleteErrorHomeSlider);
    }
}
}

module.exports = HomeSliderController
