import lazyLoading from './lazyLoading'

export default {
  name: 'Stats',
  path: '/stats',
  component: lazyLoading('stats/Index'),
  meta: {
    default: false,
    title: 'menu.stats',
    iconClass: 'fa fa-pie-chart'
  }
}
