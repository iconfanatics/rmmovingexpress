'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HouseMovingExpertsSchema extends Schema {
  up () {
    this.create('house_moving_experts', (table) => {
      table.increments()
      table.string('sort_title', 255)
      table.text('title')
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
    this.drop('house_moving_experts')
  }
}

module.exports = HouseMovingExpertsSchema
