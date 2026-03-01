'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdonisTestOneSchema extends Schema {
  up () {
    this.create('adonis_test_ones', (table) => {
      table.increments()
      table.string('photo', 254)
      table.timestamps()
    })
  }

  down () {
    this.drop('adonis_test_ones')
  }
}

module.exports = AdonisTestOneSchema
