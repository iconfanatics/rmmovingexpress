/**
 ** File Name: validations.js
 ** Handling All Kinds form validations for the Application
 ** Namespace: plugins
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
/** Modules */
import Vue from 'vue'
import { extend } from 'vee-validate'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import {
  required,
  alpha,
  email,
  max,
  min,
  confirmed,
  regex
} from 'vee-validate/dist/rules'

extend('required', required)
extend('alpha', alpha)
extend('email', email)
extend('max', max)
extend('min', min)
extend('confirmed', confirmed)
extend('regex', regex)

/** Declaration for Global Use */
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
