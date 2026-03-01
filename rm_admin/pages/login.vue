<template>
  <v-app id="inspire" class="login_wrap">
    <v-main>
      <!-- START HEADER OPTION -->
      <AuthHeader />
      <!-- END HEADER OPTION -->
      <v-container
        class="fill-height"
        style="background: white; max-width: 100%;"
      >
        <v-row justify="center">
          <v-col cols="12" sm="8" md="3">
            <div class="de-login-title">
              <h2>{{ $t('login.login') }}</h2>
              <p>{{ $t('login.loginDetails') }}</p>
            </div>
            <ValidationObserver ref="loginObserver" v-slot="{ invalid }">
              <v-form ref="loginForm">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required|email"
                  vid="email"
                  :name="$t('login.email')"
                >
                  <v-text-field
                    :label="$t('login.email')"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    v-model="loginInfo.email"
                    :error-messages="errors"
                  />
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  vid="password"
                  :name="$t('login.password')"
                >
                  <v-text-field
                    id="password"
                    :label="$t('login.password')"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    @click:append="show2 = !show2"
                    v-model="loginInfo.password"
                    :error-messages="errors"
                  />
                </ValidationProvider>
              </v-form>
              <v-btn
                color="primary"
                class="de-btn-primary de-login-btn"
                :disabled="
                  !loginInfo.email ||
                    !loginInfo.password ||
                    isSignInLoading ||
                    invalid
                "
                :loading="isSignInLoading"
                @click="tryToEnter"
                >{{ $t('login.login') }}</v-btn
              >
            </ValidationObserver>
          </v-col>
          <v-col cols="12" sm="8" md="3">
            <div class="de-login-right-side">
              <img src="~/static/login-fx.png" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Cookies from 'js-cookie'
import AuthHeader from '~/components/__partials/AuthHeader.vue'
export default {
  name: 'AdminLogin',
  layout: 'default',
  middleware: 'guest',
  head() {
    return {
      titleTemplate: `${this.$t('pageTitles.login')} | ${process.env
        .COMPANY_NAME || process.env.DEFAULT_COMPANY_NAME} - ${this.$t(
        'pageTitles.slogan'
      ) || this.$t('pageTitles.defaultSlogan')}`
    }
  },
  components: {
    AuthHeader
  },
  data() {
    return {
      companyName: process.env.COMPANY_NAME,
      show1: false,
      show2: false,
      selectedLanguage: Cookies.get('admin_language')
        ? Cookies.get('admin_language')
        : 'en',
      isDisabled: false,
      loginInfo: {
        email: '',
        password: ''
      },
      isSignInLoading: false
    }
  },
  computed: {
    /**
     * available Languages
     */
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
  async mounted() {},
  watch: {},
  methods: {
    /**
     * Login for Client
     * @param loginInfo
     */
    async tryToEnter() {
      let _this = this
      try {
        _this.isSignInLoading = true
        await _this.$auth
          .loginWith('_local', {
            data: _this.loginInfo
          })
          .then(async (response) => {
            console.log(response)
            _this.isSignInLoading = false
            if (response && response.data && response.data.TYPE === 'success') {
              if (
                response &&
                response.data &&
                response.data.CODE === 'Z_PIN_SEND_SUCCESS' &&
                response.data.STATUS === '128'
              ) {
                // Verification PIN SEND Success
                await _this.$toast.success(
                  response.data.MESSAGE,
                  'topRight',
                  5000,
                  'success'
                )
                _this.$router.push(_this.localePath('/2fa/checkpoint'))
              } else if (
                response &&
                response.data &&
                response.data.CODE === 'Z_LOGIN_SUCCESS' &&
                response.data.STATUS === '121'
              ) {
                _this.$auth.setUser(response.data.user)
                // Set refresh token in httponly cookie using Nuxt server middleware
                await _this.$axios
                  .$post(
                    `${process.env.BASE_URL ||
                      'http://localhost:3001'}/napi/set-refresh-token`,
                    {
                      refreshToken: response.data.data.refreshToken
                    }
                  )
                  .then((response) => {})
                  .catch((error) => {})
                // redirecting after successfull login
                // deleting other strategic cookie
                Cookies.remove('_najd_a_t__2FA')
                // _this.$toast.success(
                //   response.data.MESSAGE,
                //   'topRight',
                //   5000,
                //   'success'
                // )
              }
            } else if (
              response &&
              response.data &&
              response.data.TYPE === 'error'
            ) {
              // removing token
              Cookies.remove('_najd_a_t__local')
              Cookies.remove('strategy')
              Cookies.remove('_najd_a_r_t__local')
              _this.$toast.error(
                response.data.MESSAGE,
                'topRight',
                5000,
                'error'
              )
            }
          })
          .catch((error) => {
            _this.isSignInLoading = false
            if (error && error.response && error.response.status === 401) {
              _this.$toast.error(
                _this.$t('commons.incorrectCredentials'),
                'topRight',
                5000,
                'error'
              )
            } else {
              _this.$toast.error(
                _this.$t('commons.commonError'),
                'topRight',
                5000,
                'error'
              )
            }
          })
      } catch (loginError) {
        _this.isSignInLoading = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    }
  }
}
</script>
