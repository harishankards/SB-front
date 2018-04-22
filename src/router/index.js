import Vue from 'vue'
import Router from 'vue-router'

import menuModule from 'vuex-store/modules/menu'

import landing from 'components/landing/Landing'
import CompanyLogin from 'components/auth/login/CompanyLogin'
import CompanySignup from 'components/auth/signup/CompanySignup'
import StudentLogin from 'components/auth/login/StudentLogin'
import StudentSignup from 'components/auth/signup/StudentSignup'

import NewProject from 'components/projects/NewProject'

import CompanyNewsfeed from 'components/company/newsfeed/Newsfeed'
import CompanyContest from 'components/company/contest/Contest'
import CompanyProjects from 'components/company/projects/Project'
import CompanyAwards from 'components/company/awards/Award'
import CompanyMessages from 'components/company/messages/Message'
import CompanyFavorites from 'components/company/favorites/Favorite'
import CompanyStats from 'components/company/stats/Stats'
import CompanySettings from 'components/company/settings/Settings'
import CompanyNewContest from 'components/company/contest/NewContest'

Vue.use(Router)

export default new Router({
  routes: [
    ...generateRoutesFromMenu(menuModule.state.items),
    // {path: '*', redirect: { name: getDefaultRoute(menuModule.state.items).name }},
    {path: '/', component: landing, name: 'landing'},
    {path: '/auth/company/login', component: CompanyLogin, name: 'companylogin'},
    {path: '/auth/company/signup', component: CompanySignup, name: 'companysignup'},
    {path: '/auth/student/login', component: StudentLogin, name: 'studentlogin'},
    {path: '/auth/student/signup', component: StudentSignup, name: 'studentsignup'},
    {path: '/student/projects/new', component: NewProject, name: 'newproject'},
    // Company things
    {path: '/company/newsfeed', component: CompanyNewsfeed, name: 'Company Newsfeed'},
    {path: '/company/contests', component: CompanyContest, name: 'Company Contests'},
    {path: '/company/projects', component: CompanyProjects, name: 'Company Projects'},
    {path: '/company/awards', component: CompanyAwards, name: 'Company Awards'},
    {path: '/company/messages', component: CompanyMessages, name: 'Company Messages'},
    {path: '/company/favorites', component: CompanyFavorites, name: 'Company Favorites'},
    {path: '/company/stats', component: CompanyStats, name: 'Company Stats'},
    {path: '/company/settings', component: CompanySettings, name: 'Company Settings'},
    {path: '/company/projects/new', component: CompanyNewContest, name: 'Company new contest'}
  ],
  mode: 'history'
})

function generateRoutesFromMenu (menu = [], routes = []) {
  for (let i = 0, l = menu.length; i < l; i++) {
    let item = menu[i]
    if (item.path) {
      routes.push(item)
    }
    if (item.children) {
      generateRoutesFromMenu(item.children, routes)
    }
  }
  return routes
}

// function getDefaultRoute (menu = []) {
//   let defaultRoute

//   menu.forEach((item) => {
//     if (item.meta.default) {
//       defaultRoute = item
//     } else if (item.children) {
//       let defaultChild = item.children.find((i) => i.meta.default)
//       defaultRoute = defaultChild || defaultRoute
//     }
//   })

//   return defaultRoute
// }
