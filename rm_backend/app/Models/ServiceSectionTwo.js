'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ServiceSectionTwo extends Model {
     /**
     * Table Name
     */
    static get table() {
        return 'service_section_twos'
    }

   /**
   * ServiceName
   */
    serviceName() {
      return this.belongsTo('App/Models/ServiceName', 'service_name_id', 'id')
    }
}

module.exports = ServiceSectionTwo
