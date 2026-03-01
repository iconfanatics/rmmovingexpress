'use strict'


/** 
 ** File Name: AboutUsClientController.js
 ** Controlling Client Section
 ** Namespace: App/Controllers/Http/Common
 ** Developed By: Md. Mijanur Rahman
 ** Maintained By: Md. Mijanur Rahman
 ** Email: mizandev000@gmail.com
 **/

/** Models Section */
const AboutUs = use('App/Models/AboutUs')
const Team = use('App/Models/Team')


/**
 * Resourceful controller for interacting with aboutuses
 */
class AboutUsClientController {
     /**
   * Show a list of all company information.
   * GET company information
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
    async getCompanyInformation ({ auth, request, response }) {
      try{
        const companyInformation = await AboutUs.query()
        .select('id', 'sort_title', 'title', 'details', 'photo', 'status')
        .orderBy('id', 'desc') 
      .first()  

        return companyInformation

      }catch(aboutUsError){
        console.log(aboutUsError)
      }
    }

       /**
   * Show a list of all company information.
   * GET company information
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async getClientTeam ({ auth, request, response }) {
      try{
        const teamInfo = await Team.query()
        .select(
          'id', 
          'designation', 
          'name', 
          'details', 
          'photo', 
          'status'
        )
        .fetch();

        return teamInfo

      }catch(teamError){
        console.log(teamError)
      }
  }
}

module.exports = AboutUsClientController
