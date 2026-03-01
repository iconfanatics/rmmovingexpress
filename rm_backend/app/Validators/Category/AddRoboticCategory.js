'use strict'

const { ResponseValidationFailed } = require('../../../utils/responses')

/**
 ** File Name: AddRoboticCategory.js
 ** Validating Adding Robotic Category
 ** Namespace: App/Validators/Category
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
class AddRoboticCategory {
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
    const { id } = this.ctx.request.input('categoryInfo')
    // const categoryId = this.ctx.params.id
    // console.log(this.ctx.request.all())
    // console.log(id)
    const rules = {
      'categoryInfo.category_name': `required|unique:robotics_categories,category_name,id,${id}`,
      'categoryInfo.short_name': 'required',
    }
    return rules
  }
  /**
   * Custom validation Messages
   * @param null
   */
  get messages() {
    return {
      'categoryInfo.category_name.required': 'Category name is required',
      'categoryInfo.category_name.unique': 'Category has already been added.',
      'categoryInfo.short_name.required': 'Category short name is required',
    }
  }
  /**
   * Messages when validation is failed
   */
  async fails(errorMessages) {
    // formatting the error messages for vee-validate (client side)
    let formedErrorMessages = {}
    if (errorMessages) {
      errorMessages.forEach((error) => {
        let field = error.field.substring(
          error.field.indexOf('.') + 1,
          error.field.length
        )
        formedErrorMessages[field] = error.message
      })
    }
    // returning response
    // return this.ctx.response.status(400).json({
    //   status: 400,
    //   messages: formedErrorMessages,
    // })

    // Returning response
    return this.ctx.response.status(200).json(
      ResponseValidationFailed({
        status: 400,
        message: formedErrorMessages,
      })
    )
  }
}

module.exports = AddRoboticCategory
