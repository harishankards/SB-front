import lazyLoading from './lazyLoading'

export default {
  name: 'Favorites',
  path: '/favorites',
  component: lazyLoading('favorites/Index'),
  meta: {
    default: false,
    title: 'menu.favorites',
    iconClass: 'fa fa-heart'
  }
}
