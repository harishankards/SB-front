import lazyLoading from './lazyLoading'

export default {
  name: 'Student Settings',
  path: '/student/settings',
  component: lazyLoading('settings/Index'),
  meta: {
    default: false,
    title: 'menu.settings',
    iconClass: 'fa fa-gear',
    requiresAuth: true
  }
}
