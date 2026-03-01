'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AdminToken extends Model {
    /**
   * Table Name
   */
  static get table() {
    return 'admin_tokens'
  }
}

module.exports = AdminToken
