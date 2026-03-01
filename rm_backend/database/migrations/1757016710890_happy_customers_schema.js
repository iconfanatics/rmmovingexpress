'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HappyCustomersSchema extends Schema {
  up () {
    this.create('happy_customers', (table) => {
      table.increments()
      table.string('f_name', 100).nullable()
      table.string('l_name', 100).nullable()
      table.string('star', 50).nullable()
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
    this.drop('happy_customers')
  }
}

module.exports = HappyCustomersSchema
