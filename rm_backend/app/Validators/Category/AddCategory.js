'use strict'
/**
 ** File Name: AddCategory.js
 ** Validating Adding Category
 ** Namespace: App/Validators/Category
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
class AddCategory {
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
      'categoryInfo.category_name': `required|unique:categories,category_name,id,${id}`,
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
    }
  }
  /**
   * Messages when validation is failed
   */
  async fails(errorMessages) {
    // formatting the error messages for vee-validate (client side)
    let formedErrorMessages = {
      category_name: '',
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

module.exports = AddCategory
