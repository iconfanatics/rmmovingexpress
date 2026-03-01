'use strict'
/**
 ** File Name: AddRobotic.js
 ** Validating Adding Robotic
 ** Namespace: App/Validators/Robotic
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
class UpdateRobotiClassification {
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
      'editClassification.classification_name': `required`,
      'editClassification.added_by': `required`
    }
    return rules
  }
  /**
   * Custom validation Messages
   * @param null
   */
  get messages() {
    return {
      'newClassification.classification_name.required': 'Name is required',
      // 'roboticInfo.description.required': 'description is required',
      // 'roboticInfo.ad_image1.required': 'ad_image1 is required',
      // 'roboticInfo.ad_image2.required': 'ad_image2 is required',
      // 'roboticInfo.link1.required': 'link1 is required',
      // 'roboticInfo.link2.required': 'link2 is required',
      // 'roboticInfo.link3.required': 'link3 is required',
      // 'roboticInfo.time_span.required': 'time_span is required',
      // 'roboticInfo.socialmedia_id.required': 'socialmedia_id is required',
      // 'roboticInfo.reward_amount.required': 'reward_amount is required',
    }
  }
  /**
   * Messages when validation is failed
   */
  async fails(errorMessages) {
    // formatting the error messages for vee-validate (client side)
    let formedErrorMessages = {
      // name: '',
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

module.exports = UpdateRobotiClassification
