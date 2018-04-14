import lazyLoading from './lazyLoading'

export default {
  name: 'Contests',
  path: '/contests',
  component: lazyLoading('contests/Contests'),
  meta: {
    expanded: false,
    title: 'menu.contests.parent',
    iconClass: 'fa fa-flag'
  }
}
