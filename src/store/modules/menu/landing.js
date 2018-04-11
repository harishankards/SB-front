import lazyLoading from './lazyLoading'

export default {
  name: 'Landing',
  path: '/',
  component: lazyLoading('landing/Landing'),
  meta: {
    default: true,
    title: 'menu.landing',
    iconClass: 'vuestic-icon vuestic-icon-dashboard'
  }
}
