'use strict'
/**
 ** File Name: AddProperty.js
 ** Validating Adding Property
 ** Namespace: App/Validators/Property
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
class AddProperty {
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
      'propertyClientInfo.user_id': `required`,
      'propertyClientInfo.country_id': `required`,
      'propertyClientInfo.state_id': `required`,
      'propertyClientInfo.city_id': `required`,
      'propertyClientInfo.property_location': `required`,
      'propertyClientInfo.custom_description': `required`,
      'propertyClientInfo.ground_quantity': `required`,
      'propertyClientInfo.ground_type': `required`,
      'propertyClientInfo.class_type': `required`,
      'propertyClientInfo.payment_type_id': `required`,
      'propertyClientInfo.sale_type': `required`,
      'propertyClientInfo.buy_now_price': `required`,
      'propertyClientInfo.sale_price': `required`,
      'propertyClientInfo.generation_id': `required`,
      // 'propertyClientInfo.promo_code': `required`,
      'propertyClientInfo.promo_code_discount_percent': `required`,
      'propertyClientInfo.top_position': `required`,
      'propertyClientInfo.show_days': `required`,
      'propertyClientInfo.acquisition_protection_fee': `required`,
      'propertyClientInfo.imageUrl': `required`,
      'propertyClientInfo.property_lands': `required`,
      'propertyClientInfo.transaction_date_time': `required`,
      'propertyClientInfo.action_type': `required`,
      'propertyClientInfo.user_id_for_buy_from': `required`,
      'propertyClientInfo.user_name_for_buy_from': `required`,
      'propertyClientInfo.user_id_for_registration': `required`,
      'propertyClientInfo.user_name_for_registration': `required`,
      'propertyClientInfo.transaction_fee': `required`,
      'propertyClientInfo.moderator_id': `required`,
      'propertyClientInfo.per_ground_price': `required`,
      'propertyClientInfo.total_price_paid': `required`,
      // 'propertyClientInfo.reward_amount': `required`,
    }
    return rules
  }
  /**
   * Custom validation Messages
   * @param null
   */
  get messages() {
    return {
      'propertyClientInfo.user_id.required': 'User Id is required',
      'propertyClientInfo.country_id.required': 'Country Id is required',
      'propertyClientInfo.state_id.required': 'State Id is required',
      'propertyClientInfo.city_id.required': 'City Id is required',
      'propertyClientInfo.property_location.required': 'Property location is required',
      'propertyClientInfo.custom_description.required': 'Custom description is required',
      'propertyClientInfo.ground_quantity.required': 'Ground quantity is required',
      'propertyClientInfo.ground_type.required': 'Ground type is required',
      'propertyClientInfo.class_type.required': 'Class type is required',
      'propertyClientInfo.payment_type_id.required': 'Payment type id is required',
      'propertyClientInfo.sale_type.required': 'Sale type is required',
      'propertyClientInfo.buy_now_price.required': 'Buy now price is required',
      'propertyClientInfo.sale_price.required': 'Sale price is required',
      'propertyClientInfo.generation_id.required': 'Generation id is required',
      // 'propertyClientInfo.promo_code.required': 'Promo code is required',
      'propertyClientInfo.promo_code_discount_percent.required': 'Promo code discount percent is required',
      'propertyClientInfo.top_position.required': 'Top position is required',
      'propertyClientInfo.show_days.required': 'Show days is required',
      'propertyClientInfo.acquisition_protection_fee.required': 'Acquisition protection fee is required',
      'propertyClientInfo.imageUrl.required': 'Image Url is required',
      'propertyClientInfo.property_lands.required': 'Lat long number and resource id is required',
      'propertyClientInfo.transaction_date_time.required': 'Transaction date time is required',
      'propertyClientInfo.action_type.required': 'Action type is required',
      'propertyClientInfo.user_id_for_buy_from.required': 'User id for buy from is required',
      'propertyClientInfo.user_name_for_buy_from.required': 'User name for buy from is required',
      'propertyClientInfo.user_id_for_registration.required': 'User id for registration is required',
      'propertyClientInfo.user_name_for_registration.required': 'User name for registration is required',
      'propertyClientInfo.transaction_fee.required': 'Transaction fee is required',
      'propertyClientInfo.moderator_id.required': 'Moderator id is required',
      'propertyClientInfo.per_ground_price.required': 'Per ground price is required',
      'propertyClientInfo.total_price_paid.required': 'Total price paid is required',
      // 'propertyClientInfo.reward_amount.required': 'reward_amount is required',
    }
  }
  /**
   * Messages when validation is failed
   */
  async fails(errorMessages) {
    // formatting the error messages for vee-validate (client side)
    let formedErrorMessages = {
      user_id: '',
      country_id: '',
      state_id: '',
      city_id: '',
      property_location: '',
      custom_description: '',
      ground_quantity: '',
      ground_type: '',
      class_type: '',
      sale_type: '',
      payment_type_id: '',
      buy_now_price: '',
      sale_price: '',
      generation_id: '',
      // promo_code: '',
      promo_code_discount_percent: '',
      top_position: '',
      show_days: '',
      acquisition_protection_fee: '',
      imageUrl: '',
      property_lands: '',
      transaction_date_time: '',
      action_type: '',
      user_id_for_buy_from: '',
      user_name_for_buy_from: '',
      user_id_for_registration: '',
      user_name_for_registration: '',
      transaction_fee: '',
      moderator_id: '',
      per_ground_price: '',
      total_price_paid: '',
      // reward_amount: '',
      // reward_amount: '',
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

module.exports = AddProperty
