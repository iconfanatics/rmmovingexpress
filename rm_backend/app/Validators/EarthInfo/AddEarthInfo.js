'use strict'
/**
 ** File Name: AddEarthInfo.js
 ** Validating Adding Earth Info
 ** Namespace: App/Validators/EarthInfo
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
class AddEarthInfo {
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
    const { id } = this.ctx.request.input('earthInfo')
    // const categoryId = this.ctx.params.id
    // console.log(this.ctx.request.all())
    // console.log(id)
    const rules = {
      'earthInfo.name': `required|unique:earthinfos,name,id,${id}`,
      'earthInfo.color': `required`,
      'earthInfo.msg': `required`,
      'earthInfo.url': `required`,
    }
    return rules
  }
  /**
   * Custom validation Messages
   * @param null
   */
  get messages() {
    return {
      'earthInfo.name.required': 'Name is required',
      'earthInfo.name.unique': 'Name has already been added.',
      'earthInfo.color.required': 'Color is required',
      'earthInfo.msg.required': 'Message is required',
      'earthInfo.url.required': 'Url is required',
    }
  }
  /**
   * Messages when validation is failed
   */
  async fails(errorMessages) {
    // formatting the error messages for vee-validate (client side)
    let formedErrorMessages = {
      earthInfo: '',
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

module.exports = AddEarthInfo
