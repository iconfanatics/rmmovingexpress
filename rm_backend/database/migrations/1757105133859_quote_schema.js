'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuoteSchema extends Schema {
  up () {
    this.create('quotes', (table) => {
      table.increments()
      table.string('firstName', 254)
      table.string('lastName', 254)
      table.string('involved', 254)
      table.string('numberOfHelper', 254)
      table.string('interested', 254)
      table.string('phone', 254)
      table.string('email', 254)
      table.text('message')
      table.string('deliveryAddress', 254)
      table.string('collectionAddress', 254)
      table.string('sizeOfMove', 254)
      table.string('typeOfMove', 254)
      table.timestamps()
    })
  }

  down () {
    this.drop('quotes')
  }
}

module.exports = QuoteSchema
