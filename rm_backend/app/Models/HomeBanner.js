'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class HomeBanner extends Model {
    /**
     * Table Name
     */
    static get table() {
        return 'home_banners'
    }
}

module.exports = HomeBanner
