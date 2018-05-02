import lazyLoading from './lazyLoading'

export default {
  name: 'Student Messages',
  path: '/student/messages',
  component: lazyLoading('messages/Index'),
  meta: {
    default: false,
    title: 'menu.messages',
    iconClass: 'fa fa-paper-plane',
    requiresAuth: true
  }
}
