'use strict'
/**
 ** File Name: AddAdvertisement.js
 ** Validating Adding Advertisement
 ** Namespace: App/Validators/Advertisement
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
class AddAdvertisement {
  /**
   * Validating all fields
   * @param null
   */
  get validateAll() {
    return true
  }
  /**
   * Rules
   */
  get rules() {
    const rules = {
      'advertisementInfo.title': `required`,
      'advertisementInfo.description': `required`,
      'advertisementInfo.ad_image1': `required`,
      'advertisementInfo.ad_image2': `required`,
      'advertisementInfo.link1': `required`,
      'advertisementInfo.link2': `required`,
      'advertisementInfo.link3': `required`,
      'advertisementInfo.time_span': `required`,
      'advertisementInfo.socialmedia_id': `required`,
      'advertisementInfo.reward_amount': `required`,
    }
    return rules
  }
  /**
   * Custom validation Messages
   * @param null
   */
  get messages() {
    return {
      'advertisementInfo.title.required': 'Title is required',
      'advertisementInfo.description.required': 'description is required',
      'advertisementInfo.ad_image1.required': 'ad_image1 is required',
      'advertisementInfo.ad_image2.required': 'ad_image2 is required',
      'advertisementInfo.link1.required': 'link1 is required',
      'advertisementInfo.link2.required': 'link2 is required',
      'advertisementInfo.link3.required': 'link3 is required',
      'advertisementInfo.time_span.required': 'time_span is required',
      'advertisementInfo.socialmedia_id.required': 'socialmedia_id is required',
      'advertisementInfo.reward_amount.required': 'reward_amount is required',
    }
  }
  /**
   * Messages when validation is failed
   */
  async fails(errorMessages) {
    // formatting the error messages for vee-validate (client side)
    let formedErrorMessages = {
      title: '',
      description: '',
      ad_image1: '',
      ad_image2: '',
      link1: '',
      link2: '',
      link3: '',
      time_span: '',
      socialmedia_id: '',
      reward_amount: '',
    }
    if (errorMessages) {
      errorMessages.forEach((error) => {
        let field = error.field.substring(
          error.field.indexOf('.') + 1,
          error.field.length
        )
        formedErrorMessages[field] = error.message
      })
    }
    return this.ctx.response.send({
      STATUS: 400,
      CODE: 'Z_VALIDATION_FAILED',
      MESSAGES: formedErrorMessages,
      TYPE: 'error',
    })
  }
}

module.exports = AddAdvertisement
