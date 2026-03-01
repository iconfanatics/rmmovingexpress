'use strict'
/**
 ** File Name: NotificationServices.js
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
const Notification = use('App/Models/Common/Notification')
/** Modules Sections */
const Logger = use('Logger')
const moment = use('moment')
const Ws = use('Ws')
class NotificationServices {
  /**
   * Cinstructor function
   * @param null
   */
  constructor() {}
  /**
   * Storing new Notification in the notifications table
   * @param {string} title
   * @param {string} description
   * @param {integer} client_account_id
   * @param {boolean} is_all
   *
   */
  async postAddNotification(
    title,
    description,
    client_account_id = null,
    is_all = 0
  ) {
    try {
      /** Making One Notification */
      const notification = new Notification()
      notification.title = title
      notification.description = description
      notification.client_account_id = client_account_id
      notification.is_all = is_all
      // await notification.save()
      /** Emiting Notification Event */
      const notificationChannel = Ws.getChannel('notification')
      if (notificationChannel) {
        // console.log(notificationChannel)
        const topic = notificationChannel.topic('notification')
        topic.broadcast('newnotification', notification)
      }
      // End of sending the notification
    } catch (addError) {
      console.log(addError)
    }
  }
}

module.exports = NotificationServices
