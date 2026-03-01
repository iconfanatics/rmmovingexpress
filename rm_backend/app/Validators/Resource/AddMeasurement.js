'use strict'
/**
 ** File Name: AddResource.js
 ** Validating Adding Resource
 ** Namespace: App/Validators/Resource
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
class AddMeasurement {
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
      'measurementInfo.unit_name': `required`,
      'measurementInfo.unit_short_name': `required`,
      'measurementInfo.added_by': `required`
    }
    return rules
  }
  /**
   * Custom validation Messages
   * @param null
   */
  get messages() {
    return {
      'resourceInfo.title.required': 'Title is required',
    }
  }
  /**
   * Messages when validation is failed
   */
  async fails(errorMessages) {
    // formatting the error messages for vee-validate (client side)
    let formedErrorMessages = {
      name: '',
      // description: '',
      // ad_image1: '',
      // ad_image2: '',
      // link1: '',
      // link2: '',
      // link3: '',
      // time_span: '',
      // socialmedia_id: '',
      // reward_amount: '',
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

module.exports = AddMeasurement
