'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class HappyCustomer extends Model {
    /**
     * Table Name
     */
    static get table() {
        return 'happy_customers'
    }
}

module.exports = HappyCustomer
