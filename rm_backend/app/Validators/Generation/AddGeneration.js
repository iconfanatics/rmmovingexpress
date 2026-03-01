'use strict'
/**
 ** File Name: AddGeneration.js
 ** Validating Adding Generation
 ** Namespace: App/Validators/Generation
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
class AddGeneration {
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
    const { id } = this.ctx.request.input('generationInfo')
    // const categoryId = this.ctx.params.id
    // console.log(this.ctx.request.all())
    // console.log(id)
    const rules = {
      'generationInfo.generation_name': `required|unique:generations,generation_name,id,${id}`,
    }
    return rules
  }
  /**
   * Custom validation Messages
   * @param null
   */
  get messages() {
    return {
      'generationInfo.generation_name.required': 'Generation name is required',
      'generationInfo.generation_name.unique':
        'Generation has already been added.',
    }
  }
  /**
   * Messages when validation is failed
   */
  async fails(errorMessages) {
    // formatting the error messages for vee-validate (client side)
    let formedErrorMessages = {
      generation_name: '',
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

module.exports = AddGeneration
