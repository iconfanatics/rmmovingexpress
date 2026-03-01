'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class WhyChooseUs extends Model {
 /**
 * Table Name
 */
  static get table() {
    return 'why_chooseuses'
  }
}

module.exports = WhyChooseUs
