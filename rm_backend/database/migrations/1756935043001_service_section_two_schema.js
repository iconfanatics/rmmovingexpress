'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceSectionTwoSchema extends Schema {
  up () {
    this.create('service_section_twos', (table) => {
      table.increments()
      table.integer('service_name_id').unsigned().references('id').inTable('service_names').onDelete('CASCADE')
      table.string('title', 255)
      table.text('sub_title')
      table.text('details')
      table.string('need_title', 255)
      table.text('need_details')
      table.timestamps()
    })
  }

  down () {
    this.drop('service_section_twos')
  }
}

module.exports = ServiceSectionTwoSchema
