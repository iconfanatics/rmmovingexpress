<template>
  <div>
    <!--    start header-->
    <v-app-bar app clipped-left class="zd-header de-auth-header">
      <nuxt-link :to="localePath('/')" class="de-header-logo">
        <img src="~/static/logo.webp" height="30px" />
      </nuxt-link>
      <v-spacer></v-spacer>
      <div class="de-header-right">
        <v-menu origin="center center" transition="scale-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              x-small
              v-bind="attrs"
              v-on="on"
              fab
              class="mb-3 de-country-btn"
            >
              <v-icon dark>{{ `flag-${selectedLanguage}` }}</v-icon>
            </v-btn>
            <!-- <v-icon dark v-bind="attrs" v-on="on" class="mb-3"> {{ `flag-${selectedLanguage}` }}</v-icon> -->
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
              <v-list-item-content>
                <v-list-item-title
                  ><img
                    :src="'/flags/' + item.country + '.svg'"
                    height="11px"
                    width="15px"
                    :title="item.name"
                    :alt="item.code"
                    class="mr-1"
                  />{{ item.name }}</v-list-item-title
                >
              </v-list-item-content>
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
      selectedLanguage: Cookies.get('admin_language')
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
  mounted() {},
  methods: {
    fullscreen() {
      var fullScreenWindowss = new fullScreenWindow()
    }
  }
}
</script>
