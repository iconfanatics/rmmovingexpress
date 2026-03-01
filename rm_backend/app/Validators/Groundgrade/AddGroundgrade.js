'use strict'
/**
 ** File Name: AddGroundgrade.js
 ** Validating Adding Groundgrade
 ** Namespace: App/Validators/Groundgrade
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
class AddGroundgrade {
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
    const { id } = this.ctx.request.input('groundgradeInfo')
    // const categoryId = this.ctx.params.id
    // console.log(this.ctx.request.all())
    // console.log(id)
    const rules = {
      'groundgradeInfo.groundgrade_name': `required|unique:groundgrades,groundgrade_name,id,${id}`,
    }
    return rules
  }
  /**
   * Custom validation Messages
   * @param null
   */
  get messages() {
    return {
      'groundgradeInfo.groundgrade_name.required':
        'Groundgrade name is required',
      'groundgradeInfo.groundgrade_name.unique':
        'Groundgrade has already been added.',
    }
  }
  /**
   * Messages when validation is failed
   */
  async fails(errorMessages) {
    // formatting the error messages for vee-validate (client side)
    let formedErrorMessages = {
      groundgrade_name: '',
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

module.exports = AddGroundgrade
