'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FaqsSchema extends Schema {
  up () {
    this.create('faqs', (table) => {
      table.increments()
      table.integer('service_name_id').unsigned().references('id').inTable('service_names').onDelete('CASCADE')
      table.text('title', 255)
      table.text('sub_title')
      table.timestamps()
    })
  }

  down () {
    this.drop('faqs')
  }
}

module.exports = FaqsSchema
