import lazyLoading from './lazyLoading'

export default {
  name: 'Projects',
  meta: {
    expanded: false,
    title: 'menu.projects',
    iconClass: 'vuestic-icon vuestic-icon-statistics'
  },

  children: [
    {
      name: 'menu.newProject',
      path: '/projects/new',
      component: lazyLoading('projects/NewProject'),
      meta: {
        title: 'menu.newProject'
      }
    },
    {
      name: 'menu.projectList',
      path: '/projects/project-list',
      component: lazyLoading('projects/ProjectList'),
      meta: {
        title: 'menu.projectList'
      }
    }
  ]
}
