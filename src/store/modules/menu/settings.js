import lazyLoading from './lazyLoading'

export default {
  name: 'Settings',
  path: '/settings',
  component: lazyLoading('settings/Index'),
  meta: {
    default: false,
    title: 'menu.settings',
    iconClass: 'fa fa-gear'
  }
}
