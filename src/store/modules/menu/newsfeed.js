import lazyLoading from './lazyLoading'

export default {
  name: 'Newsfeed',
  path: '/newsfeed',
  component: lazyLoading('newsfeed/Newsfeed'),
  meta: {
    default: false,
    title: 'menu.newsfeed',
    iconClass: 'vuestic-icon vuestic-icon-dashboard'
  }
}
