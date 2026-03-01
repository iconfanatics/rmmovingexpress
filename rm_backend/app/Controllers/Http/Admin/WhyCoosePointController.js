'use strict'

/**
 ** File Name: WhyCoosePointController.js
 ** Controlling Admin Section
 ** Namespace: App/Controllers/Http/Admin
 ** Developed By: Md. Mijanur Rahman
 ** Maintained By: Md. Mijanur Rahman
 ** Email: mizandev000@gmail.com
 **/

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** Models Section */
const WhyCoosePoint = use('App/Models/WhyCoosePoint')

/** Exception Section */
const EServices = use('App/Services/Exceptions/ExceptionsServices')
const ExceptionsServices = new EServices()

/**
 * Resourceful controller for interacting with whycoosepoints
 */
class WhyCoosePointController {
  /**
   * Show a list of all whycoosepoints.
   * GET whycoosepoints
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async getWhyChoosePoint({ request, response }) {
    try {
      // Getting all the why choose us
      const whyChoosePoint = await WhyCoosePoint.query()
        .select(
          'id',
          'title',
          'details',
          'status'
        )
        .fetch()
      return whyChoosePoint
    } catch (whyChoosePointError) {
      console.log(whyChoosePointError)
    }
  }

  /**
   * Render a form to be used for creating a new whycoosepoint.
   * GET whycoosepoints/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async addChoosePoint ({ request, response, view }) {
    try {
      
    const { title, details  } = request.input('choosePointInfo')
   
    // check titile
      if (!title) {
        return ExceptionsServices.resourceMissing('Titile')
      }
      // check missing details
      if (!details) {
        return ExceptionsServices.resourceMissing('Details')
      }
          
      // Adding Coose Point
      const whyCoosePointInfo = new WhyCoosePoint()
      whyCoosePointInfo.title = title
      whyCoosePointInfo.details = details
      await whyCoosePointInfo.save()
      // returning response
      return ExceptionsServices.resourceAddSuccessful('why choose us')
    } catch (addCoosePointError) {
        console.log(addCoosePointError)
    }
}

  /**
   * Create/save a new whycoosepoint.
   * POST whycoosepoints
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async updateWhyChoosePoint({ request, response }) {
    try {
      
      const { id, title, details } = request.input('editChoosePointInfo')
     
      // check missing ID
      if (!id) {
        return ExceptionsServices.resourceMissing('Id ')
      }
      // check missing titile
      if (!title) {
        return ExceptionsServices.resourceMissing('Title ')
      }
      // check missing titile
      if (!details) {
        return ExceptionsServices.resourceMissing('Details')
      }
      
      const findWhyCoosePoint = await WhyCoosePoint.query()
        .where('id', id)
        .select('id', 'title', 'details')
        .first()
      if (findWhyCoosePoint && findWhyCoosePoint !== undefined) {
        findWhyCoosePoint.title = title
        findWhyCoosePoint.details = details
        await findWhyCoosePoint.save()
      }
      // return successful
      return ExceptionsServices.resourceUpdateSuccessful('Why Coose  Point')
    } catch (updateWhyCooseError) {
      console.log(updateWhyCooseError)
    }
  }
     /**
   * Updating Choose Point Status
   * Updating the Status from 1 to 0 or Vice Versa
   * @param categoryId
   * @return {Object}
   */
     async whyChoosePointStatus({ request, response }) {
      try {
        const { chooseId } = request.all()
        if (!chooseId || isNaN(chooseId)) return 'error'
        // Finding Service Point
        const findServiceChoosePoint = await WhyCoosePoint.query()
          .where('id', chooseId)
          .select('id', 'status')
          .first()
        if (findServiceChoosePoint && findServiceChoosePoint !== undefined) {
          findServiceChoosePoint.status = findServiceChoosePoint.status === 1 ? 0 : 1
          await findServiceChoosePoint.save()
        }
          // return successful
          return response.json({
          TYPE: 'success',
          MESSAGE:
            'Choose Point Status Successfully Changed',
          DATA: findServiceChoosePoint
        })
      } catch (updateServicePointError) {
        console.log(updateServicePointError)
      }
    }

  /**
   * Delete a whycoosepoint with id.
   * DELETE whycoosepoints/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async deleteChoosePoint({ params, response, request }) {
    try {
   
      const { id } = params;
     
      const whyCoosePointInfo = await WhyCoosePoint.query()
        .where("id", id)
        .first();

        if (!whyCoosePointInfo) {
            return ExceptionsServices.resourceMissing('Coose Point')
        }
     
      await whyCoosePointInfo.delete();
      return response.json({
        TYPE: 'success',
        MESSAGE:
          'Coose Point successfully Deleted',
          whyCoosePointInfo: whyCoosePointInfo.toJSON(),
      })
  
    } catch (deleteErrorCoosePointPoint) {
      console.log(deleteErrorCoosePointPoint);
    }
  }
}

module.exports = WhyCoosePointController
