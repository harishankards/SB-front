import lazyLoading from './lazyLoading'

export default {
  name: 'Projects',
  path: '/projects/project-list',
  component: lazyLoading('projects/ProjectList'),
  meta: {
    default: false,
    title: 'menu.projects.parent',
    iconClass: 'fa fa-rocket'
  }
}
