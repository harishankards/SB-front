import lazyLoading from './lazyLoading'

export default {
  name: 'Student Projects',
  path: '/student/projects/project-list',
  component: lazyLoading('projects/ProjectList'),
  meta: {
    default: false,
    title: 'menu.projects.parent',
    iconClass: 'fa fa-rocket',
    requiresAuth: true
  }
}
