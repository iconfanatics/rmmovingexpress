'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TestAboutSchema extends Schema {
  up () {
    this.create('test_abouts', (table) => {
      table.increments()
      table.string('photo',255)
      table.integer('status', 1)
      .notNullable()
      .default(1)
      .comment('0 for Inactive, 1 for Active, 2 for Deleted')
      table.timestamps()
    })
  }

  down () {
    this.drop('test_abouts')
  }
}

module.exports = TestAboutSchema
