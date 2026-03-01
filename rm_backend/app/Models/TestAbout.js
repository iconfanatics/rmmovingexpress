'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TestAbout extends Model {
    /**
     * Table Name
     */
    static get table() {
        return 'test_abouts'
    }
}

module.exports = TestAbout
