/**
 ** File Name: nuxt.config.js
 ** This is the main.js file for the ZeroCRM application
 ** Namespace: /
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
/** Modules Section */
const colors = require('vuetify/es5/util/colors').default
const webpack = require('webpack')
require('dotenv').config()
/** End of Modules Section */
// export default {
module.exports = {
  server: {
    port: 3001, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  // mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate:
      '%s | ' +
      `${process.env.COMPANY_NAME ||
        process.env.DEFAULT_COMPANY_NAME} - ${process.env.TITLE ||
        process.env.DEFAULT_TITLE}`,
    //+ process.env.COMPANY_NAME || process.env.DEFAULT_COMPANY_NAME,
    title: `${process.env.COMPANY_NAME || process.env.DEFAULT_COMPANY_NAME}`,
    // title: `${process.env.COMPANY_NAME ||
    //   process.env.DEFAULT_COMPANY_NAME} - ${process.env.TITLE ||
    //   process.env.DEFAULT_TITLE}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          process.env.PORTAL_DESCRIPTION ||
          process.env.DEFAULT_PORTAL_DESCRIPTION
      }
    ],
    // link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // Iconfonts for Vuetify. You need to leave only which one you use
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/4.4.95/css/materialdesignicons.min.css' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: 'green', height: '2px', duration: 5000, throttle: 0 },
  /*
   ** Global CSS
   */
  css: [
    // CSS file in the project
    '@/assets/css/material.css',
    // SCSS file in the project
    '@/assets/css/main.scss',
    'tiptap-vuetify/dist/main.css',
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    // Custom Plugins for Persisted State
    { src: '~/plugins/GlobalComponents', mode: 'client' },
    // Custom Plugins for axios module
    { src: '~/plugins/HTTP' },
    // Custom Plugins for Notifications module
    { src: '~/plugins/Notifications', mode: 'client' },
    // Custom Plugins for i18n module
    { src: '~/plugins/i18n' },
    /** Validations (vee-validate) */
    { src: '~/plugins/validations' },
    /** Websocket Plugin */
    { src: '~/plugins/ws.js', mode: 'client' },
    // Full Screen Mode in browser
    { src: '~/plugins/header', mode: 'client' },
    // High Charts in browser
    { src: '~/plugins/highcharts', mode: 'client' },
    { src: '~/plugins/header', mode: 'client' },
    { src: '~/plugins/TiptapVuetify', mode: 'client' },
    { src: '~/plugins/DateTImePicker', mode: 'client' },
    
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/vuetify', '@nuxtjs/moment'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    /** Axios module */
    '@nuxtjs/axios',
    /** PWA Module */
    '@nuxtjs/pwa',
    /** DotEnv Module */
    '@nuxtjs/dotenv',
    /** Internationalization Module */
    'nuxt-i18n',
    /** Authentication Module */
    '@nuxtjs/auth'
  ],

  /**
   * Auth Module Detail Endpoints
   * This will handle the Authentication of the application
   */
  auth: {
    token: {
      prefix: '_najd_a_t_'
    },
    refresh_token: {
      prefix: '_najd_a_r_t_'
    },
    localStorage: {
      prefix: ''
    },
    cookie: {
      prefix: '',
      options: {
        path: '/'
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: false,
      home: '/'
    },
    strategies: {
      _2FA: {
        _scheme: '~/schemes/_2FAStrategy',
        endpoints: {
          login: {
            url: '/login/2fa',
            method: 'post',
            propertyName: 'data.token'
          },
          user: { url: '/user/info', method: 'get', propertyName: false },
          logout: false
        },
        autoFetchUser: false
      },
      _local: {
        _scheme: '~/schemes/_authStrategy',
        endpoints: {
          // login url
          login: {
            url: 'admin/auth/login',
            method: 'post',
            propertyName: 'data.token'
          },
          user: { url: '/user/info', method: 'get', propertyName: false },
          logout: false
        },
        autoFetchUser: false
      }
    },
    rewriteRedirects: true,
    localStorage: false,
    tokenRequired: true,
    tokenName: 'Authorization',
    tokenType: 'Bearer'
  },

  /**
   * i18n Module Detail
   * This will handle the Internationalization/Multilanguage of the application
   */
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        country: 'us',
        file: 'en/en.js'
      },
      {
        code: 'zh',
        name: '中文',
        country: 'cn',
        file: 'zh/zh.js'
      }
    ],
    defaultLocale: 'en',
    fallbackLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'admin_language',
      alwaysRedirect: true
    },
    lazy: true, // for reading from custom file
    langDir: 'languages/',
    vueI18n: {
      // options
      fallbackLocale: 'en'
    }
  },

  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    theme: {
      light: true,
      themes: {
        light: {
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          success: colors.green.accent3,
          primary: '#1b77ff',
          secondary: '#034c70',
          accent: '#8c9eff',
          error: '#b71c1c',
          activemenu: '#04419d'
        }
      }
    }
  },
  /**
   * Runtime Config
   * This will automatically load the ENV DATA for Production Environment
   * This will be exposed to both Client and Server
   * Should not Include any secret data
   */
  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.API_URL || 'http://127.0.0.1:3333/api/v1'
    }
  },

  // axios: {
  //   proxy: true // Can be also an object with default options
  // },

  // proxy: {
  //   '/api/v1/': 'http://127.0.0.1:3333/api/v1'
  //   // "/api2/": "http://api.another-website.com"
  // },

  /**
   *  Server side middleware ( Express )
   */
  serverMiddleware: ['~/napi/index'],

  /*
   ** Build configuration
   */
  build: {
    standalone: true,
    // cssSourceMap: false,
    cssSourceMap: false,
    /**
     * vee-validate
     * @nuxtjs/auth
     */
    transpile: ['vee-validate/dist/rules', '@nuxtjs/auth'],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      /** Source Maps Disabling for Production */
      if (ctx.isDev === true) {
        config.devtool = ctx.isDev ? 'eval-source-map' : false
      }
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '~/assets/Message.mp3'
        }
      })
    },
    plugins: [
      new webpack.DefinePlugin({
        // NODE_ENV: 'development'
        NODE_ENV: 'production'
      })
    ]
  }
}
