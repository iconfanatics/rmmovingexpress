'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Quote extends Model {
 /**
 * Table Name
 */
  static get table() {
    return 'quotes'
  }
}

module.exports = Quote
