/** Models Section */
const Client = use('App/Models/Client')
/**
 * Function to get the worldwide player leaderboard based on total asset value
 * @param {String} filter_by_top_position
 * @param {String} view
 * @param {String} filter_by_country
 * @param {String} sort_by
 * @returns {Array}
 */
const playerTotalAssetValue = async (
  filter_by_top_position,
  view,
  filter_by_country,
  sort_by
) => {
  const filteredCountries = filter_by_country
  // Getting the CLIENTS
  var clients = await getClientList(filteredCountries)
  if (!clients) return []
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
  // returning based on params
  const topHowMany = filter_by_top_position
    ? parseInt(filter_by_top_position.match(/\d+/))
    : 0
  // console.log(topHowMany)
  clients = clients.slice(0, topHowMany)
  clients.forEach((client) => {
    // Sorting the inner properties client list
    processDataForFinalPresentation(client) // SORTING INNER DATA
  })
  return clients
}
/**
 * Function to get the worldwide player leaderboard based on total credit spend i.e, total purchase value
 * @param {String} filter_by_top_position
 * @param {String} view
 * @param {String} filter_by_country
 * @param {String} sort_by
 * @returns {Array}
 */
const playerTotalCreditSpend = async (
  filter_by_top_position,
  view,
  filter_by_country,
  sort_by
) => {
  const filteredCountries = filter_by_country
  // Getting the CLIENTS based on total credit spend/total purchase value
  var clients = await getClientList(filteredCountries)
  if (!clients) return []
  // Sorting the the Clients based on their current market value (assets => property + robotics + resources)
  clients = clients.sort((a, b) => {
    const getValue = (client) => {
      let totalMarketValue = 0
      let totalPurchaseValue = 0
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
      client.clientrobotics.forEach((robotic) => {
        totalMarketValue += robotic.purchase_value
        totalPurchaseValue += robotic.purchase_value
      })
      client.clientresources.forEach((resource) => {
        totalMarketValue += resource.purchase_value
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
      return totalPurchaseValue
    }
    const valueA = getValue(a)
    const valueB = getValue(b)
    return valueB - valueA // Sort in descending order
  })
  // returning based on params
  const topHowMany = filter_by_top_position
    ? parseInt(filter_by_top_position.match(/\d+/))
    : 0
  // console.log(topHowMany)
  clients = clients.slice(0, topHowMany)
  clients.forEach((client) => {
    // Sorting the inner properties client list
    processDataForFinalPresentation(client) // SORTING INNER DATA
  })
  return clients
}
/**
 * Function to get the worldwide player leaderboard based on most ground purchase
 * @param {String} filter_by_top_position
 * @param {String} view
 * @param {String} filter_by_country
 * @param {String} sort_by
 * @returns {Array}
 */
const playerMostGroundPurchase = async (
  filter_by_top_position,
  view,
  filter_by_country,
  sort_by
) => {
  const filteredCountries = filter_by_country
  // Getting the CLIENTS based on most ground purchase
  var clients = await getClientList(filteredCountries)
  if (!clients) return []
  // Sorting the the Clients based on their current market value (assets => property + robotics + resources)
  clients = clients.sort((a, b) => {
    const getValue = (client) => {
      let totalMarketValue = 0
      let totalPurchaseValue = 0
      let totalMostGroundPurchaseValue = 0
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
        totalMostGroundPurchaseValue += property.ground_quantity
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
      client.totalMostGroundPurchaseValue = totalMostGroundPurchaseValue
      return totalMostGroundPurchaseValue
    }
    const valueA = getValue(a)
    const valueB = getValue(b)
    return valueB - valueA // Sort in descending order
  })
  // returning based on params
  const topHowMany = filter_by_top_position
    ? parseInt(filter_by_top_position.match(/\d+/))
    : 0
  // console.log(topHowMany)
  clients = clients.slice(0, topHowMany)
  clients.forEach((client) => {
    // Sorting the inner properties client list
    processDataForFinalPresentation(client) // SORTING INNER DATA
  })
  return clients
}
/**
 * Function to get the worldwide player leaderboard based on expensive ground purchase
 * @param {String} filter_by_top_position
 * @param {String} view
 * @param {String} filter_by_country
 * @param {String} sort_by
 * @returns {Array}
 */
const playerExpensiveGroundPurchase = async (
  filter_by_top_position,
  view,
  filter_by_country,
  sort_by
) => {
  const filteredCountries = filter_by_country
  // Getting the CLIENTS based on most ground purchase
  var clients = await getClientList(filteredCountries)
  if (!clients) return []
  // Sorting the the Clients based on their current market value (assets => property + robotics + resources)
  clients = clients.sort((a, b) => {
    const calculateMaxGroundValue = (client) => {
      let maxGroundValue = 0
      let totalMarketValue = 0
      let totalPurchaseValue = 0
      // Properties total market_value
      client.clientproperties.forEach((property) => {
        const singleGroundValue =
          property.purchase_value / property.ground_quantity
        if (singleGroundValue > maxGroundValue) {
          maxGroundValue = singleGroundValue
        }
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
      client.maxGroundValue = maxGroundValue
      return maxGroundValue
    }
    const maxGroundValueA = calculateMaxGroundValue(a)
    const maxGroundValueB = calculateMaxGroundValue(b)
    // Sort in descending order
    return maxGroundValueB - maxGroundValueA
  })
  // returning based on params
  const topHowMany = filter_by_top_position
    ? parseInt(filter_by_top_position.match(/\d+/))
    : 0
  // console.log(topHowMany)
  clients = clients.slice(0, topHowMany)
  clients.forEach((client) => {
    // Sorting the inner properties client list
    processDataForFinalPresentation(client) // SORTING INNER DATA
  })
  return clients
}

/**
 * Function to get the worldwide player leaderboard based on most robotic purchase
 * @param {String} filter_by_top_position
 * @param {String} view
 * @param {String} filter_by_country
 * @param {String} sort_by
 * @returns {Array}
 */
const playerMostRoboticPurchase = async (
  filter_by_top_position,
  view,
  filter_by_country,
  sort_by
) => {
  const filteredCountries = filter_by_country
  // Getting the CLIENTS based on most ground purchase
  var clients = await getClientList(filteredCountries)
  if (!clients) return []
  // Sorting the the Clients based on their current market value (assets => property + robotics + resources)
  clients = clients.sort((a, b) => {
    const getValue = (client) => {
      let totalMostRoboticPurchaseValue = 0
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
        totalMostRoboticPurchaseValue += 1
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
      client.totalMostRoboticPurchaseValue = totalMostRoboticPurchaseValue
      return totalMostRoboticPurchaseValue
    }
    const valueA = getValue(a)
    const valueB = getValue(b)
    return valueB - valueA // Sort in descending order
  })
  // returning based on params
  const topHowMany = filter_by_top_position
    ? parseInt(filter_by_top_position.match(/\d+/))
    : 0
  // console.log(topHowMany)
  clients = clients.slice(0, topHowMany)
  clients.forEach((client) => {
    // Sorting the inner properties client list
    processDataForFinalPresentation(client) // SORTING INNER DATA
  })
  return clients
}
/**
 * Function to get the worldwide player leaderboard based on most expensive robotic purchase
 * @param {String} filter_by_top_position
 * @param {String} view
 * @param {String} filter_by_country
 * @param {String} sort_by
 * @returns {Array}
 */
const playerExpensiveRoboticPurchase = async (
  filter_by_top_position,
  view,
  filter_by_country,
  sort_by
) => {
  const filteredCountries = filter_by_country
  // Getting the CLIENTS based on most ground purchase
  var clients = await getClientList(filteredCountries)
  if (!clients) return []
  // Sorting the the Clients based on their current market value (assets => property + robotics + resources)
  clients = clients.sort((a, b) => {
    const calculateMaxRoboticValue = (client) => {
      let maxRoboticValue = 0
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
        const singleRoboticValue = robotic.purchase_value
        if (singleRoboticValue > maxRoboticValue) {
          maxRoboticValue = singleRoboticValue
        }
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
      client.maxRoboticValue = maxRoboticValue
      return maxRoboticValue
    }
    const maxRoboticValueA = calculateMaxRoboticValue(a)
    const maxRoboticValueB = calculateMaxRoboticValue(b)
    // Sort in descending order
    return maxRoboticValueB - maxRoboticValueA
    // return maxRoboticValueA - maxRoboticValueB
  })
  // returning based on params
  const topHowMany = filter_by_top_position
    ? parseInt(filter_by_top_position.match(/\d+/))
    : 0
  // console.log(topHowMany)
  clients = clients.slice(0, topHowMany)
  clients.forEach((client) => {
    // Sorting the inner properties client list
    processDataForFinalPresentation(client) // SORTING INNER DATA
  })
  return clients
}

/**
 * Function to get the worldwide player leaderboard based on most resource purchase
 * @param {String} filter_by_top_position
 * @param {String} view
 * @param {String} filter_by_country
 * @param {String} sort_by
 * @returns {Array}
 */
const playerMostResourcePurchase = async (
  filter_by_top_position,
  view,
  filter_by_country,
  sort_by
) => {
  const filteredCountries = filter_by_country
  // Getting the CLIENTS based on most ground purchase
  var clients = await getClientList(filteredCountries)
  if (!clients) return []
  // Sorting the the Clients based on their current market value (assets => property + robotics + resources)
  clients = clients.sort((a, b) => {
    const getValue = (client) => {
      let totalMostResourcePurchaseValue = 0
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
        totalMostResourcePurchaseValue += 1
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
      client.totalMostResourcePurchaseValue = totalMostResourcePurchaseValue
      return totalMostResourcePurchaseValue
    }
    const valueA = getValue(a)
    const valueB = getValue(b)
    return valueB - valueA // Sort in descending order
  })
  // returning based on params
  const topHowMany = filter_by_top_position
    ? parseInt(filter_by_top_position.match(/\d+/))
    : 0
  // console.log(topHowMany)
  clients = clients.slice(0, topHowMany)
  clients.forEach((client) => {
    // Sorting the inner properties client list
    processDataForFinalPresentation(client) // SORTING INNER DATA
  })
  return clients
}
/**
 * Function to get the worldwide player leaderboard based on most expensive resource purchase
 * @param {String} filter_by_top_position
 * @param {String} view
 * @param {String} filter_by_country
 * @param {String} sort_by
 * @returns {Array}
 */
const playerExpensiveResourcePurchase = async (
  filter_by_top_position,
  view,
  filter_by_country,
  sort_by
) => {
  const filteredCountries = filter_by_country
  // Getting the CLIENTS based on most ground purchase
  var clients = await getClientList(filteredCountries)
  if (!clients) return []
  // Sorting the the Clients based on their current market value (assets => property + robotics + resources)
  clients = clients.sort((a, b) => {
    const calculateMaxResourceValue = (client) => {
      let maxResourceValue = 0
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
        const singleResourceValue = resource.purchase_value
        if (singleResourceValue > maxResourceValue) {
          maxResourceValue = singleResourceValue
        }
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
      client.maxResourceValue = maxResourceValue
      return maxResourceValue
    }
    const maxResourceValueA = calculateMaxResourceValue(a)
    const maxResourceValueB = calculateMaxResourceValue(b)
    // Sort in descending order
    return maxResourceValueB - maxResourceValueA
  })
  // returning based on params
  const topHowMany = filter_by_top_position
    ? parseInt(filter_by_top_position.match(/\d+/))
    : 0
  // console.log(topHowMany)
  clients = clients.slice(0, topHowMany)
  clients.forEach((client) => {
    // Sorting the inner properties client list
    processDataForFinalPresentation(client) // SORTING INNER DATA
  })
  return clients
}
/**
 * Function to get the worldwide player leaderboard based on most billboards purchase
 * @param {String} filter_by_top_position
 * @param {String} view
 * @param {String} filter_by_country
 * @param {String} sort_by
 * @returns {Array}
 */
const playerMostBillboardPurchase = async (
  filter_by_top_position,
  view,
  filter_by_country,
  sort_by
) => {
  const filteredCountries = filter_by_country
  // Getting the CLIENTS based on most ground purchase
  var clients = await getClientList(filteredCountries)
  if (!clients) return []
  // Sorting the the Clients based on their current market value (assets => property + robotics + resources)
  clients = clients.sort((a, b) => {
    const getValue = (client) => {
      let totalMostBillboardsPurchaseValue = 0
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
        totalMostBillboardsPurchaseValue += 1
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
      client.totalMostBillboardsPurchaseValue = totalMostBillboardsPurchaseValue
      return totalMostBillboardsPurchaseValue
    }
    const valueA = getValue(a)
    const valueB = getValue(b)
    return valueB - valueA // Sort in descending order
  })
  // returning based on params
  const topHowMany = filter_by_top_position
    ? parseInt(filter_by_top_position.match(/\d+/))
    : 0
  // console.log(topHowMany)
  clients = clients.slice(0, topHowMany)
  clients.forEach((client) => {
    // Sorting the inner properties client list
    processDataForFinalPresentation(client) // SORTING INNER DATA
  })
  return clients
}
/**
 * Function to get the worldwide player leaderboard based on most expensive Billboard purchase
 * @param {String} filter_by_top_position
 * @param {String} view
 * @param {String} filter_by_country
 * @param {String} sort_by
 * @returns {Array}
 */
const playerExpensiveBillboardPurchase = async (
  filter_by_top_position,
  view,
  filter_by_country,
  sort_by
) => {
  const filteredCountries = filter_by_country
  // Getting the CLIENTS based on most ground purchase
  var clients = await getClientList(filteredCountries)
  if (!clients) return []
  // Sorting the the Clients based on their current market value (assets => property + robotics + resources)
  clients = clients.sort((a, b) => {
    const calculateMaxBillboardValue = (client) => {
      let maxBillboardValue = 0
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
        const singleBillboardValue = billboard.purchase_value / 1
        if (singleBillboardValue > maxBillboardValue) {
          maxBillboardValue = singleBillboardValue
        }
        if (billboard.ground_type === 1) {
          totalMarketValue +=
            billboard.ground_quantity *
            billboard.countries.billboard_value_ground_one
        } else {
          totalMarketValue +=
            billboard.ground_quantity *
            billboard.countries.billboard_value_ground_two
        }
        totalPurchaseValue += billboard.purchase_value
      })
      // Store the total sum value for each country in the 'totalMarketValue' property
      client.totalMarketValue = totalMarketValue
      client.totalPurchaseValue = totalPurchaseValue
      client.maxBillboardValue = maxBillboardValue
      return maxBillboardValue
    }
    const maxBillboardValueA = calculateMaxBillboardValue(a)
    const maxBillboardValueB = calculateMaxBillboardValue(b)
    // Sort in descending order
    return maxBillboardValueB - maxBillboardValueA
  })
  // returning based on params
  const topHowMany = filter_by_top_position
    ? parseInt(filter_by_top_position.match(/\d+/))
    : 0
  // console.log(topHowMany)
  clients = clients.slice(0, topHowMany)
  clients.forEach((client) => {
    // Sorting the inner properties client list
    processDataForFinalPresentation(client) // SORTING INNER DATA
  })
  return clients
}

/**
 * Helper Function
 * @param {Object} DATA
//  * @param {String} sortType
 */
function processDataForFinalPresentation(DATA) {
  // Step 1: Calculate total purchase value for each country from client properties
  const countryPropertyPurchaseValues = {}
  DATA.clientproperties.forEach((propertyData) => {
    const countryId = propertyData.countries.iso_code
    if (!countryPropertyPurchaseValues[countryId]) {
      countryPropertyPurchaseValues[countryId] = {
        value: 0,
        title: countryId,
      }
    }
    countryPropertyPurchaseValues[countryId].value +=
      propertyData.purchase_value
  })
  // Step 2: Sort the countries based on total purchase value
  const sortedCountries = Object.values(countryPropertyPurchaseValues).sort(
    (a, b) => b.value - a.value
  )
  // Step 3: Attach the sorted countries list as the COUNTRY property
  DATA.PROPERTIES = sortedCountries
  // Step 4: Calculate the most bought robotics and sort them
  const roboticsCount = {}
  DATA.clientrobotics.forEach((roboticsData) => {
    const roboticsId = roboticsData.robotic_id
    if (!roboticsCount[roboticsId]) {
      roboticsCount[roboticsId] = {
        // id: roboticsId,
        value: 0,
        title: roboticsData.robotics.title,
        image: roboticsData.robotics.robotics_image,
      }
    }
    roboticsCount[roboticsId].value += roboticsData.purchase_value
  })
  const sortedRobotics = Object.values(roboticsCount).sort(
    (a, b) => b.value - a.value
  )
  DATA.ROBOTICS = sortedRobotics
  // Step 4: Calculate the most bought resource and sort them
  const resourceCount = {}
  DATA.clientresources.forEach((resourceData) => {
    const resourceId = resourceData.resource_id
    if (!resourceCount[resourceId]) {
      resourceCount[resourceId] = {
        // id: resourceId,
        value: 0,
        title: resourceData.resources.name,
        image: resourceData.resources.resource_image,
      }
    }
    resourceCount[resourceId].value += resourceData.purchase_value
  })
  const sortedResource = Object.values(resourceCount).sort(
    (a, b) => b.value - a.value
  )
  DATA.RESOURCES = sortedResource
  // Billboards
  const countryBillboardPurchaseValues = {}
  DATA.clientbillboards.forEach((billboardData) => {
    const countryId = billboardData.countries.iso_code
    if (!countryBillboardPurchaseValues[countryId]) {
      countryBillboardPurchaseValues[countryId] = {
        value: 0,
        title: countryId,
      }
    }
    countryBillboardPurchaseValues[countryId].value +=
      billboardData.purchase_value
  })
  // Step 2: Sort the countries based on total purchase value
  const sortedBillboardCountries = Object.values(
    countryBillboardPurchaseValues
  ).sort((a, b) => b.value - a.value)
  // Step 3: Attach the sorted countries list as the COUNTRY property
  DATA.BILLBOARDS = sortedBillboardCountries
  delete DATA.clientproperties // deleting extra data
  delete DATA.clientrobotics // deleting extra data
  delete DATA.clientresources // deleting extra data
  delete DATA.clientbillboards // deleting extra data
  return DATA
}
/**
 * Getting the CLIENTS from database based on filtering
 */
const getClientList = async (filteredCountries) => {
  try {
    const clients = await Client.query()
      // Countries
      .with('countries', (builder) => {
        builder.select('id', 'iso_code', 'name')
      })
      // Properties
      .with('clientproperties', (builder) => {
        builder
          .with('countries', (builder) => {
            builder.select(
              'id',
              'iso_code',
              'name',
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
            builder.select(
              'id',
              'title',
              'market_value',
              'purchase_value',
              'robotics_image'
            )
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
            builder.select(
              'id',
              'name',
              'market_value',
              'purchase_value',
              'resource_image'
            )
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
      .where('user_id', '<>', 999999999999) // Earth Square Own Account
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
      .fetch()
    return clients ? clients.toJSON() : []
  } catch (error) {
    console.log(error)
    return []
  }
}

// Exporting Function
module.exports = {
  playerTotalAssetValue,
  playerTotalCreditSpend,
  playerMostGroundPurchase,
  playerExpensiveGroundPurchase,
  playerMostRoboticPurchase,
  playerExpensiveRoboticPurchase,
  playerMostResourcePurchase,
  playerExpensiveResourcePurchase,
  playerMostBillboardPurchase,
  playerExpensiveBillboardPurchase,
}
