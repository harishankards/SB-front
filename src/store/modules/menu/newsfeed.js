import lazyLoading from './lazyLoading'

export default {
  name: 'Student Newsfeed',
  path: '/student/newsfeed',
  component: lazyLoading('newsfeed/Newsfeed'),
  meta: {
    default: false,
    title: 'menu.newsfeed',
    iconClass: 'fa fa-newspaper-o',
    requiresAuth: true,
    accountAuth: true
  }
}
