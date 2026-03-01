'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AdonisTestOne extends Model {
   /**
   * Table Name
   */
  static get table() {
    return 'adonis_test_ones'
  }
}

module.exports = AdonisTestOne
