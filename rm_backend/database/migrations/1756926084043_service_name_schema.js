'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceNameSchema extends Schema {
  up () {
    this.create('service_names', (table) => {
      table.increments()
      table.string('name', 255).nullable()
      table.string('pretty_name', 255).nullable()
      table.integer('status', 1)
      .notNullable()
      .default(1)
      .comment('0 for Inactive, 1 for Active, 2 for Deleted')
      table.timestamps()
    })
  }

  down () {
    this.drop('service_names')
  }
}

module.exports = ServiceNameSchema
