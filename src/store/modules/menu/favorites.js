import lazyLoading from './lazyLoading'

export default {
  name: 'Student Favorites',
  path: '/student/favorites',
  component: lazyLoading('favorites/Index'),
  meta: {
    default: false,
    title: 'menu.favorites',
    iconClass: 'fa fa-heart',
    requiresAuth: true
  }
}
