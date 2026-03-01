'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AboutUsSchema extends Schema {
  up () {
    this.create('aboutuses', (table) => {
      table.increments()
      table.string('sort_title', 254).nullable()
      table.string('title', 254).nullable()
      table.text('details')
      table.string('photo',255)
      table.integer('status', 1)
      .notNullable()
      .default(1)
      .comment('0 for Inactive, 1 for Active, 2 for Deleted')
      table.timestamps()
    })
  }

  down () {
    this.drop('aboutuses')
  }
}

module.exports = AboutUsSchema
