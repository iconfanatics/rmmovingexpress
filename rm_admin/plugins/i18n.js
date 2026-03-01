/**
 ** File Name: i18n.js
 ** Handling the Internationalization
 ** Namespace: plugins
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
/** Modules */
import Cookies from 'js-cookie'
import { configure } from 'vee-validate'
/** End of Modules */
export default function({ app }) {
  // This function will be called right after a new locale has been set
  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    // Setting the new language as the cookies language
    Cookies.set('admin_language', newLocale)
  }

  /**
   * Configuring the Validation Messages
   */
  configure({
    defaultMessage: (field, values) => {
      // values._field_ = app.i18n.t(`names.${field}`) // this field does not needed to translate since I have already translated it
      return app.i18n.t(`validation.${values._rule_}`, values)
    }
  })
  /** End of Configuring Validation Messages */
}
