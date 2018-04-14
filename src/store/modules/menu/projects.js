import lazyLoading from './lazyLoading'

export default {
  name: 'Projects',
  meta: {
    expanded: false,
    title: 'menu.projects.parent',
    iconClass: 'fa fa-rocket'
  },

  children: [
    {
      name: 'menu.projects.newProject',
      path: '/projects/new',
      component: lazyLoading('projects/NewProject'),
      meta: {
        title: 'menu.projects.newProject'
      }
    },
    {
      name: 'menu.projects.projectList',
      path: '/projects/project-list',
      component: lazyLoading('projects/ProjectList'),
      meta: {
        title: 'menu.projects.projectList'
      }
    }
  ]
}
