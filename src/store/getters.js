import utils from 'services/utils'

const menuItems = state => state.menu.items
const sidebarOpened = state => state.app.sidebar.opened
const toggleWithoutAnimation = state => state.app.sidebar.withoutAnimation
const config = state => state.app.config
const palette = state => state.app.config.palette
const isLoading = state => state.app.isLoading
const breadcrumbs = state => {
  return (keyword) => utils.findInNestedByName(state.menu.items, keyword)
}
const isLoggedIn = state => {
  return state.isLoggedIn
}

const student = state => {
  return state.student
}

const company = state => {
  return state.company
}

const uploadedFiles = state => {
  return state.uploadedFiles
}

export {
  menuItems,
  toggleWithoutAnimation,
  sidebarOpened,
  config,
  palette,
  isLoading,
  breadcrumbs,
  isLoggedIn,
  student,
  company,
  uploadedFiles
}
