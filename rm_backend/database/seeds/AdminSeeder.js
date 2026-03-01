'use strict'

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')
const Database = use('Database')

class AdminSeeder {
  async run () {
    await Database.table('admins').insert([
      {
        language: 'en',
        fname: 'John',
        lname: 'Doe',
        username: 'admin',
        email: 'mizan@gmail.com',
        password: await Hash.make('123456'), // Hash the password
        two_factor_auth: 0,
        profile_pic_url: null,
        p_code: '12345678',
        p_code_time: new Date(),
        token: null,
        status: 1, // Active
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  }
}

module.exports = AdminSeeder