import lazyLoading from './lazyLoading'

export default {
  name: 'Messages',
  path: '/messages',
  component: lazyLoading('messages/Index'),
  meta: {
    default: false,
    title: 'menu.messages',
    iconClass: 'fa fa-paper-plane'
  }
}
