<template>
  <div>
    <!--    start header-->
    <v-app-bar app clipped-left color="white" class="zd-header">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <nuxt-link to="/home" class="de-logo">
        <img src="~/static/logo.png" />
      </nuxt-link>
      <v-spacer></v-spacer>
      <div class="de-header-right">
        <!-- <v-select
          flat
          :items="
            languageOptions && languageOptions.length > 0 ? languageOptions : []
          "
          label="Language"
          item-text="language"
          item-value="value"
          dense
          solo
          class="de-country-drop d-hide-mob"
          :value="selectedLanguage"
          @input="SET_SWITCH_ACCOUNT_LANGUAGE"
        ></v-select> -->

        <!-- <i v-on:click="fullscreen()" class="de-full-screen-ico zd-ico"></i> -->
        <!-- <i class="de-notification-ico zd-ico"></i>
        <i class="de-message-ico zd-ico"></i>
        <div class="de-profile-pic-header">
          <img src="~/static/profile.jpg" />
        </div>-->
        <i
          @click.stop="menuDrawer = !menuDrawer"
          class="de-right-menu-ico zd-ico"
        ></i>
      </div>
    </v-app-bar>
    <!--    end header-->

    <!--start navigation drawer-->
    <v-navigation-drawer
      v-model="menuDrawer"
      absolute
      temporary
      right
      class="de-drawer de-menu-right-sidebar"
    >
      <div class="de-drawer-header p0">
        <!-- <div class="de-mob-search">
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
        </div>-->
      </div>
      <v-divider></v-divider>
      <!-- Starting the Wallet mobile Section dynamically -->
      <div class="de-box de-drawer-content-box">
        <template v-if="walletInfo && walletInfo.length > 0">
          <div>
            <v-autocomplete
              :items="walletInfo"
              :label="$t('header.allWallets')"
              item-text="TotalWalletBalance"
              item-value="id"
              dense
              solo
              class="de-wallet-right-sidebar"
            >
              <template
                slot="selection"
                slot-scope="data"
                class="de-sidebar-wallet"
              >
                <div class="de-wallet-dropdown-tx">
                  {{ data.item.wallet_name }} :
                  {{
                    data.item.TotalWalletBalance
                      ? data.item.TotalWalletBalance
                      : 0
                  }}
                  USD
                </div>
              </template>
              <template slot="item" slot-scope="data">
                <div class="de-wallet-dropdown-tx">
                  {{ data.item.wallet_name }} :
                  {{
                    data.item.TotalWalletBalance
                      ? data.item.TotalWalletBalance
                      : 0
                  }}
                  USD
                </div>
              </template>
            </v-autocomplete>
          </div>
        </template>
      </div>
      <!-- End of Wallet mobile Section -->

      <div class="de-box de-drawer-content-box">
        <v-select
          flat
          :items="
            languageOptions && languageOptions.length > 0 ? languageOptions : []
          "
          label="Language"
          item-text="language"
          item-value="value"
          dense
          solo
          class="de-country-drop"
          :value="selectedLanguage"
          @input="SET_SWITCH_ACCOUNT_LANGUAGE"
        ></v-select>
      </div>
    </v-navigation-drawer>
    <!--end navigation drawer-->

    <!--    start sidebar-->
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      color="grey lighten-4"
      class="de-sidebar"
      style="border-right: 4px solid #ececec !important;"
    >
      <v-list dense class="grey lighten-4">
        <!-- <template v-for="(item, i) in items">
          <v-row v-if="item.heading" :key="i" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-right">
              <v-btn small text>edit</v-btn>
            </v-col>
          </v-row>
          <v-divider v-else-if="item.divider" :key="i" dark class="my-4" />
          <v-list-item v-else :key="i" link>
            <v-list-item-action>
              <v-icon class="grey--text" :class="item.icon">
                {{
                item.icon
                }}
              </v-icon>
            </v-list-item-action>
            <v-list-item-content v-if="item.text !== 'Logout'">
              <nuxt-link :to="item.url">
                <v-list-item-title class="grey--text">
                  {{
                  item.text
                  }}
                </v-list-item-title>
              </nuxt-link>
            </v-list-item-content>
            <v-list-item-content v-if="item.text === 'Logout'">
              <v-list-item-title class="grey--text" @click="logout">
                {{
                item.text
                }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>-->
        <!-- static menu -->
        <!-- <v-row v-if="item.heading" :key="i" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-right">
              <v-btn small text>edit</v-btn>
            </v-col>
        </v-row> -->
        <!-- <v-divider dark class="my-4" /> -->
        <v-list-item link>
          <v-list-item-action>
            <v-icon class="zd-ico zd-home">zd-ico zd-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <nuxt-link to="/home">
              <v-list-item-title class="grey--text">{{
                $t('leftSideBar.dashboard')
              }}</v-list-item-title>
            </nuxt-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon class="zd-ico zd-profile">zd-ico zd-profile</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <nuxt-link to="/profile">
              <v-list-item-title class="grey--text">{{
                $t('leftSideBar.myProfile')
              }}</v-list-item-title>
            </nuxt-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon class="zd-ico zd-trading">zd-ico zd-trading</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <nuxt-link to="/trading">
              <v-list-item-title class="grey--text">{{
                $t('leftSideBar.trading')
              }}</v-list-item-title>
            </nuxt-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon class="zd-ico zd-finance">zd-ico zd-finance</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <nuxt-link to="/finance">
              <v-list-item-title class="grey--text">{{
                $t('leftSideBar.Finance')
              }}</v-list-item-title>
            </nuxt-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon class="zd-ico zd-ticket">zd-ico zd-ticket</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <nuxt-link to="/tickets">
              <v-list-item-title class="grey--text">{{
                $t('leftSideBar.ticket')
              }}</v-list-item-title>
            </nuxt-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon class="zd-ico zd-support">zd-ico zd-support</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <nuxt-link to="/live-support">
              <v-list-item-title class="grey--text">{{
                $t('leftSideBar.liveSupport')
              }}</v-list-item-title>
            </nuxt-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon class="zd-ico zd-faq">zd-ico zd-faq</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <nuxt-link to="/faqs">
              <v-list-item-title class="grey--text">{{
                $t('leftSideBar.faqs')
              }}</v-list-item-title>
            </nuxt-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon class="zd-ico zd-profile">zd-ico zd-profile</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <nuxt-link to="/ib">
              <v-list-item-title class="grey--text">IB</v-list-item-title>
            </nuxt-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <i class="material-icons ico-logout">power_settings_new</i>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text" @click="logout">{{
              $t('leftSideBar.logout')
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- end of static menu -->
      </v-list>
    </v-navigation-drawer>
    <!--    end sidebar-->
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      menuDrawer: null,
      drawer: null,
      search: '',
      items: [
        { icon: 'zd-ico zd-home', text: 'Dashboard', url: '/home' },
        { icon: 'zd-ico zd-profile', text: 'My profile', url: '/profile' },
        { icon: 'zd-ico zd-trading', text: 'Trading', url: '/trading' },
        { icon: 'zd-ico zd-finance', text: 'Finance', url: '/finance' },
        { icon: 'zd-ico zd-ticket', text: 'Ticket', url: '/tickets' },
        {
          icon: 'zd-ico zd-support',
          text: 'Live Support',
          url: '/live-support'
        },
        { icon: 'zd-ico zd-faq', text: 'FAQs', url: '/faqs' },
        { icon: 'zd-ico zd-profile', text: 'IB', url: '/ib' },
        { icon: 'zd-ico zd-faq', text: 'Logout', url: '/logout' }
      ]
    }
  },
  // created() {
  //   // setting the choosen locale for user
  //   this.$i18n.locale = this.$store.state.dashboard.language
  //     ? this.$store.state.dashboard.language
  //     : 'en' // fallback language en
  //   // this.$i18n.locale = 'zh'
  // },
  async mounted() {
    this.$store.commit(
      '__helpers/buttonloaders/HIDE_COMMON_BUTTON_LOADER',
      null,
      {
        root: true
      }
    )
    // await this.getApplicationLanguages()
    // await this.getAccountInfo()
    // await this.getWalletInfo()
  },
  computed: {
    ...mapState('dashboard', [
      'accountInfo',
      'selectedLanguage',
      'languageOptions'
    ]),
    ...mapState('wallet', ['walletInfo'])
  },
  watch: {
    /**
     * Watching Language Change
     * @param language
     */
    selectedLanguage: function(language) {
      if (language && language !== this.accountInfo.language) {
        this.setAccountLanguage()

        this.menuDrawer = false
      }
    }
  },
  methods: {
    ...mapMutations('dashboard', ['SET_SWITCH_ACCOUNT_LANGUAGE']),
    ...mapActions('dashboard', [
      'getAccountInfo',
      'setAccountLanguage',
      'getApplicationLanguages',
      'closeRightbar'
    ]),
    ...mapActions('wallet', ['getWalletInfo']),

    fullscreen() {
      var fullScreenWindowss = new fullScreenWindow()
    },
    // async logout() {
    //   try {
    //     let _this = this
    //     _this.$store.commit('authentication/REMOVE_TOKEN', null, { root: true })
    //     this.$router.push('/')
    //   } catch (logoutError) {
    //     console.log(logoutError)
    //   }
    // },
    sidebarDrawer() {
      if (this.drawer != null) {
        this.drawer = !this.drawer
        //  var sidebarMenu = document.getElementsByClassName("zd-sidebar-menu");
        //  sidebarMenu[0].classList.toggle("sidebar_menu_active");
      }
    }
  }
}
</script>
