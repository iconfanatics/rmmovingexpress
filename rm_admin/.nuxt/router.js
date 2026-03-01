import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6415020d = () => interopDefault(import('../pages/blog/index.vue' /* webpackChunkName: "pages/blog/index" */))
const _21b3d5b1 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _5a90c724 = () => interopDefault(import('../pages/project/index.vue' /* webpackChunkName: "pages/project/index" */))
const _f3658d64 = () => interopDefault(import('../pages/settings/index.vue' /* webpackChunkName: "pages/settings/index" */))
const _ad23f8c2 = () => interopDefault(import('../pages/testimonials/index.vue' /* webpackChunkName: "pages/testimonials/index" */))
const _580c329a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _84817bea = () => interopDefault(import('../pages/about/about-us/index.vue' /* webpackChunkName: "pages/about/about-us/index" */))
const _6effbdca = () => interopDefault(import('../pages/about/team/index.vue' /* webpackChunkName: "pages/about/team/index" */))
const _251f3d04 = () => interopDefault(import('../pages/admins/all.vue' /* webpackChunkName: "pages/admins/all" */))
const _472f3745 = () => interopDefault(import('../pages/client/all.vue' /* webpackChunkName: "pages/client/all" */))
const _617284e6 = () => interopDefault(import('../pages/home/happy-customer/index.vue' /* webpackChunkName: "pages/home/happy-customer/index" */))
const _352bf182 = () => interopDefault(import('../pages/home/home-service/index.vue' /* webpackChunkName: "pages/home/home-service/index" */))
const _c4135df8 = () => interopDefault(import('../pages/home/moving-expert/index.vue' /* webpackChunkName: "pages/home/moving-expert/index" */))
const _da73ebc8 = () => interopDefault(import('../pages/home/slider/index.vue' /* webpackChunkName: "pages/home/slider/index" */))
const _841241cc = () => interopDefault(import('../pages/resources/content/index.vue' /* webpackChunkName: "pages/resources/content/index" */))
const _e5663720 = () => interopDefault(import('../pages/resources/document/index.vue' /* webpackChunkName: "pages/resources/document/index" */))
const _14d2db49 = () => interopDefault(import('../pages/service/service-banner/index.vue' /* webpackChunkName: "pages/service/service-banner/index" */))
const _04d3821b = () => interopDefault(import('../pages/service/service-category/index.vue' /* webpackChunkName: "pages/service/service-category/index" */))
const _7efee1ef = () => interopDefault(import('../pages/service/service-faq/index.vue' /* webpackChunkName: "pages/service/service-faq/index" */))
const _38b48468 = () => interopDefault(import('../pages/service/service-name/index.vue' /* webpackChunkName: "pages/service/service-name/index" */))
const _63739128 = () => interopDefault(import('../pages/service/service-page/index.vue' /* webpackChunkName: "pages/service/service-page/index" */))
const _16716abd = () => interopDefault(import('../pages/service/service-section-two/index.vue' /* webpackChunkName: "pages/service/service-section-two/index" */))
const _6a2616fd = () => interopDefault(import('../pages/why-choose/why-choose-point/index.vue' /* webpackChunkName: "pages/why-choose/why-choose-point/index" */))
const _722e2b27 = () => interopDefault(import('../pages/why-choose/why-choose-us/index.vue' /* webpackChunkName: "pages/why-choose/why-choose-us/index" */))
const _e1c00f28 = () => interopDefault(import('../pages/admins/roles/all.vue' /* webpackChunkName: "pages/admins/roles/all" */))
const _fef682ae = () => interopDefault(import('../pages/client/search/New folder/[...slug].vue' /* webpackChunkName: "pages/client/search/New folder/[...slug]" */))
const _26195f6d = () => interopDefault(import('../pages/client/search/New folder/[id].vue' /* webpackChunkName: "pages/client/search/New folder/[id]" */))
const _8a6d09b0 = () => interopDefault(import('../pages/client/search/New folder/000index.vue' /* webpackChunkName: "pages/client/search/New folder/000index" */))
const _1dabe5ab = () => interopDefault(import('../pages/admins/details/_adminId.vue' /* webpackChunkName: "pages/admins/details/_adminId" */))
const _5ba2ce42 = () => interopDefault(import('../pages/client/search/_id.vue' /* webpackChunkName: "pages/client/search/_id" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/blog",
    component: _6415020d,
    name: "blog___en"
  }, {
    path: "/login",
    component: _21b3d5b1,
    name: "login___en"
  }, {
    path: "/project",
    component: _5a90c724,
    name: "project___en"
  }, {
    path: "/settings",
    component: _f3658d64,
    name: "settings___en"
  }, {
    path: "/testimonials",
    component: _ad23f8c2,
    name: "testimonials___en"
  }, {
    path: "/zh",
    component: _580c329a,
    name: "index___zh"
  }, {
    path: "/about/about-us",
    component: _84817bea,
    name: "about-about-us___en"
  }, {
    path: "/about/team",
    component: _6effbdca,
    name: "about-team___en"
  }, {
    path: "/admins/all",
    component: _251f3d04,
    name: "admins-all___en"
  }, {
    path: "/client/all",
    component: _472f3745,
    name: "client-all___en"
  }, {
    path: "/home/happy-customer",
    component: _617284e6,
    name: "home-happy-customer___en"
  }, {
    path: "/home/home-service",
    component: _352bf182,
    name: "home-home-service___en"
  }, {
    path: "/home/moving-expert",
    component: _c4135df8,
    name: "home-moving-expert___en"
  }, {
    path: "/home/slider",
    component: _da73ebc8,
    name: "home-slider___en"
  }, {
    path: "/resources/content",
    component: _841241cc,
    name: "resources-content___en"
  }, {
    path: "/resources/document",
    component: _e5663720,
    name: "resources-document___en"
  }, {
    path: "/service/service-banner",
    component: _14d2db49,
    name: "service-service-banner___en"
  }, {
    path: "/service/service-category",
    component: _04d3821b,
    name: "service-service-category___en"
  }, {
    path: "/service/service-faq",
    component: _7efee1ef,
    name: "service-service-faq___en"
  }, {
    path: "/service/service-name",
    component: _38b48468,
    name: "service-service-name___en"
  }, {
    path: "/service/service-page",
    component: _63739128,
    name: "service-service-page___en"
  }, {
    path: "/service/service-section-two",
    component: _16716abd,
    name: "service-service-section-two___en"
  }, {
    path: "/why-choose/why-choose-point",
    component: _6a2616fd,
    name: "why-choose-why-choose-point___en"
  }, {
    path: "/why-choose/why-choose-us",
    component: _722e2b27,
    name: "why-choose-why-choose-us___en"
  }, {
    path: "/zh/blog",
    component: _6415020d,
    name: "blog___zh"
  }, {
    path: "/zh/login",
    component: _21b3d5b1,
    name: "login___zh"
  }, {
    path: "/zh/project",
    component: _5a90c724,
    name: "project___zh"
  }, {
    path: "/zh/settings",
    component: _f3658d64,
    name: "settings___zh"
  }, {
    path: "/zh/testimonials",
    component: _ad23f8c2,
    name: "testimonials___zh"
  }, {
    path: "/admins/roles/all",
    component: _e1c00f28,
    name: "admins-roles-all___en"
  }, {
    path: "/zh/about/about-us",
    component: _84817bea,
    name: "about-about-us___zh"
  }, {
    path: "/zh/about/team",
    component: _6effbdca,
    name: "about-team___zh"
  }, {
    path: "/zh/admins/all",
    component: _251f3d04,
    name: "admins-all___zh"
  }, {
    path: "/zh/client/all",
    component: _472f3745,
    name: "client-all___zh"
  }, {
    path: "/zh/home/happy-customer",
    component: _617284e6,
    name: "home-happy-customer___zh"
  }, {
    path: "/zh/home/home-service",
    component: _352bf182,
    name: "home-home-service___zh"
  }, {
    path: "/zh/home/moving-expert",
    component: _c4135df8,
    name: "home-moving-expert___zh"
  }, {
    path: "/zh/home/slider",
    component: _da73ebc8,
    name: "home-slider___zh"
  }, {
    path: "/zh/resources/content",
    component: _841241cc,
    name: "resources-content___zh"
  }, {
    path: "/zh/resources/document",
    component: _e5663720,
    name: "resources-document___zh"
  }, {
    path: "/zh/service/service-banner",
    component: _14d2db49,
    name: "service-service-banner___zh"
  }, {
    path: "/zh/service/service-category",
    component: _04d3821b,
    name: "service-service-category___zh"
  }, {
    path: "/zh/service/service-faq",
    component: _7efee1ef,
    name: "service-service-faq___zh"
  }, {
    path: "/zh/service/service-name",
    component: _38b48468,
    name: "service-service-name___zh"
  }, {
    path: "/zh/service/service-page",
    component: _63739128,
    name: "service-service-page___zh"
  }, {
    path: "/zh/service/service-section-two",
    component: _16716abd,
    name: "service-service-section-two___zh"
  }, {
    path: "/zh/why-choose/why-choose-point",
    component: _6a2616fd,
    name: "why-choose-why-choose-point___zh"
  }, {
    path: "/zh/why-choose/why-choose-us",
    component: _722e2b27,
    name: "why-choose-why-choose-us___zh"
  }, {
    path: "/client/search/New%20folder/%5B...slug%5D",
    component: _fef682ae,
    name: "client-search-New folder-[...slug]___en"
  }, {
    path: "/client/search/New%20folder/%5Bid%5D",
    component: _26195f6d,
    name: "client-search-New folder-[id]___en"
  }, {
    path: "/client/search/New%20folder/000index",
    component: _8a6d09b0,
    name: "client-search-New folder-000index___en"
  }, {
    path: "/zh/admins/roles/all",
    component: _e1c00f28,
    name: "admins-roles-all___zh"
  }, {
    path: "/zh/client/search/New%20folder/%5B...slug%5D",
    component: _fef682ae,
    name: "client-search-New folder-[...slug]___zh"
  }, {
    path: "/zh/client/search/New%20folder/%5Bid%5D",
    component: _26195f6d,
    name: "client-search-New folder-[id]___zh"
  }, {
    path: "/zh/client/search/New%20folder/000index",
    component: _8a6d09b0,
    name: "client-search-New folder-000index___zh"
  }, {
    path: "/",
    component: _580c329a,
    name: "index___en"
  }, {
    path: "/zh/admins/details/:adminId?",
    component: _1dabe5ab,
    name: "admins-details-adminId___zh"
  }, {
    path: "/zh/client/search/:id?",
    component: _5ba2ce42,
    name: "client-search-id___zh"
  }, {
    path: "/admins/details/:adminId?",
    component: _1dabe5ab,
    name: "admins-details-adminId___en"
  }, {
    path: "/client/search/:id?",
    component: _5ba2ce42,
    name: "client-search-id___en"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
