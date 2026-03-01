'use strict'
/**
 ** File Name: AddSocialmedia.js
 ** Validating Adding Socialmedia
 ** Namespace: App/Validators/Socialmedia
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
class AddSocialmedia {
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
    const { id } = this.ctx.request.input('socialmediaInfo')
    const rules = {
      'socialmediaInfo.name': `required|unique:socialmedias,name,id,${id}`,
      'socialmediaInfo.pretty_name': `required`,
      'socialmediaInfo.logo': `required`,
      'socialmediaInfo.image': `required`,
    }
    return rules
  }
  /**
   * Custom validation Messages
   * @param null
   */
  get messages() {
    return {
      'socialmediaInfo.name.required': 'Socialmedia name is required',
      'socialmediaInfo.name.unique': 'Socialmedia has already been added.',
      'socialmediaInfo.pretty_name.required':
        'Socialmedia pretty_name is required',
      'socialmediaInfo.logo.required': 'Socialmedia logo is required',
      'socialmediaInfo.image.required': 'Socialmedia image is required',
    }
  }
  /**
   * Messages when validation is failed
   */
  async fails(errorMessages) {
    // formatting the error messages for vee-validate (client side)
    let formedErrorMessages = {
      name: '',
      pretty_name: '',
      logo: '',
      image: '',
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

module.exports = AddSocialmedia
