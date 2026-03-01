<template>
  <v-app id="inspire" class="zd-wrap">
    <div class="cx-home-wrap">
      <!-- Go Top Icon Button -->
      <v-btn
        v-scroll="onScroll"
        v-show="goToTop"
        fab
        dark
        fixed
        bottom
        right
        small
        color="primary"
        title="Go to Top"
        @click="toTop"
      >
        <v-icon small>keyboard_arrow_up</v-icon>
      </v-btn>
      <!-- End of Go Top Icon Button -->
      <!--Start Header -->
      <!--    start header-->
      <v-app-bar app clipped-left class="zd-header de-auth-header">
        <v-app-bar-nav-icon
          @click.stop="menuDrawer = !menuDrawer"
          id="sidebar_menu_btn"
        ></v-app-bar-nav-icon>
        <v-toolbar-title class="de-header-logo">
          <img
            src="~/static/logo.webp"
            @click="$router.push(localePath('index'))"
          />
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="de-header-right">
          <!-- Search Option -->
          <v-btn
            small
            fab
            class="mb-3 de-country-btn-inner full-screen-btn"
            @click="$router.push(localePath('/app/search'))"
          >
            <v-icon dark color="primary" small>mdi-magnify</v-icon>
          </v-btn>
          <v-btn
            small
            fab
            class="mb-3 de-country-btn-inner full-screen-btn"
            @click="controlAppScreen"
            title="See Fullscreen"
          >
            <v-icon dark color="primary">mdi-fullscreen</v-icon>
          </v-btn>
          <!-- End of App Screen -->
          <!-- Notification Section -->
          <v-menu bottom origin="center center" transition="scale-transition">
          </v-menu>

          <!-- Profile Section -->
          <v-menu origin="center center" transition="scale-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                small
                v-bind="attrs"
                v-on="on"
                fab
                class="mb-3 de-country-btn-inner full-screen-btn"
                title="Change language"
              >
                <v-icon dark color="primary">mdi-account-circle</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <v-btn>
                    Logout
                  </v-btn>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-app-bar>
      <!--    end header-->
      <!-- Start Left side bar for Menu Items -->
      <v-navigation-drawer
        v-model="menuDrawer"
        class="de-sidebar"
        fixed
        clipped
        app
      >
        <v-list-item class="mt-1 mb-1">
          <v-btn
            block
            color="primary"
            small
            class="de-btn-primary"
            @click="$router.push(localePath('index'))"
            >Back</v-btn
          >
          <!-- </nuxt-link> -->
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense class="mt0">
          <template v-for="(menu, index) in accountsMenuItems">
            <!-- Start Sidebar Menu -->
            <nuxt-link :to="menu.link">
              <v-list-item @click :key="menu.text">
                <v-list-item-icon>
                  <v-icon>{{ menu.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ menu.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </nuxt-link>
            <!-- End Sidebar Menu -->
          </template>
        </v-list>
      </v-navigation-drawer>
      <!-- End of Menu Items Sidebar -->
      <!-- Start Page Router-->
      <v-main class="de-main-content">
        <v-container fluid>
          <v-layout justify-center align-center>
            <v-flex>
              <v-row justify="center" align="center">
                <v-col class="flex xs11 sm12 md11">
                  <!-- START PAGE ROUTER-->
                  <nuxt />
                  <!-- END PAGE ROUTER-->
                </v-col>
              </v-row>
            </v-flex>
          </v-layout>
        </v-container>
      </v-main>
      <!--End Page Router-->
    </div>
    <!-- Profile Options Dialog Component -->
    <client-only
      ><ProfileOptions :isShow="showProfileOptionsDialog"></ProfileOptions
    ></client-only>
    <!-- End of Profile Options Dialog Component -->
  </v-app>
</template>
<script>
import Cookies from 'js-cookie'
import { mapState } from 'vuex'
export default {
  name: 'MainAccountsLayout',
  data() {
    return {
      menuDrawer: null,
      goToTop: false,
      selectedLanguage: Cookies.get('admin_language')
        ? Cookies.get('admin_language')
        : 'en',
      // live chat message counter
      newMessageCounter: 0,
      showProfileOptionsDialog: false
    }
  },
  watch: {},
  computed: {
    ...mapState([
      'notifications',
      'notificationCounter',
      'notificationSocketStatus'
    ]),
    /**
     * available Languages
     */
    languageOptions() {
      return this.$i18n.locales
    },
    /**
     * Translating Account Menu Items
     */
    accountsMenuItems() {
      return [
        {
          icon: 'account_circle',
          text: 'Resources Document',
          link: this.localePath('/resources/document')
        },
        {
          icon: 'mdi-alpha-t-box',
          text: 'Resources Content',
          link: this.localePath('/resources/content')
        }
      ]
    }
  },
  async mounted() {},
  methods: {
    /**
     * Tracking the Scroll of a Page
     * @param event
     */
    onScroll(event) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || event.target.scrollTop || 0
      this.goToTop = top > 20
    },
    /**
     * Going to Top
     * @param null
     */
    toTop() {
      this.$vuetify.goTo(0)
    }
  }
}
</script>
<style lang="css">
.v-application--wrap {
  background: #f6f7fb !important;
}
.v-application .grey.lighten-4 {
  background-color: #f5f5f5 !important;
  border-color: #f5f5f5 !important;
}
.elevation-1 {
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0), 0 1px 1px 0 rgba(0, 0, 0, 0.04),
    0 1px 13px 0 rgba(0, 0, 0, 0.3) !important;
}
.v-list-item__title a {
  text-decoration: none;
  color: #000000de;
}
html {
  overflow: auto;
}
.v-list-group__header__prepend-icon {
  font-size: 16px;
}
.de-btn-primary {
  padding: 10px 10px !important;
}
.active {
  background-color: #d3e0fc !important;
}
.active2 {
  background-color: green !important;
}
</style>
