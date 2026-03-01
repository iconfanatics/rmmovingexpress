/** Models Section */
const Client = use('App/Models/Client')
const Country = use('App/Models/Country')
const Companysetting = use('App/Models/Companysetting')
const FeatureSalePositionCost = use('App/Models/FeatureSalePositionCost')
const AdminPromocode = use('App/Models/AdminPromocode')


/**
 * Function to get the land value ground based on all country
 * @param {String} countyCode
 * @param {String} ground_type
 * @returns {Array}
 */

const getLandValue = async (countyCode, ground_type) =>{
    try {
        let country_id;
        let landValue;

        if(countyCode){
            const findLandValue = await Country.query()
            .where('iso_code', countyCode.toUpperCase())
            .select(
              'id',
              'billboard_value_ground_one',
              'billboard_value_ground_two',
              'billboard_promotion_discount'
            )
            .first()
    
            country_id = findLandValue.id

            const groundVlaueOne = parseFloat(findLandValue.billboard_value_ground_one).toFixed(4);
            const groundVlaueTwo = parseFloat(findLandValue.billboard_value_ground_two).toFixed(4);
           
            // check promotion discount
            if (findLandValue.billboard_promotion_discount <= 0) {
                if (ground_type == '1') {
                    landValue = groundVlaueOne
                  } else if (ground_type == '2') {
                    landValue = groundVlaueTwo
                }
            }
             // check without promotion discount
            else {
                if (ground_type == '1') {
                   landValue = calculateWithValueParcentage(groundVlaueOne, findLandValue.billboard_promotion_discount);
                } else if (ground_type == '2') {
                   landValue = calculateWithValueParcentage(groundVlaueTwo, findLandValue.billboard_promotion_discount);
                }
            }
        }
        // international country code when i can not find country code
        else {
            const findLandValue = await Country.query()
            .where('iso_code', 'international')
            .select(
              'id',
              'billboard_value_ground_one',
              'billboard_value_ground_two',
              'billboard_promotion_discount'
            )
            .first()
            country_id = findLandValue.id
            const groundVlaueTwo = parseFloat(findLandValue.billboard_value_ground_two).toFixed(4);

            // check promotion discount
            if (findLandValue.billboard_promotion_discount <= 0) {
                landValue = groundVlaueTwo
            } 
             // check without promotion discount
            else {
                landValue = calculateWithValueParcentage(groundVlaueTwo, findLandValue.billboard_promotion_discount);
            }
        }
        const landPrice = parseFloat(landValue).toFixed(4);
        return {
            country_id,
            landPrice,
        }
    }catch(error){
        console.log(error);
        return []
    }
}

/**
 * Function to get the sale type based on acquisition
 * @param {String} total_payment
 * @param {String} purchasePrice
 * @returns {Array}
 */

const acquisitionProctectedSalePrice = async (purchasePrice) => {
  try {
    const intialLandValue = await Companysetting.query()
    .select(
      'id',
      'porperty_value',
      'acquisition_fee',
      'acquisition_duration_time'
      )
    .first()
    

    const getAcquisitionFee = parseFloat(intialLandValue.acquisition_fee).toFixed(4);
    const findAcquisitionFee = calculateParcentage(purchasePrice, getAcquisitionFee)
    const priceFixed = Number(purchasePrice)  + Number(findAcquisitionFee) 
    const priceWithAcquisition =  parseFloat(priceFixed).toFixed(4);
    const acquisitionFee = parseFloat(findAcquisitionFee).toFixed(4);
    const acquisitionDurationTime = intialLandValue.acquisition_duration_time;
    return {
      priceWithAcquisition,
      acquisitionFee,
      acquisitionDurationTime
    };

  } catch(error){
    console.log(error);
    return [];
    
  }
}

/**
 * Function to get the sale type based on featured sale
 * @param {String} purchasePrice
 * @returns {Array}
 */

const featuredSalePrice = async (purchasePrice, top_position, show_days) => {
  try {
    const findFeaturedSale = await FeatureSalePositionCost.query()
    .where('position', top_position)
    .andWhere('day', show_days)
    .select('id', 'position', 'day', 'cost')
    .first()

    const featuredSaleFeeFixed = findFeaturedSale.cost
    const featuredSaleFee =  parseFloat(featuredSaleFeeFixed).toFixed(4);
    const featuredSaleCostFixed =  Number(purchasePrice)  + Number(findFeaturedSale.cost) 
    const featuredSaleCost = parseFloat(featuredSaleCostFixed).toFixed(4);

    return {
      featuredSaleCost, 
      featuredSaleFee
    }


  }catch(error){
    console.log(error);
    return [];
  }
}

/**
 * Function to get the Promocode on all Company Promocode Provide
 * @param {String} ground_value
 * @param {String} discount
 */
const companyPromoCode = async (admin_promocode, purchasePrice, price) => {
  try{
    const promocode = await AdminPromocode.query()
    .where('promocode', admin_promocode)
    .select('id', 'promocode', 'percent')
    .first()


    const promoParcentageValue = calculateParcentage(purchasePrice, promocode.percent)

    const promocodeID = promocode.id
    const allPriceWithPromoCodeFixed = price - promoParcentageValue;
    const allPriceWithPromoCode =  parseFloat(allPriceWithPromoCodeFixed).toFixed(4);
    const purchasePriceWithPromoCodeFixed = purchasePrice - promoParcentageValue;
    const purchasePriceWithPromoCode = parseFloat(purchasePriceWithPromoCodeFixed).toFixed(4);
   
    return {
      promocodeID,
      allPriceWithPromoCode,
      purchasePriceWithPromoCode
    }
    
  
  }catch(error){
    console.log(error);
    return []
  }
  

}


/**
 * Function to get the Percentage on all land value
 * @param {String} ground_value
 * @param {String} discount
 */

const calculateWithValueParcentage = (ground_value, discount) => {
   const groundDiscount =  (discount / 100) * ground_value
   const price = ground_value - groundDiscount
   return price;
}
const calculateParcentage = (price, discount) => {
   const parcentage =  (discount / 100) * price
   return parcentage;
}


  // Exporting Function
module.exports = {
    getLandValue,
    acquisitionProctectedSalePrice,
    featuredSalePrice,
    companyPromoCode,
  }
  