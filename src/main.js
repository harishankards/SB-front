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

// For http requests
Vue.use(VueAxios, axios)
axios.defaults.baseURL = 'http://localhost:3000'
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

// For local storage
Vue.use(Storage, {
  namespace: 'vuejs_',
  name: 'ls',
  storage: 'local'
})

// NOTE: workaround for VeeValidate + vuetable-2
Vue.use(VeeValidate, {fieldsBagName: 'formFields'})
Vue.use(VeeValidate)

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
  store.commit('setLoading', true)
  next()
})

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
  components: { App }
})
