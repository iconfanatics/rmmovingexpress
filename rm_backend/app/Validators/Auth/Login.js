'use strict'
/**
 ** File Name: Login.js
 ** Validating Logging
 ** Namespace: App/Validators/Auth
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
class Login {
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
      'loginInfo.email': `required|email`,
      'loginInfo.password': `required`,
    }
    return rules
  }
  /**
   * Custom validation Messages
   * @param null
   */
  get messages() {
    return {
      'loginInfo.email.required': 'Email is required.',
      'loginInfo.email.email': 'Email is not valid.',
      'loginInfo.email.password': 'Password is required.',
    }
  }
  /**
   * Messages when validation is failed
   */
  async fails(errorMessages) {
    // formatting the error messages for vee-validate (client side)
    let formedErrorMessages = {
      email: '',
      password: '',
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
      STATUS: 401,
      CODE: 'Z_VALIDATION_FAILED',
      MESSAGES: formedErrorMessages,
      TYPE: 'error',
    })
  }
}

module.exports = Login
