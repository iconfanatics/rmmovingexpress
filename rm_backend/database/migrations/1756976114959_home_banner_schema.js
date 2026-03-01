'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HomeBannerSchema extends Schema {
  up () {
    this.create('home_banners', (table) => {
      table.increments()
      table.string('title', 255)
      table.text('details')
      table.text('link')
      table.string('video',255)
      table.integer('status', 1)
      .notNullable()
      .default(1)
      .comment('0 for Inactive, 1 for Active, 2 for Deleted')
      table.timestamps()
    })
  }

  down () {
    this.drop('home_banners')
  }
}

module.exports = HomeBannerSchema
