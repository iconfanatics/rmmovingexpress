'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceBannerSchema extends Schema {
  up () {
    this.create('service_banners', (table) => {
      table.increments()
       table.integer('service_name_id').unsigned().references('id').inTable('service_names').onDelete('CASCADE')
      table.string('title', 255)
      table.text('sub_title')
      table.timestamps()
    })
  }

  down () {
    this.drop('service_banners')
  }
}

module.exports = ServiceBannerSchema
