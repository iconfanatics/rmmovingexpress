'use strict'
/**
 ** File Name: LoggerServices.js
 ** Services to help the task related to Write as Log
 ** Namespace: App/Services/Logger
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
class LoggerServices {
  constructor() {}
  /**
   * Writing to Log File
   * @param ufileNamerl
   * @param url
   * @param user
   * @param IP
   * @param time
   * @param message
   */
  async writeToLog(fileName, url, user, IP, time, message, type = 'info') {
    try {
      // Logging System
      if (type === 'info') {
        Logger.transport(fileName).info(message, {
          url: url,
          user: user,
          IP: IP,
          time: time,
        })
      } else if (type === 'warning') {
        Logger.transport(fileName).warning(message, {
          url: url,
          user: user,
          IP: IP,
          time: time,
        })
      } else {
        Logger.transport(fileName).error(message, {
          url: url,
          user: user,
          IP: IP,
          time: time,
        })
      }
      return true
    } catch (logError) {
      console.log(logError)
      if (type === 'info') {
        Logger.transport(fileName).info(message, {
          url: url,
          user: user,
          IP: IP,
          time: time,
        })
      } else if (type === 'warning') {
        Logger.transport(fileName).warning(message, {
          url: url,
          user: user,
          IP: IP,
          time: time,
        })
      } else {
        Logger.transport(fileName).error(message, {
          url: url,
          user: user,
          IP: IP,
          time: time,
        })
      }
      return true
    }
  }
}

module.exports = LoggerServices
