/** Models Section */
const Client = use('App/Models/Client')
/**
 * Function to get the worldwide player leaderboard based on total asset value
 * @param {String} userId
 * @param {String} countryId
 */
const userPosition = async (userId = null, countryId = null) => {
  const filteredCountries = countryId && !isNaN(countryId) ? [countryId] : null
  // Getting the CLIENTS
  var clients = await getClientList(filteredCountries)
  if (!clients) return -1 // error position
  // Sorting the the Clients based on their current market value (assets => property + robotics + resources)
  clients = clients.sort((a, b) => {
    const getValue = (client) => {
      let totalMarketValue = 0
      let totalPurchaseValue = 0
      // Properties total market_value
      client.clientproperties.forEach((property) => {
        if (property.ground_type === 1) {
          totalMarketValue +=
            property.ground_quantity *
            property.countries.property_value_ground_one
        } else {
          totalMarketValue +=
            property.ground_quantity *
            property.countries.property_value_ground_two
        }
        totalPurchaseValue += property.purchase_value
      })
      // Robotics total market_value
      client.clientrobotics.forEach((robotic) => {
        totalMarketValue += robotic.robotics.market_value
        totalPurchaseValue += robotic.purchase_value
      })
      // Resources total market_value
      client.clientresources.forEach((resource) => {
        totalMarketValue += resource.resources.market_value
        totalPurchaseValue += resource.purchase_value
      })
      // Billboards total market_value
      client.clientbillboards.forEach((billboard) => {
        if (billboard.ground_type === 1) {
          totalMarketValue += 1 * billboard.countries.billboard_value_ground_one
        } else {
          totalMarketValue += 1 * billboard.countries.billboard_value_ground_two
        }
        totalPurchaseValue += billboard.purchase_value
      })
      // Store the total sum value for each country in the 'totalMarketValue' property
      client.totalMarketValue = totalMarketValue
      client.totalPurchaseValue = totalPurchaseValue
      return totalMarketValue
    }
    const valueA = getValue(a)
    const valueB = getValue(b)
    return valueB - valueA // Sort in descending order
  })
  // Finding the client position
  if (clients) {
    const findClientIndex = clients.map((client) => client.id).indexOf(userId)
    // checking client is found or not
    if (findClientIndex > -1) {
      return {
        _top: {
          first_name: clients[0].first_name,
          last_name: clients[0].last_name,
          user_id: clients[0].user_id,
        },
        _self: {
          first_name: clients[findClientIndex].first_name,
          last_name: clients[findClientIndex].last_name,
          user_id: clients[findClientIndex].user_id,
          position: findClientIndex + 1,
        },
      }
    } // end of position finds check
    return []
  }
  return []
}
/**
 * Getting the CLIENTS from database based on filtering
 */
const getClientList = async (filteredCountries = null) => {
  try {
    const clients = await Client.query()
      // Properties
      .with('clientproperties', (builder) => {
        builder
          .with('countries', (builder) => {
            builder.select(
              'id',
              'iso_code',
              'property_value_ground_one',
              'property_value_ground_two'
            )
          })
          .select(
            'id',
            'user_id',
            'country_id',
            'ground_type',
            'ground_quantity',
            'purchase_value'
          )
      })
      // Robotics
      .with('clientrobotics', (builder) => {
        builder
          .with('robotics', (builder) => {
            builder.select('id', 'title', 'market_value', 'purchase_value')
          })
          .select(
            'id',
            'client_id',
            'country_id',
            'robotic_id',
            'purchase_value'
          )
      })
      // Resources
      .with('clientresources', (builder) => {
        builder
          .with('resources', (builder) => {
            builder.select('id', 'name', 'market_value', 'purchase_value')
          })
          .select(
            'id',
            'client_id',
            'country_id',
            'resource_id',
            'purchase_value'
          )
      })
      // Billboards
      .with('clientbillboards', (builder) => {
        builder
          .with('countries', (builder) => {
            builder.select(
              'id',
              'iso_code',
              'billboard_value_ground_one',
              'billboard_value_ground_two'
            )
          })
          .select(
            'id',
            'client_id',
            'country_id',
            'ground_type',
            'class_type',
            'purchase_value'
          )
      })
      /** Worldwide or specific country */
      .where((query) => {
        if (filteredCountries && filteredCountries !== null) {
          query.whereIn('country_id', filteredCountries)
        } else {
          1 // world wide
        }
      })
      /* End of wordwide or specific country */
      .where('status', 1) // Only Active
      .select('id', 'user_id', 'country_id', 'first_name', 'last_name')
      .fetch()
    return clients ? clients.toJSON() : []
  } catch (error) {
    return []
  }
}

module.exports = { userPosition }
