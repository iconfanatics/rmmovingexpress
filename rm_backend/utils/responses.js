/**
 * Custom Responses for Earth Square
 * Default status are intact like 200,404,401,403,500
 */
/**
 * ANY SUCCESSFUL RESPONSE
 * @param {Object} {status: Number, message: String, data: Object}
 * */
const ResponseSuccess = (payload = null) => {
  if (payload && payload.data) {
    return {
      status: payload.status,
      message: payload.message || 'Request Processing successful',
      data: payload.data,
    }
  } else {
    return {
      status: payload.status,
      message: payload.message || 'Request Processing successful',
    }
  }
}
/**
 * ANY ERROR RESPONSE
 * @param {Object} {status: Number, message: String, data: Object}
 * status: 201 // custom
 * */
const ResponseError = (payload = null) => {
  if (payload && payload.data) {
    return {
      status: payload.status,
      message: payload.message || 'Request Processing Failed',
      data: payload.data,
    }
  } else {
    return {
      status: payload.status,
      message: payload.message || 'Request Processing failed',
    }
  }
}
/**
 * ANY VALIDATION FAILED RESPONSE
 * @param {Object} {status: Number, message: Ayyar}
 * */
const ResponseValidationFailed = (payload = null) => {
  return {
    status: payload.status,
    messages: payload.message,
  }
}
/** Exporting the Modules */

module.exports = {
  ResponseSuccess,
  ResponseError,
  ResponseValidationFailed,
}
