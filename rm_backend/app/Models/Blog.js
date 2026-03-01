'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Blog extends Model {
 /**
 * Table Name
 */
  static get table() {
    return 'blogs'
  }
}

module.exports = Blog
