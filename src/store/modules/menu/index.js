import * as types from '../../mutation-types'
import newsfeed from './newsfeed'
import auth from './auth'
import projects from './projects'
import contests from './contests'
import awards from './awards'
import favorites from './favorites'
import messages from './messages'
import stats from './stats'

const state = {
  items: [
    newsfeed,
    projects,
    contests,
    awards,
    messages,
    favorites,
    stats,
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
