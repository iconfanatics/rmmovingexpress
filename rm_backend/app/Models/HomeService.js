'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class HomeService extends Model {
     /**
     * Table Name
     */
    static get table() {
        return 'home_services'
    }
   /**
   * ServiceName
   */
    serviceName() {
      return this.belongsTo('App/Models/ServiceName', 'service_name_id', 'id')
    }
}

module.exports = HomeService
