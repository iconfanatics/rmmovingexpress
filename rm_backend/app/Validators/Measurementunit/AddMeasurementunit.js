'use strict'
/**
 ** File Name: AddMeasurementunit.js
 ** Validating Adding Measurementunit
 ** Namespace: App/Validators/Measurementunit
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
class AddMeasurementunit {
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
    const { id } = this.ctx.request.input('measurementunitInfo')
    // const measurementunitId = this.ctx.params.id
    // console.log(this.ctx.request.all())
    // console.log(id)
    const rules = {
      'measurementunitInfo.unit_name': `required|unique:measurementunits,unit_name,id,${id}`,
      'measurementunitInfo.unit_short_name': `required|unique:measurementunits,unit_short_name,id,${id}`,
    }
    return rules
  }
  /**
   * Custom validation Messages
   * @param null
   */
  get messages() {
    return {
      'measurementunitInfo.unit_name.required':
        'Measurementunit name is required',
      'measurementunitInfo.unit_name.unique':
        'Measurementunit has already been added.',
      'measurementunitInfo.unit_short_name.required':
        'Measurementunit name is required',
      'measurementunitInfo.unit_short_name.unique':
        'Measurementunit has already been added.',
    }
  }
  /**
   * Messages when validation is failed
   */
  async fails(errorMessages) {
    // formatting the error messages for vee-validate (client side)
    let formedErrorMessages = {
      unit_name: '',
      unit_short_name: '',
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

module.exports = AddMeasurementunit
