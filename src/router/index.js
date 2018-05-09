import Vue from 'vue'
import Router from 'vue-router'

import menuModule from 'vuex-store/modules/menu'

import landing from 'components/landing/Landing'
import CompanyLogin from 'components/auth/login/CompanyLogin'
import CompanySignup from 'components/auth/signup/CompanySignup'
import StudentLogin from 'components/auth/login/StudentLogin'
import StudentSignup from 'components/auth/signup/StudentSignup'

import NewProject from 'components/projects/NewProject'
import EditProject from 'components/projects/EditProject'
import SeparateProjectStudent from 'components/projects/Separate'
import SeparateContestCompany from 'components/company/contest/Separate'
import SeparateAwardCompany from 'components/company/awards/Separate'
import SeparateAwardStudent from 'components/awards/Separate'

import SeparateStudentContest from 'components/contests/Separate'
import SeparateProjectCompany from 'components/company/projects/Separate'

import CompanyNewsfeed from 'components/company/newsfeed/Newsfeed'
import CompanyContest from 'components/company/contest/Contest'
import CompanyProjects from 'components/company/projects/Project'
import CompanyAwards from 'components/company/awards/Award'
import CompanyMessages from 'components/company/messages/Message'
import CompanyFavorites from 'components/company/favorites/Favorite'
import CompanyStats from 'components/company/stats/Stats'
import CompanySettings from 'components/company/settings/Settings'
import CompanyNewContest from 'components/company/contest/NewContest'
import CompanyEditContest from 'components/company/contest/EditContest'
import CompanyNewAward from 'components/company/awards/NewAward'
import CompanyEditAward from 'components/company/awards/EditAward'
import NotFound from 'components/404/NotFound'
import PostSignup from 'components/profile/PostSignup'

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
    {path: '/student/projects/new', component: NewProject, name: 'newproject', meta: { requiresAuth: true }},
    {path: '/student/projects/edit/:id', component: EditProject, name: 'editproject', meta: { requiresAuth: true }},
    {path: '/student/postsignup', component: PostSignup, name: 'postsignup', meta: { requiresAuth: true }},
    // Project
    {path: '/company/project/:id', component: SeparateProjectCompany, name: 'SeparateProjectViewCompany', meta: { requiresAuth: true }},
    {path: '/student/project/:id', component: SeparateProjectStudent, name: 'SeparateProjectViewStudent', meta: { requiresAuth: true }},
    // Contest
    {path: '/company/contest/:id', component: SeparateContestCompany, name: 'SeparateContestViewCompany', meta: { requiresAuth: true }},
    {path: '/student/contest/:id', component: SeparateStudentContest, name: 'SeparateContestViewStudent', meta: { requiresAuth: true }},
    // Award
    {path: '/company/award/:id', component: SeparateAwardCompany, name: 'SeparateAwardViewCompany', meta: { requiresAuth: true }},
    {path: '/student/award/:id', component: SeparateAwardStudent, name: 'SeparateAwardViewStudent', meta: { requiresAuth: true }},
    // Company things
    {path: '/company/newsfeed', component: CompanyNewsfeed, name: 'Company Newsfeed', meta: { requiresAuth: true }},
    {path: '/company/contests', component: CompanyContest, name: 'Company Contests', meta: { requiresAuth: true }},
    {path: '/company/projects', component: CompanyProjects, name: 'Company Projects', meta: { requiresAuth: true }},
    {path: '/company/awards', component: CompanyAwards, name: 'Company Awards', meta: { requiresAuth: true }},
    {path: '/company/messages', component: CompanyMessages, name: 'Company Messages', meta: { requiresAuth: true }},
    {path: '/company/favorites', component: CompanyFavorites, name: 'Company Favorites', meta: { requiresAuth: true }},
    {path: '/company/stats', component: CompanyStats, name: 'Company Stats', meta: { requiresAuth: true }},
    {path: '/company/settings', component: CompanySettings, name: 'Company Settings', meta: { requiresAuth: true }},
    {path: '/company/contests/new', component: CompanyNewContest, name: 'Company new contest', meta: { requiresAuth: true }},
    {path: '/company/contests/edit/:id', component: CompanyEditContest, name: 'Company edit contest', meta: { requiresAuth: true }},
    {path: '/company/awards/new', component: CompanyNewAward, name: 'Company new award', meta: { requiresAuth: true }},
    {path: '/company/awards/edit/:id', component: CompanyEditAward, name: 'Company edit award', meta: { requiresAuth: true }},
    {path: '*', component: NotFound, name: '404'}
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
