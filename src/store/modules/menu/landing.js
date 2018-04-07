import lazyLoading from './lazyLoading'

export default {
  name: 'Landing',
  path: '/',
  component: lazyLoading('landing/Landing'),
  meta: {
    default: true,
    title: 'Landing',
    iconClass: 'vuestic-icon vuestic-icon-dashboard'
  }
}
