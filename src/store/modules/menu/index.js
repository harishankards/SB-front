import * as types from '../../mutation-types'
import newsfeed from './newsfeed'
import auth from './auth'
import projects from './projects'
import contests from './contests'
import awards from './awards'
import favorites from './favorites'

const state = {
  items: [
    newsfeed,
    projects,
    contests,
    awards,
    favorites,
    auth
  ]
}

const mutations = {
  [types.TOGGLE_EXPAND_MENU_ITEM] (state, payload) {
    let menuItem = payload.menuItem
    let expand = payload.expand
    if (menuItem.children && menuItem.meta) {
      menuItem.meta.expanded = expand
    }
  }
}

const actions = {
  toggleExpandMenuItem ({commit}, payload) {
    commit(types.TOGGLE_EXPAND_MENU_ITEM, payload)
  }
}

export default {
  state,
  mutations,
  actions
}
