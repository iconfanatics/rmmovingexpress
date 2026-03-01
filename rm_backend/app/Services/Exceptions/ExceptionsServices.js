'use strict'
/**
 ** File Name: ExceptionsServices.js
 ** Services to help the task related to Exceptions
 ** Namespace: App/Services/Exceptions
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
/** Models Sections */
/** Modules Sections */
const Logger = use('Logger')
const moment = use('moment')
class ExceptionsServices {
  constructor() {}
  /**
   * Returning Resource Added Successful Response
   * @param resourceName
   * @param message
   */
  resourceAddSuccessful(resourceName, message, data = null) {
    // returning success response
    return {
      CODE: 'ES_RESOURCE_ADD_SUCCESS',
      STATUS: 101,
      TYPE: 'success',
      MESSAGE: `${resourceName} added successfully.`,
    }
  }
  /**
   * Returning Resource Added Failed Response
   * @param resourceName
   * @param message
   */
  resourceAddFailed(resourceName, message) {
    // returning error response
    return {
      CODE: 'ES_RESOURCE_ADD_FAILED',
      STATUS: 151,
      TYPE: 'error',
      MESSAGE: `${resourceName} added failed.${
        message !== null ? message : ''
      }`,
    }
  }
  /**
   * Returning Resource Updated Successful Response
   * @param currentLocale
   * @param resourceName
   */
  resourceUpdateSuccessful(resourceName, message, data = null) {
    // returning success response
    return {
      CODE: 'ES_RESOURCE_ADD_SUCCESS',
      STATUS: 101,
      TYPE: 'success',
      MESSAGE: `${resourceName} Updated successfully.`,
    }
  }
  // resourceUpdateSuccessful(currentLocale, resourceName) {
  //   // returning success response
  //   return {
  //     CODE: antl.forLocale(currentLocale).formatMessage('exceptions.code_115'),
  //     STATUS: antl.formatMessage('exceptions.status_115'),
  //     TYPE: antl.formatMessage('exceptions.type_115'),
  //     MESSAGE: antl
  //       .forLocale(currentLocale)
  //       .formatMessage('exceptions.message_115', {
  //         resourceName: antl
  //           .forLocale(currentLocale)
  //           .formatMessage(`keys.${resourceName}`),
  //       }),
  //   }
  // }
  /**
   * Returning Resource Updated Failed Response
   * @param resourceName
   */
  resourceUpdateFailed(resourceName) {
    // returning error response
    return {
      CODE: 'ES_RESOURCE_ADD_FAILED',
      STATUS: 151,
      TYPE: 'error',
      MESSAGE: `${resourceName} added failed.`,
    }
  }
  /**
   * Returning Resource Deletd Successful Response
   * @param currentLocale
   * @param resourceName
   */
  resourceDeleteSuccessful(resourceName, message, data = null) {
    // returning success response
    return {
      CODE: 'ES_RESOURCE_ADD_SUCCESS',
      STATUS: 101,
      TYPE: 'success',
      MESSAGE: `${resourceName} Deleted successfully.`,
    }
  }
  // resourceDeleteSuccessful(currentLocale, resourceName) {
  //   // returning success response
  //   return {
  //     CODE: antl.forLocale(currentLocale).formatMessage('exceptions.code_117'),
  //     STATUS: antl.formatMessage('exceptions.status_117'),
  //     TYPE: antl.formatMessage('exceptions.type_117'),
  //     MESSAGE: antl
  //       .forLocale(currentLocale)
  //       .formatMessage('exceptions.message_117', {
  //         resourceName: antl
  //           .forLocale(currentLocale)
  //           .formatMessage(`keys.${resourceName}`),
  //       }),
  //   }
  // }
  /**
   * Returning Resource Deleted Failed Response
   * @param currentLocale
   * @param resourceName
   */
  resourceDeleteFailed(currentLocale, resourceName) {
    // returning success response
    return {
      CODE: antl.forLocale(currentLocale).formatMessage('exceptions.code_118'),
      STATUS: antl.formatMessage('exceptions.status_118'),
      TYPE: antl.formatMessage('exceptions.type_118'),
      MESSAGE: antl
        .forLocale(currentLocale)
        .formatMessage('exceptions.message_118', {
          resourceName: antl
            .forLocale(currentLocale)
            .formatMessage(`keys.${resourceName}`),
        }),
    }
  }
  /**
   * Returning Resource Missing Response
   * @param currentLocale
   * @param resourceName
   */
  // resourceMissing(currentLocale, resourceName) {
  //   // returning error response
  //   return {
  //     CODE: antl.forLocale(currentLocale).formatMessage('exceptions.code_405'),
  //     STATUS: antl.formatMessage('exceptions.status_405'),
  //     TYPE: antl.formatMessage('exceptions.type_405'),
  //     MESSAGE: antl
  //       .forLocale(currentLocale)
  //       .formatMessage('exceptions.message_405', {
  //         resourceName: antl
  //           .forLocale(currentLocale)
  //           .formatMessage(`keys.${resourceName}`),
  //       }),
  //   }
  // }
  resourceMissing(resourceName) {
    return {
      CODE: 'NAJD_RESOURCE_MISSING',
      STATUS: 161,
      TYPE: 'error',
      MESSAGE: `${resourceName} is missing`,
    }
  }
  /**
   * Returning Duplicate Resource Response
   * @param resourceName
   */
  duplicateResource(resourceName) {
    // returning success response
    return {
      CODE: 'ES_RESOURCE_DUPLICATE',
      STATUS: 161,
      TYPE: 'error',
      MESSAGE: `${resourceName} already exists.`,
    }
  }
  /**
   * Returning Server Error Response
   * @param currentLocale
   * @param resourceName
   */
  serverError(currentLocale) {
    // returning error response
    return {
      CODE: antl.forLocale(currentLocale).formatMessage('exceptions.code_500'),
      STATUS: antl.formatMessage('exceptions.status_500'),
      TYPE: antl.formatMessage('exceptions.type_500'),
      MESSAGE: antl
        .forLocale(currentLocale)
        .formatMessage('exceptions.message_500'),
    }
  }

  /**
     * Returning Resource Added Successful Response
     * @param resourceName
     * @param message
     */
  resourceSendSuccessful(resourceName, message, data = null) {
    // returning success response
    return {
      CODE: 'ES_RESOURCE_ADD_SUCCESS',
      STATUS: 101,
      TYPE: 'success',
      MESSAGE: `${resourceName} send successfully.`,
    }
  }

}

module.exports = ExceptionsServices
