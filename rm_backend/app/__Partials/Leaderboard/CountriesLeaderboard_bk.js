/** Models Section */
const Country = use('App/Models/Country')
/**
 * view = COUNTRIES Sections
 */
/**
 * Function to get the countrywise leaderboard based on total asset value
 * @param {String} filter_by_top_position
 * @param {String} view
 * @param {String} sort_by
 * @returns {Array}
 */
const countriesTotalAssetValue = async (
  filter_by_top_position,
  view,
  sort_by
) => {
  // finding all the countries
  let countryList = await Country.query()
    .with('clients', (builder) => {
      builder
        // Countries
        .with('countries', (builder) => {
          builder.select('id', 'iso_code')
        })
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
            .with('countries', (builder) => {
              builder.select('id', 'iso_code')
            })
            .select('id', 'client_id', 'country_id', 'robotic_id')
        })
        // Resources
        .with('clientresources', (builder) => {
          builder
            .with('resources', (builder) => {
              builder.select('id', 'name', 'market_value', 'purchase_value')
            })
            .with('countries', (builder) => {
              builder.select('id', 'iso_code')
            })
            .select('id', 'client_id', 'country_id', 'resource_id')
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
        .where('status', 1) // Only Active
        .select(
          'id',
          'first_name',
          'last_name',
          'photo',
          'user_id',
          'created_at',
          'country_id'
        )
    })
    .where('status', 1) // Active countries
    // .where('id', 18)
    .select('id', 'name', 'iso_code')
    .fetch()
  // Sorting the the Clients based on their current market value (assets => property + robotics + resources)
  countryList = countryList ? countryList.toJSON() : []
  // Step 1: Calculate the sum value of 'market_value' for each 'clientproperties', 'clientrobotics', and 'clientresources' object
  countryList.forEach((country) => {
    let totalMarketValue = 0
    let totalPurchaseValue = 0
    // Calculate the sum value for 'clientproperties'
    country.clients.forEach((client) => {
      client.clientproperties.forEach((property) => {
        const propertyValue =
          property.ground_type === 1
            ? property.ground_quantity *
              property.countries.property_value_ground_one
            : property.ground_quantity *
              property.countries.property_value_ground_two
        const propertyPurchaseValue = property.purchase_value
        totalMarketValue += propertyValue
        totalPurchaseValue += propertyPurchaseValue
      })
    })
    // Calculate the sum value for 'clientrobotics'
    country.clients.forEach((client) => {
      client.clientrobotics.forEach((robotic) => {
        totalMarketValue += robotic.robotics.market_value
        totalPurchaseValue += robotic.robotics.purchase_value
      })
    })
    // Calculate the sum value for 'clientresources'
    country.clients.forEach((client) => {
      client.clientresources.forEach((resource) => {
        totalMarketValue += resource.resources.market_value
        totalPurchaseValue += resource.resources.purchase_value
      })
    })
    // Calculate the sum value for 'clientbillboards'
    country.clients.forEach((client) => {
      client.clientbillboards.forEach((billboard) => {
        const billboardValue =
          billboard.class_type === 1
            ? 1 * billboard.countries.billboard_value_billboard_one
            : 1 * billboard.countries.billboard_value_billboard_two
        const billboardPurchaseValue = billboard.purchase_value
        totalMarketValue += billboardValue
        totalPurchaseValue += billboardPurchaseValue
      })
    })

    // Store the total sum value for each country in the 'totalMarketValue' property
    country.totalMarketValue = totalMarketValue
    country.totalPurchaseValue = totalPurchaseValue
  })

  // Step 2: Sort the array of objects based on the total sum of 'market_value'
  countryList.sort((a, b) => {
    const totalMarketValueA = a.totalMarketValue
    const totalMarketValueB = b.totalMarketValue
    return totalMarketValueB - totalMarketValueA // Sort in descending order
  })
  // return countryList

  // returning based on params
  const topHowMany = filter_by_top_position
    ? parseInt(filter_by_top_position.match(/\d+/))
    : 0
  // console.log(topHowMany)
  countryList = countryList.slice(0, topHowMany)
  countryList.forEach((country) => {
    // Sorting the inner properties country list
    processDataForFinalPresentation(country) // SORTING INNER DATA
  })
  return countryList
}
/**
 * Function to get the countrywise leaderboard based on total credit spend
 * @param {String} filter_by_top_position
 * @param {String} view
 * @param {String} sort_by
 * @returns {Array}
 */
const countriesTotalCreditSpend = async (
  filter_by_top_position,
  view,
  sort_by
) => {
  // console.log(view)
  // finding all the countries
  let countryList = await Country.query()
    .with('clients', (builder) => {
      builder
        // Countries
        .with('countries', (builder) => {
          builder.select('id', 'iso_code')
        })
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
            .with('countries', (builder) => {
              builder.select('id', 'iso_code')
            })
            .select('id', 'client_id', 'country_id', 'robotic_id')
        })
        // Resources
        .with('clientresources', (builder) => {
          builder
            .with('resources', (builder) => {
              builder.select('id', 'name', 'market_value', 'purchase_value')
            })
            .with('countries', (builder) => {
              builder.select('id', 'iso_code')
            })
            .select('id', 'client_id', 'country_id', 'resource_id')
        })
        .where('status', 1) // Only Active
        .select(
          'id',
          'first_name',
          'last_name',
          'photo',
          'user_id',
          'created_at',
          'country_id'
        )
    })
    .where('status', 1) // Active countries
    // .where('id', 18)
    .select('id', 'name', 'iso_code')
    .fetch()
  // Sorting the the Clients based on their current market value (assets => property + robotics + resources)
  countryList = countryList ? countryList.toJSON() : []
  // Step 1: Calculate the sum value of 'market_value' for each 'clientproperties', 'clientrobotics', and 'clientresources' object
  countryList.forEach((country) => {
    let totalMarketValue = 0
    let totalPurchaseValue = 0
    // Calculate the sum value for 'clientproperties'
    country.clients.forEach((client) => {
      client.clientproperties.forEach((property) => {
        const propertyValue =
          property.ground_type === 1
            ? property.ground_quantity *
              property.countries.property_value_ground_one
            : property.ground_quantity *
              property.countries.property_value_ground_two
        const propertyPurchaseValue = property.purchase_value
        totalMarketValue += propertyValue
        totalPurchaseValue += propertyPurchaseValue
      })
    })
    // Calculate the sum value for 'clientrobotics'
    country.clients.forEach((client) => {
      client.clientrobotics.forEach((robotic) => {
        totalMarketValue += robotic.robotics.market_value
        totalPurchaseValue += robotic.robotics.purchase_value
      })
    })
    // Calculate the sum value for 'clientresources'
    country.clients.forEach((client) => {
      client.clientresources.forEach((resource) => {
        totalMarketValue += resource.resources.market_value
        totalPurchaseValue += resource.resources.purchase_value
      })
    })

    // Store the total sum value for each country in the 'totalMarketValue' property
    country.totalMarketValue = totalMarketValue
    country.totalPurchaseValue = totalPurchaseValue
  })

  // Step 2: Sort the array of objects based on the total sum of 'purchase_value'
  countryList.sort((a, b) => {
    const totalPurchaseValueA = a.totalPurchaseValue
    const totalPurchaseValueB = b.totalPurchaseValue
    return totalPurchaseValueB - totalPurchaseValueA // Sort in descending order
  })
  // return countryList
  // returning based on params
  const topHowMany = filter_by_top_position
    ? parseInt(filter_by_top_position.match(/\d+/))
    : 0
  // console.log(topHowMany)
  countryList = countryList.slice(0, topHowMany)
  countryList.forEach((country) => {
    // Sorting the inner properties country list
    processDataForFinalPresentation(country) // SORTING INNER DATA
  })
  return countryList
}
/**
 * Function to get the countrywise leaderboard based on total credit spend
 * @param {String} filter_by_top_position
 * @param {String} view
 * @param {String} sort_by
 * @returns {Array}
 */
const countriesMostGroundPurchase = async (
  filter_by_top_position,
  view,
  sort_by
) => {
  // console.log(view)
  // finding all the countries
  let countryList = await Country.query()
    .with('clients', (builder) => {
      builder
        // Countries
        .with('countries', (builder) => {
          builder.select('id', 'iso_code')
        })
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
            .with('countries', (builder) => {
              builder.select('id', 'iso_code')
            })
            .select('id', 'client_id', 'country_id', 'robotic_id')
        })
        // Resources
        .with('clientresources', (builder) => {
          builder
            .with('resources', (builder) => {
              builder.select('id', 'name', 'market_value', 'purchase_value')
            })
            .with('countries', (builder) => {
              builder.select('id', 'iso_code')
            })
            .select('id', 'client_id', 'country_id', 'resource_id')
        })
        .where('status', 1) // Only Active
        .select(
          'id',
          'first_name',
          'last_name',
          'photo',
          'user_id',
          'created_at',
          'country_id'
        )
    })
    .where('status', 1) // Active countries
    // .where('id', 18)
    .select('id', 'name', 'iso_code')
    .fetch()
  // Sorting the the Clients based on their current market value (assets => property + robotics + resources)
  countryList = countryList ? countryList.toJSON() : []
  // Step 1: Calculate the sum value of 'market_value' for each 'clientproperties', 'clientrobotics', and 'clientresources' object
  countryList.forEach((country) => {
    let totalMarketValue = 0 // total market value
    let totalPurchaseValue = 0 // total purchase value
    let totalGroundPurchase = 0 // total Ground Purchase
    // Calculate the sum value for 'clientproperties'
    country.clients.forEach((client) => {
      client.clientproperties.forEach((property) => {
        const groundCount = property.ground_quantity // purchase ground
        // Finding property Value
        const propertyValue =
          property.ground_type === 1
            ? property.ground_quantity *
              property.countries.property_value_ground_one
            : property.ground_quantity *
              property.countries.property_value_ground_two
        const propertyPurchaseValue = property.purchase_value
        // Summation for each client
        totalMarketValue += propertyValue
        totalPurchaseValue += propertyPurchaseValue
        totalGroundPurchase += groundCount
      })
    })
    // Store the total sum value for each country in the 'totalMarketValue' property
    // summation for all client (each country)
    country.totalMarketValue = totalMarketValue
    country.totalPurchaseValue = totalPurchaseValue
    country.totalGroundPurchase = totalGroundPurchase
  })

  // Step 2: Sort the array of objects based on the total sum of 'purchase_value'
  countryList.sort((a, b) => {
    const totalGroundPurchaseA = a.totalGroundPurchase
    const totalGroundPurchaseB = b.totalGroundPurchase
    return totalGroundPurchaseB - totalGroundPurchaseA // Sort in descending order
  })
  // return countryList
  // returning based on params
  const topHowMany = filter_by_top_position
    ? parseInt(filter_by_top_position.match(/\d+/))
    : 0
  // console.log(topHowMany)
  countryList = countryList.slice(0, topHowMany)
  countryList.forEach((country) => {
    // Sorting the inner properties country list
    processDataForFinalPresentation(country) // SORTING INNER DATA
  })
  return countryList
}
/**
 * Function to get the countrywise leaderboard based on ExpensiveGroundPurchase
 * @param {String} filter_by_top_position
 * @param {String} view
 * @param {String} sort_by
 * @returns {Array}
 */
const countriesExpensiveGroundPurchase = async (
  filter_by_top_position,
  view,
  sort_by
) => {
  // console.log(view)
  // finding all the countries
  let countryList = await Country.query()
    .with('clients', (builder) => {
      builder
        // Countries
        .with('countries', (builder) => {
          builder.select('id', 'iso_code')
        })
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
            .with('countries', (builder) => {
              builder.select('id', 'iso_code')
            })
            .select('id', 'client_id', 'country_id', 'robotic_id')
        })
        // Resources
        .with('clientresources', (builder) => {
          builder
            .with('resources', (builder) => {
              builder.select('id', 'name', 'market_value', 'purchase_value')
            })
            .with('countries', (builder) => {
              builder.select('id', 'iso_code')
            })
            .select('id', 'client_id', 'country_id', 'resource_id')
        })
        .where('status', 1) // Only Active
        .select(
          'id',
          'first_name',
          'last_name',
          'photo',
          'user_id',
          'created_at',
          'country_id'
        )
    })
    .where('status', 1) // Active countries
    // .where('id', 18)
    .select('id', 'name', 'iso_code')
    .fetch()
  // Sorting the the Clients based on their current market value (assets => property + robotics + resources)
  countryList = countryList ? countryList.toJSON() : []
  // Step 1: Calculate the sum value of 'market_value' for each 'clientproperties', 'clientrobotics', and 'clientresources' object
  countryList.forEach((country) => {
    let totalMarketValue = 0 // total market value
    let totalPurchaseValue = 0 // total purchase value
    let maxGroundValue = 0 // maximum valued ground
    // Calculate the sum value for 'clientproperties'
    country.clients.forEach((client) => {
      client.clientproperties.forEach((property) => {
        /** Maximum Purchase Ground */
        const singleGroundValue =
          property.purchase_value / property.ground_quantity
        if (singleGroundValue > maxGroundValue) {
          maxGroundValue = singleGroundValue
        }
        // Finding property Value
        const propertyValue =
          property.ground_type === 1
            ? property.ground_quantity *
              property.countries.property_value_ground_one
            : property.ground_quantity *
              property.countries.property_value_ground_two
        const propertyPurchaseValue = property.purchase_value
        // Summation for each client
        totalMarketValue += propertyValue
        totalPurchaseValue += propertyPurchaseValue
      })
    })
    // Store the total sum value for each country in the 'totalMarketValue' property
    // summation for all client (each country)
    country.totalMarketValue = totalMarketValue
    country.totalPurchaseValue = totalPurchaseValue
    country.mostExpensiveGround = maxGroundValue
  })

  // Step 2: Sort the array of objects based on the total sum of 'purchase_value'
  countryList.sort((a, b) => {
    const mostExpensiveGroundA = a.mostExpensiveGround
    const mostExpensiveGroundB = b.mostExpensiveGround
    return mostExpensiveGroundB - mostExpensiveGroundA // Sort in descending order
  })
  // return countryList
  // returning based on params
  const topHowMany = filter_by_top_position
    ? parseInt(filter_by_top_position.match(/\d+/))
    : 0
  // console.log(topHowMany)
  countryList = countryList.slice(0, topHowMany)
  countryList.forEach((country) => {
    // Sorting the inner properties country list
    processDataForFinalPresentation(country) // SORTING INNER DATA
  })
  return countryList
}
/**
 * Function to get the countrywise leaderboard based on most robotic purchase
 * @param {String} filter_by_top_position
 * @param {String} view
 * @param {String} sort_by
 * @returns {Array}
 */
const countriesMostRoboticPurchase = async (
  filter_by_top_position,
  view,
  sort_by
) => {
  // console.log(view)
  // finding all the countries
  let countryList = await Country.query()
    .with('clients', (builder) => {
      builder
        // Countries
        .with('countries', (builder) => {
          builder.select('id', 'iso_code')
        })
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
            .with('countries', (builder) => {
              builder.select('id', 'iso_code')
            })
            .select('id', 'client_id', 'country_id', 'robotic_id')
        })
        // Resources
        .with('clientresources', (builder) => {
          builder
            .with('resources', (builder) => {
              builder.select('id', 'name', 'market_value', 'purchase_value')
            })
            .with('countries', (builder) => {
              builder.select('id', 'iso_code')
            })
            .select('id', 'client_id', 'country_id', 'resource_id')
        })
        .where('status', 1) // Only Active
        .select(
          'id',
          'first_name',
          'last_name',
          'photo',
          'user_id',
          'created_at',
          'country_id'
        )
    })
    .where('status', 1) // Active countries
    // .where('id', 18)
    .select('id', 'name', 'iso_code')
    .fetch()
  // Sorting the the Clients based on their current market value (assets => property + robotics + resources)
  countryList = countryList ? countryList.toJSON() : []
  // Step 1: Calculate the sum value of 'market_value' for each 'clientproperties', 'clientrobotics', and 'clientresources' object
  countryList.forEach((country) => {
    let totalMarketValue = 0 // total market value
    let totalPurchaseValue = 0 // total purchase value
    let totalRoboticPurchase = 0 // total Robotic Purchase
    // Calculate the sum value for 'clientrobotics'
    country.clients.forEach((client) => {
      client.clientrobotics.forEach((robotic) => {
        totalMarketValue += robotic.robotics.market_value
        totalPurchaseValue += robotic.robotics.purchase_value
        totalRoboticPurchase += 1
      })
    })
    // Store the total sum value for each country in the 'totalMarketValue' property
    // summation for all client (each country)
    country.totalMarketValue = totalMarketValue
    country.totalPurchaseValue = totalPurchaseValue
    country.totalRoboticPurchase = totalRoboticPurchase
  })

  // Step 2: Sort the array of objects based on the total sum of 'purchase_value'
  countryList.sort((a, b) => {
    const totalRoboticPurchaseA = a.totalRoboticPurchase
    const totalRoboticPurchaseB = b.totalRoboticPurchase
    return totalRoboticPurchaseB - totalRoboticPurchaseA // Sort in descending order
  })
  // return countryList
  // returning based on params
  const topHowMany = filter_by_top_position
    ? parseInt(filter_by_top_position.match(/\d+/))
    : 0
  // console.log(topHowMany)
  countryList = countryList.slice(0, topHowMany)
  countryList.forEach((country) => {
    // Sorting the inner properties country list
    processDataForFinalPresentation(country) // SORTING INNER DATA
  })
  return countryList
}
/**
 * Function to get the countrywise leaderboard based on ExpensiveRoboticPurchase
 * @param {String} filter_by_top_position
 * @param {String} view
 * @param {String} sort_by
 * @returns {Array}
 */
const countriesExpensiveRoboticPurchase = async (
  filter_by_top_position,
  view,
  sort_by
) => {
  // console.log(view)
  // finding all the countries
  let countryList = await Country.query()
    .with('clients', (builder) => {
      builder
        // Countries
        .with('countries', (builder) => {
          builder.select('id', 'iso_code')
        })
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
            .with('countries', (builder) => {
              builder.select('id', 'iso_code')
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
            .with('countries', (builder) => {
              builder.select('id', 'iso_code')
            })
            .select('id', 'client_id', 'country_id', 'resource_id')
        })
        .where('status', 1) // Only Active
        .select(
          'id',
          'first_name',
          'last_name',
          'photo',
          'user_id',
          'created_at',
          'country_id'
        )
    })
    .where('status', 1) // Active countries
    // .where('id', 82)
    .select('id', 'name', 'iso_code')
    .fetch()
  // Sorting the the Clients based on their current market value (assets => property + robotics + resources)
  countryList = countryList ? countryList.toJSON() : []
  // Step 1: Calculate the sum value of 'market_value' for each 'clientproperties', 'clientrobotics', and 'clientresources' object
  countryList.forEach((country) => {
    let totalMarketValue = 0 // total market value
    let totalPurchaseValue = 0 // total purchase value
    let maxRoboticValue = 0 // maximum valued Robotic
    // Calculate the sum value for 'clientproperties'
    country.clients.forEach((client) => {
      client.clientrobotics.forEach((robotic) => {
        /** Maximum Purchase Robotic */
        const singleRoboticValue = robotic.purchase_value
        if (singleRoboticValue > maxRoboticValue) {
          maxRoboticValue = singleRoboticValue
        }
        totalMarketValue += robotic.robotics.market_value
        totalPurchaseValue += robotic.purchase_value
      })
    })
    // Store the total sum value for each country in the 'totalMarketValue' property
    // summation for all client (each country)
    country.totalMarketValue = totalMarketValue
    country.totalPurchaseValue = totalPurchaseValue
    country.mostExpensiveRobotic = maxRoboticValue
  })

  // Step 2: Sort the array of objects based on the total sum of 'purchase_value'
  countryList.sort((a, b) => {
    const mostExpensiveRoboticA = a.mostExpensiveRobotic
    const mostExpensiveRoboticB = b.mostExpensiveRobotic
    return mostExpensiveRoboticB - mostExpensiveRoboticA // Sort in descending order
  })
  // return countryList
  // returning based on params
  const topHowMany = filter_by_top_position
    ? parseInt(filter_by_top_position.match(/\d+/))
    : 0
  // console.log(topHowMany)
  countryList = countryList.slice(0, topHowMany)
  countryList.forEach((country) => {
    // Sorting the inner properties country list
    processDataForFinalPresentation(country) // SORTING INNER DATA
  })
  return countryList
}
/**
 * Function to get the countrywise leaderboard based on most Resource purchase
 * @param {String} filter_by_top_position
 * @param {String} view
 * @param {String} sort_by
 * @returns {Array}
 */
const countriesMostResourcePurchase = async (
  filter_by_top_position,
  view,
  sort_by
) => {
  // console.log(view)
  // finding all the countries
  let countryList = await Country.query()
    .with('clients', (builder) => {
      builder
        // Countries
        .with('countries', (builder) => {
          builder.select('id', 'iso_code')
        })
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
            .with('countries', (builder) => {
              builder.select('id', 'iso_code')
            })
            .select('id', 'client_id', 'country_id', 'robotic_id')
        })
        // Resources
        .with('clientresources', (builder) => {
          builder
            .with('resources', (builder) => {
              builder.select('id', 'name', 'market_value', 'purchase_value')
            })
            .with('countries', (builder) => {
              builder.select('id', 'iso_code')
            })
            .select('id', 'client_id', 'country_id', 'resource_id')
        })
        .where('status', 1) // Only Active
        .select(
          'id',
          'first_name',
          'last_name',
          'photo',
          'user_id',
          'created_at',
          'country_id'
        )
    })
    .where('status', 1) // Active countries
    // .where('id', 18)
    .select('id', 'name', 'iso_code')
    .fetch()
  // Sorting the the Clients based on their current market value (assets => property + robotics + resources)
  countryList = countryList ? countryList.toJSON() : []
  // Step 1: Calculate the sum value of 'market_value' for each 'clientproperties', 'clientrobotics', and 'clientresources' object
  countryList.forEach((country) => {
    let totalMarketValue = 0 // total market value
    let totalPurchaseValue = 0 // total purchase value
    let totalResourcePurchase = 0 // total Resource Purchase
    // Calculate the sum value for 'clientrobotics'
    country.clients.forEach((client) => {
      client.clientresources.forEach((resource) => {
        totalMarketValue += resource.resources.market_value
        totalPurchaseValue += resource.resources.purchase_value
        totalResourcePurchase += 1
      })
    })
    // Store the total sum value for each country in the 'totalMarketValue' property
    // summation for all client (each country)
    country.totalMarketValue = totalMarketValue
    country.totalPurchaseValue = totalPurchaseValue
    country.totalResourcePurchase = totalResourcePurchase
  })

  // Step 2: Sort the array of objects based on the total sum of 'purchase_value'
  countryList.sort((a, b) => {
    const totalResourcePurchaseA = a.totalResourcePurchase
    const totalResourcePurchaseB = b.totalResourcePurchase
    return totalResourcePurchaseB - totalResourcePurchaseA // Sort in descending order
  })
  // return countryList
  // returning based on params
  const topHowMany = filter_by_top_position
    ? parseInt(filter_by_top_position.match(/\d+/))
    : 0
  // console.log(topHowMany)
  countryList = countryList.slice(0, topHowMany)
  countryList.forEach((country) => {
    // Sorting the inner properties country list
    processDataForFinalPresentation(country) // SORTING INNER DATA
  })
  return countryList
}
/**
 * Function to get the countrywise leaderboard based on ExpensiveResourcePurchase
 * @param {String} filter_by_top_position
 * @param {String} view
 * @param {String} sort_by
 * @returns {Array}
 */
const countriesExpensiveResourcePurchase = async (
  filter_by_top_position,
  view,
  sort_by
) => {
  // console.log(view)
  // finding all the countries
  let countryList = await Country.query()
    .with('clients', (builder) => {
      builder
        // Countries
        .with('countries', (builder) => {
          builder.select('id', 'iso_code')
        })
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
            .with('countries', (builder) => {
              builder.select('id', 'iso_code')
            })
            .select('id', 'client_id', 'country_id', 'robotic_id')
        })
        // Resources
        .with('clientresources', (builder) => {
          builder
            .with('resources', (builder) => {
              builder.select('id', 'name', 'market_value', 'purchase_value')
            })
            .with('countries', (builder) => {
              builder.select('id', 'iso_code')
            })
            .select(
              'id',
              'client_id',
              'country_id',
              'resource_id',
              'purchase_value'
            )
        })
        .where('status', 1) // Only Active
        .select(
          'id',
          'first_name',
          'last_name',
          'photo',
          'user_id',
          'created_at',
          'country_id'
        )
    })
    .where('status', 1) // Active countries
    // .where('id', 82)
    .select('id', 'name', 'iso_code')
    .fetch()
  // Sorting the the Clients based on their current market value (assets => property + robotics + resources)
  countryList = countryList ? countryList.toJSON() : []
  // Step 1: Calculate the sum value of 'market_value' for each 'clientproperties', 'clientrobotics', and 'clientresources' object
  countryList.forEach((country) => {
    let totalMarketValue = 0 // total market value
    let totalPurchaseValue = 0 // total purchase value
    let maxResourceValue = 0 // maximum valued Resource
    // Calculate the sum value for 'clientproperties'
    country.clients.forEach((client) => {
      client.clientresources.forEach((resource) => {
        /** Maximum Purchase Resource */
        const singleResourceValue = resource.purchase_value
        if (singleResourceValue > maxResourceValue) {
          maxResourceValue = singleResourceValue
        }
        totalMarketValue += resource.resources.market_value
        totalPurchaseValue += resource.purchase_value
      })
    })
    // Store the total sum value for each country in the 'totalMarketValue' property
    // summation for all client (each country)
    country.totalMarketValue = totalMarketValue
    country.totalPurchaseValue = totalPurchaseValue
    country.mostExpensiveResource = maxResourceValue
  })

  // Step 2: Sort the array of objects based on the total sum of 'purchase_value'
  countryList.sort((a, b) => {
    const mostExpensiveResourceA = a.mostExpensiveResource
    const mostExpensiveResourceB = b.mostExpensiveResource
    return mostExpensiveResourceB - mostExpensiveResourceA // Sort in descending order
  })
  // return countryList
  // returning based on params
  const topHowMany = filter_by_top_position
    ? parseInt(filter_by_top_position.match(/\d+/))
    : 0
  // console.log(topHowMany)
  countryList = countryList.slice(0, topHowMany)
  countryList.forEach((country) => {
    // Sorting the inner properties country list
    processDataForFinalPresentation(country) // SORTING INNER DATA
  })
  return countryList
}

/**
 * Helper Function
 * @param {Object} DATA
//  * @param {String} sortType
 */
function processDataForFinalPresentation(DATA) {
  // Step 1: Calculate total purchase value for each country from client properties
  const countryPurchaseValues = {}
  DATA.clients.forEach((client) => {
    client.clientproperties.forEach((propertyData) => {
      const countryId = propertyData.countries.iso_code
      const purchaseValue = propertyData.purchase_value
      if (!countryPurchaseValues[countryId]) {
        countryPurchaseValues[countryId] = {
          value: 0,
          title: countryId,
        }
      }
      countryPurchaseValues[countryId].value += propertyData.purchase_value
    })
  })
  // Step 2: Sort the countries based on total purchase value
  const sortedCountries = Object.values(countryPurchaseValues).sort(
    (a, b) => b.value - a.value
  )
  DATA.PROPERTIES = sortedCountries
  const roboticsCount = {}
  DATA.clients.forEach((client) => {
    client.clientrobotics.forEach((roboticsData) => {
      const roboticsId = roboticsData.robotic_id
      if (!roboticsCount[roboticsId]) {
        roboticsCount[roboticsId] = {
          id: roboticsId,
          value: 0,
          title: roboticsData.robotics.title,
        }
      }
      roboticsCount[roboticsId].value += roboticsData.robotics.purchase_value
    })
  })
  const sortedRobotics = Object.values(roboticsCount).sort(
    (a, b) => b.value - a.value
  )
  DATA.ROBOTICS = sortedRobotics
  const resourceCount = {}
  DATA.clients.forEach((client) => {
    client.clientresources.forEach((resourceData) => {
      const resourceId = resourceData.resource_id
      if (!resourceCount[resourceId]) {
        resourceCount[resourceId] = {
          id: resourceId,
          value: 0,
          title: resourceData.resources.name,
        }
      }
      resourceCount[resourceId].value += resourceData.resources.purchase_value
    })
  })
  const sortedResource = Object.values(resourceCount).sort(
    (a, b) => b.value - a.value
  )
  DATA.RESOURCES = sortedResource
  const countryBillboardPurchaseValues = {}
  DATA.clients.forEach((client) => {
    client.clientbillboards.forEach((billboardData) => {
      const countryId = billboardData.countries.iso_code
      const purchaseValue = billboardData.purchase_value
      if (!countryBillboardPurchaseValues[countryId]) {
        countryBillboardPurchaseValues[countryId] = {
          value: 0,
          title: countryId,
        }
      }
      countryBillboardPurchaseValues[countryId].value +=
        billboardData.purchase_value
    })
  })
  // Step 2: Sort the countries based on total purchase value
  const sortedBillboardCountries = Object.values(
    countryBillboardPurchaseValues
  ).sort((a, b) => b.value - a.value)
  DATA.BILLBOARDS = sortedBillboardCountries
  console.log(sortedBillboardCountries)
  delete DATA.clients // deleting extra data
  return DATA
}

// Exporting Function
module.exports = {
  countriesTotalAssetValue,
  countriesTotalCreditSpend,
  countriesMostGroundPurchase,
  countriesExpensiveGroundPurchase,
  countriesMostRoboticPurchase,
  countriesExpensiveRoboticPurchase,
  countriesMostResourcePurchase,
  countriesExpensiveResourcePurchase,
}
