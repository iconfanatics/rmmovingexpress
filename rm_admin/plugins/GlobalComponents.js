/**
 ** File Name: GlobalComponents.js
 ** Adding the Common Components For all View
 ** Namespace: plugins
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
import Vue from 'vue'

// Importing ALl Common Component for Using Globally
import BreadCrumbs from '~/components/__partials/BreadCrumbs.vue'
import ListItemLoader from '~/components/__partials/ListItemLoader.vue'
import TableFooterInformation from '~/components/__partials/TableFooterInformation.vue'
import TableHeaderInformation from '~/components/__partials/TableHeaderInformation.vue'
import ProgressLoader from '~/components/__partials/ProgressLoader.vue'
import WalletMenu from '~/components/__partials/WalletMenu.vue'
import ProfileOptions from '~/components/__partials/ProfileOptions.vue'

// Declaring for using within VUE File
Vue.component('BreadCrumbs', BreadCrumbs)
Vue.component('ListItemLoader', ListItemLoader)
Vue.component('TableFooterInformation', TableFooterInformation)
Vue.component('TableHeaderInformation', TableHeaderInformation)
Vue.component('ProgressLoader', ProgressLoader)
Vue.component('WalletMenu', WalletMenu)
Vue.component('ProfileOptions', ProfileOptions)
