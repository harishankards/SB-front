import lazyLoading from './lazyLoading'

export default {
  name: 'Contests',
  meta: {
    expanded: false,
    title: 'menu.contests.parent',
    iconClass: 'fa fa-flag'
  },

  children: [
    {
      name: 'menu.contests.upcoming',
      path: '/contests/upcoming',
      component: lazyLoading('contests/Upcoming'),
      meta: {
        title: 'menu.contests.upcoming'
      }
    },
    {
      name: 'menu.contests.history',
      path: '/contests/history',
      component: lazyLoading('contests/History'),
      meta: {
        title: 'menu.contests.history'
      }
    }
  ]
}
