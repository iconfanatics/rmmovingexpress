'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ServiceName extends Model {
/**
 * Table Name
 */
  static get table() {
    return 'service_names'
  }
   /**
   * Page Banner
   */
  banner() {
    return this.hasMany('App/Models/ServiceBanner', 'id', 'service_name_id')
  }
   /**
   * Page Content
   */
  content() {
    return this.hasMany('App/Models/ServiceContent', 'id', 'service_name_id')
  }
   /**
   * Section Two
   */
  sectionTwo() {
    return this.hasMany('App/Models/ServiceSectionTwo', 'id', 'service_name_id')
  }
   /**
   * Faq
   */
  faq() {
    return this.hasMany('App/Models/Faq', 'id', 'service_name_id')
  }
}

module.exports = ServiceName
