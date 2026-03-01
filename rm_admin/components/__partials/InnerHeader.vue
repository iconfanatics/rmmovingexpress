<template>
  <div>
    <!--    start header-->
    <v-app-bar app clipped-left class="zd-header de-auth-header">
      <v-app-bar-nav-icon
        @click.stop="menuDrawer = !menuDrawer"
        id="sidebar_menu_btn"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="de-header-logo">
        <img
          src="~/static/logo.png"
          @click="$router.push(localePath('index'))"
        />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="de-header-right">
        <!-- Live Chat Message counter -->
        <v-badge
          bordered
          color="green"
          :value="newMessageCounter"
          :content="newMessageCounter"
          overlap
        >
          <v-btn
            small
            fab
            class="mb-3 de-country-btn-inner full-screen-btn"
            @click="$router.push(localePath('/support/live'))"
            title="Live Chat Messages"
          >
            <v-icon dark color="primary">message</v-icon>
          </v-btn>
        </v-badge>
        <!-- End of Live Chat Message counter -->

        <v-btn
          small
          fab
          class="mb-3 de-country-btn-inner full-screen-btn"
          @click="fullscreen"
          title="See Fullscreen"
        >
          <v-icon dark color="primary">mdi-fullscreen</v-icon>
        </v-btn>

        <v-menu origin="center center" transition="scale-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              v-bind="attrs"
              v-on="on"
              fab
              class="mb-3 de-country-btn-inner"
              title="Change language"
            >
              <v-icon dark>{{ `flag-${selectedLanguage}` }}</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, i) in languageOptions"
              :key="i"
              @click="
                selectedLanguage = item.code
                $router.push(switchLocalePath(item.code))
              "
            >
              <v-list-item-title>
                <img
                  :src="'/flags/' + item.country + '.svg'"
                  height="11px"
                  width="15px"
                  :title="item.name"
                  :alt="item.code"
                  class="mr-1"
                />
                {{ item.name }}</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <!--    end header-->
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      menuDrawer: null,
      selectedLanguage: Cookies.get('admin_language'),
      newMessageCounter: 0,
      clientWallets: [
        { wallet: 'Real-Time', balance: '50' },
        { wallet: 'Audience', balance: '100' },
        { wallet: 'Conversions', balance: '500' }
      ],
      selectedLanguage: Cookies.get('admin_language')
        ? Cookies.get('admin_language')
        : 'en'
    }
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
    languageOptions() {
      return this.$i18n.locales
    }
  },
  beforeCreate() {
    // setting the language as cookie value
    const selectedLanguage = Cookies.get('admin_language')
      ? Cookies.get('admin_language')
      : 'en'
    Cookies.set('admin_language', selectedLanguage)
  },
  mounted() {
    // receiving the event emited from live-support page
    this.$nuxt.$on('have-new-message', (counter) => {
      if (counter === 0) {
        this.newMessageCounter = 0
      } else {
        this.newMessageCounter++
      }
    })
  },
  methods: {
    fullscreen() {
      var fullScreenWindowss = new fullScreenWindow()
    }
  }
}
</script>
