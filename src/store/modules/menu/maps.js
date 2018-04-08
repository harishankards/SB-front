import lazyLoading from './lazyLoading'

export default {
  name: 'Maps',
  meta: {
    expanded: false,
    title: 'menu.maps',
    iconClass: 'vuestic-icon vuestic-icon-maps'
  },

  children: [
    {
      name: 'GoogleMaps',
      path: '/maps/google-maps',
      component: lazyLoading('maps/google-maps/GoogleMapsPage'),
      meta: {
        title: 'Google Maps'
      }
    }
  ]
}
