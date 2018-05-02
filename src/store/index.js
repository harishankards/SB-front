import Vue from 'vue'
import Vuex from 'vuex'
import VuexI18n from 'vuex-i18n' // load vuex i18n module

import app from './modules/app'
import menu from './modules/menu'

import * as getters from './getters'

const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true, // process.env.NODE_ENV !== 'production',
  getters,
  modules: {
    app,
    menu
  },
  state: {
    isLoggedIn: !!localStorage.getItem('vuejs_token'),
    student: !!localStorage.getItem('vuejs_student'),
    company: !!localStorage.getItem('company')
  },
  mutations: {
    [LOGIN] (state) {
      state.pending = true
    },
    [LOGIN_SUCCESS] (state) {
      state.isLoggedIn = true
      state.pending = false
    },
    [LOGOUT] (state) {
      state.isLoggedIn = false
    }
  },
  actions: {
    login: context => {
      context.commit(LOGIN) // show spinner
      context.commit(LOGIN_SUCCESS)
    },
    logout: context => {
      console.log('logout action dispatched')
      localStorage.removeItem('vuejs_token')
      console.log('removed token')
      localStorage.removeItem('vuejs_student')
      localStorage.removeItem('vuejs_company')
      context.commit(LOGOUT)
    }
  }
})

Vue.use(VuexI18n.plugin, store)

export default store
