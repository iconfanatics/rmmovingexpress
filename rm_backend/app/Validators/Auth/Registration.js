'use strict'
/**
 ** File Name: Registration.js
 ** To validate the Registration Process
 ** Namespace: App/Validators/Auth
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: MIT
 **/
class Registration {
  /**
   * Validating all field
   * @param null
   */
  get validateAll() {
    return true
  }
  /**
   * Custom validation Rules
   * @param null
   */
  get rules() {
    return {
      // 'registrationInfo.first_name': 'required',
      // 'registrationInfo.last_name': 'required',
      // 'registrationInfo.email': 'required|email|unique:clients,email',
      // 'registrationInfo.address': 'required',
      // 'registrationInfo.gender': 'required',
      // 'registrationInfo.mobile_no': 'required',
      // 'registrationInfo.user_id': 'required',
      'registrationInfo.password': 'required|confirmed|min:8',
      // 'registrationInfo.password_confirmation': 'required',
    }
  }
  /**
   * Custom validation Messages
   * @param null
   */
  get messages() {
    return {
      // 'registrationInfo.first_name.required': 'First Name is required',
      // 'registrationInfo.last_name.required': 'Last Name is required',
      // 'registrationInfo.email.required': 'Email is required',
      // 'registrationInfo.email.email': 'Email is invalid',
      // 'registrationInfo.email.unique': 'Email is already used.',
      // 'registrationInfo.address.required': 'Address is required',
      // 'registrationInfo.gender.required': 'Gender is required',
      // 'registrationInfo.mobile_no.required': 'Mobile No is required',
      // 'registrationInfo.user_id.required': 'User ID is required',
      // 'registrationInfo.password.required': 'Password is required',
      // 'registrationInfo.password.min': 'Password must be at least 8 digits.',
      // 'registrationInfo.password.confirmed': "Password doesn't match",
      // 'registrationInfo.password_confirmation.required':
      //   'Retype Password is required',
    }
  }
  /**
   * Messages when validation is failed
   */
  async fails(errorMessages) {
    // formatting the error messages for vee-validate (client side)
    let formedErrorMessages = {
      // first_name: '',
      // last_name: '',
      // email: '',
      // address: '',
      // gender: '',
      // mobile_no: '',
      // user_id: '',
      // password: '',
      // password_confirmation: '',
    }
    if (errorMessages) {
      errorMessages.forEach((error) => {
        // console.log(error)
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

module.exports = Registration
