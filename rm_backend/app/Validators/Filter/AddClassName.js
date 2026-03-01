'use strict'
/**
 ** File Name: AddSaleType.js
 ** Validating Adding Filter
 ** Namespace: App/Validators/Filter
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
class AddClassName {
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
      'classNameInfo.class_name': `required`,
      'classNameInfo.price': `required`,
      'classNameInfo.type': `required`,
      'classNameInfo.added_by': `required`,
    }
    return rules
  }
  /**
   * Custom validation Messages
   * @param null
   */
  get messages() {
    return {
      'saleTypeInfo.sale_type_name.required': 'Title is required',
      // 'resourceInfo.description.required': 'description is required',
      // 'resourceInfo.ad_image1.required': 'ad_image1 is required',
      // 'resourceInfo.ad_image2.required': 'ad_image2 is required',
      // 'resourceInfo.link1.required': 'link1 is required',
      // 'resourceInfo.link2.required': 'link2 is required',
      // 'resourceInfo.link3.required': 'link3 is required',
      // 'resourceInfo.time_span.required': 'time_span is required',
      // 'resourceInfo.socialmedia_id.required': 'socialmedia_id is required',
      // 'resourceInfo.reward_amount.required': 'reward_amount is required',
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

module.exports = AddClassName
