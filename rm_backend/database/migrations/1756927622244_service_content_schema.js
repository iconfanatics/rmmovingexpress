'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceContentSchema extends Schema {
  up () {
    this.create('service_contents', (table) => {
      table.increments()
      table.integer('service_name_id').unsigned().references('id').inTable('service_names').onDelete('CASCADE')
      table.string('sort_title', 255)
      table.text('title')
      table.text('details')
      table.string('costs_title', 255)
      table.text('costs_details')
      table.string('photo',255)
      table.integer('status', 1)
      .notNullable()
      .default(1)
      .comment('0 for Inactive, 1 for Active, 2 for Deleted')
      table.timestamps()
    })
  }

  down () {
    this.drop('service_contents')
  }
}

module.exports = ServiceContentSchema
