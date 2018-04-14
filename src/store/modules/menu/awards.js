import lazyLoading from './lazyLoading'

export default {
  name: 'Awards',
  path: '/awards',
  component: lazyLoading('awards/Index'),
  meta: {
    default: false,
    title: 'menu.awards',
    iconClass: 'fa fa-trophy'
  }
}
