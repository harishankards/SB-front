import lazyLoading from './lazyLoading'

export default {
  name: 'Awards',
  path: '/awards',
  component: lazyLoading('awards/Index'),
  meta: {
    default: false,
    title: 'menu.awards',
    iconClass: 'vuestic-icon vuestic-icon-dashboard'
  }
}
