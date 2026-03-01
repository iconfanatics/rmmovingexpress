'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')
Factory.blueprint('App/Models/Client', async (faker) => {
  return {
    client_type: 'Client',
    first_name: faker.first(),
    last_name: faker.last(),
    email: faker.email(),
    password: await Hash.make('123456'),
  }
})
