'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class HouseMovingExpert extends Model {
  /**
 * Table Name
 */
  static get table() {
    return 'house_moving_experts'
  }
}

module.exports = HouseMovingExpert
