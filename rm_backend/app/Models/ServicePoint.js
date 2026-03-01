'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ServicePoint extends Model {
 /**
 * Table Name
 */
  static get table() {
    return 'service_points'
  }

  /**
 * Home Service
 */
homeService() {
    return this.belongsTo('App/Models/HomeService', 'home_service_id', 'id')
}
}

module.exports = ServicePoint
