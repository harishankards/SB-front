// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from './App'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import VuesticPlugin from 'vuestic-theme/vuestic-plugin'
import './i18n'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCsrf from 'vue-csrf'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
import Storage from 'vue-ls'
import VueTimeago from 'vue-timeago'
import VueSweetalert2 from 'vue-sweetalert2'
import VueImg from 'v-img'
import SocialSharing from 'vue-social-sharing'
import VTooltip from 'v-tooltip'
import VueSocketio from 'vue-socket.io-extended'
import io from 'socket.io-client'
import Toasted from 'vue-toasted'
import VueCharts from 'vue-chartjs'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

// For http requests
Vue.use(VueAxios, axios)
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers = {
  'Content-Type': 'application/json'
}

Vue.use(VuesticPlugin)

// for CSRF

Vue.use(VueCsrf, {
  selector: 'meta[name="csrf-token"]', // selector of csrf element with csrf-token value
  attribute: 'content' // attribute of csrf-token element
})

// For v-calendar
Vue.use(VCalendar, {
  firstDayOfWeek: 2  // Monday
})

//  For vue-moment
Vue.use(require('vue-moment'))

// For local storage
Vue.use(Storage, {
  namespace: 'vuejs_',
  name: 'ls',
  storage: 'local'
})

// NOTE: workaround for VeeValidate + vuetable-2
Vue.use(VeeValidate, {fieldsBagName: 'formFields'})
Vue.use(VeeValidate)

// For using time fields in projects and contests
Vue.use(VueTimeago, {
  name: 'timeago',
  locale: 'en-US',
  locales: {
    'en-US': require('vue-timeago/locales/en-US.json')
  }
})

// For sweet alert
Vue.use(VueSweetalert2)

// For image viewer
Vue.use(VueImg)

// For social sharing
Vue.use(SocialSharing)

// For tooltip and popover
Vue.use(VTooltip)

// For socket io - notifications and chat
Vue.use(VueSocketio, io('http://localhost:3000'))

// For toasted notifications
Vue.use(Toasted)

Vue.use(VueCharts)

Vue.use(VueAwesomeSwiper)

sync(store, router)

// For passing data between components
export const eventBus = new Vue()

let mediaHandler = () => {
  if (window.matchMedia(store.getters.config.windowMatchSizeLg).matches) {
    store.dispatch('toggleSidebar', true)
  } else {
    store.dispatch('toggleSidebar', false)
  }
}

router.beforeEach((to, from, next) => {
  // store.commit('setLoading', true)
  if (to.matched.some(record => record.meta.accountAuth)) {
    console.log('Checking verification', Vue.ls.get('verified'))
    if (Vue.ls.get('verified')) {
      console.log('I am verified')
      next()
    } else {
      console.log('I am not verified')
      next({name: 'unverified'})
    }
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  store.commit('setLoading', true)
  console.log(to)
  // console.log('to matched some', to.matched.some(record => record.meta.requiresAuth))
  if (to.meta.accountAuth) {
    if (!store.getters.isLoggedIn) {
      console.log('not logged from router beforeeach')
      next({path: '/', query: { redirect: to.fullPath }})
    } else if (store.getters.isLoggedIn) {
      console.log('logged in from beforeach', store.getters.student)
      if (store.getters.student && Vue.ls.get('verified')) {
        console.log('to location inside student', to.fullPath)
        if (to.matched.some(record => record.meta.shared)) {
          next()
        } else if (to.fullPath.includes('student')) {
          next()
        } else {
          next({path: '/student/newsfeed', query: { redirect: to.fullPath }})
        }
      } else if (store.getters.company && Vue.ls.get('verified')) {
        console.log('to location inside company', to.fullPath)
        if (to.matched.some(record => record.meta.shared)) {
          next()
        } else if (to.fullPath.includes('company')) {
          next()
        } else {
          next({path: '/company/newsfeed', query: { redirect: to.fullPath }})
        }
      } else {
        console.log(('I am uncaught'))
        next('/unverified')
      }
    } else {
      next()
    }
  } else if (to.meta.requiresAuth) {
    if (store.getters.isLoggedIn) {
      next()
    } else {
      next({path: '/', query: { redirect: to.fullPath }})
    }
  } else {
    next()
  }
})


export function getRedirectUri (uri) {
  try {
    return (typeof uri !== 'undefined')
      ? `${window.location.origin}${uri}`
      : window.location.origin
  } catch (e) {}

  return uri || null
}

router.afterEach((to, from) => {
  mediaHandler()
  store.commit('setLoading', false)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  sockets: {
    connect () {
      console.log('socket connected')
    }
  }
})
