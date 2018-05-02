import lazyLoading from './lazyLoading'

export default {
  name: 'Student Stats',
  path: '/student/stats',
  component: lazyLoading('stats/Index'),
  meta: {
    default: false,
    title: 'menu.stats',
    iconClass: 'fa fa-pie-chart',
    requiresAuth: true
  }
}
