import lazyLoading from './lazyLoading'

export default {
  name: 'Student Contests',
  path: '/student/contests',
  component: lazyLoading('contests/Contests'),
  meta: {
    expanded: false,
    title: 'menu.contests.parent',
    iconClass: 'fa fa-flag'
  }
}
