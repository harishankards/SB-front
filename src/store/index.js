import Vue from 'vue'
import Vuex from 'vuex'
import VuexI18n from 'vuex-i18n' // load vuex i18n module

import app from './modules/app'
import menu from './modules/menu'

import * as getters from './getters'
const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'
const clearUploadArray = 'clearUploadArray'

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
    company: !!localStorage.getItem('vuejs_company'),
    uploadedFiles: []
  },
  mutations: {
    [LOGIN] (state) {
      state.pending = true
    },
    [LOGIN_SUCCESS] (state) {
      state.isLoggedIn = true
      state.student = !!localStorage.getItem('vuejs_student')
      state.company = !!localStorage.getItem('vuejs_company')
      state.pending = false
    },
    [LOGOUT] (state) {
      state.isLoggedIn = false
      state.student = false
      state.company = false
    },
    addUploadedFiles (state, fileData) {
      state.uploadedFiles.push(fileData)
    },
    removeUploadedFiles (state, fileData) {
      state.uploadedFiles.splice(state.uploadedFiles.indexOf(fileData), 1)
    },
    clearUploadArray (state) {
      state.uploadedFiles = []
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
      localStorage.removeItem('vuejs_student')
      localStorage.removeItem('vuejs_company')
      localStorage.removeItem('vuejs_email')
      localStorage.removeItem('vuejs_logged_student_id')
      localStorage.removeItem('vuejs_logged_company_id')
      localStorage.removeItem('vuejs_imageData')
      context.commit(LOGOUT)
    },
    clearUploadArray: context => {
      context.commit(clearUploadArray)
    }
  }
})

Vue.use(VuexI18n.plugin, store)

export default store
