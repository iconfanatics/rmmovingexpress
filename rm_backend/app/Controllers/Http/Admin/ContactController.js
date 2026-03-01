'use strict'

const Contact = use('App/Models/Contact')

class ContactController {

      /**
   * Show a list of all Contact.
   * GET Contact
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

      async getContact ({ auth, request, response }) {
          try{
            const contactInfo = await Contact.query()
            .select(
              'id', 
              'name', 
              'email', 
              'phone', 
              'subject', 
              'message'
            )
            .fetch();

            return contactInfo

          }catch(contactError){
            console.log(contactError)
          }
        }
}

module.exports = ContactController
