import lazyLoading from './lazyLoading'

export default {
  name: 'Student Awards',
  path: '/student/awards',
  component: lazyLoading('awards/Index'),
  meta: {
    default: false,
    title: 'menu.awards',
    iconClass: 'fa fa-trophy'
  }
}
