'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HomeServiceSchema extends Schema {
  up () {
    this.create('home_services', (table) => {
      table.increments()
      table.integer('service_name_id').unsigned().references('id').inTable('service_names').onDelete('CASCADE')
      table.string('icon', 255)
      table.text('details')
      table.string('link', 255)
      table.timestamps()
    })
  }

  down () {
    this.drop('home_services')
  }
}

module.exports = HomeServiceSchema
