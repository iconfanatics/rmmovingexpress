'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddPositionToServiceContentsSchema extends Schema {
  up () {
    this.table('service_contents', (table) => {
      table.integer('position').unsigned().default(0)
    })
  }

  down () {
    this.table('service_contents', (table) => {
      table.dropColumn('position')
    })
  }
}

module.exports = AddPositionToServiceContentsSchema
