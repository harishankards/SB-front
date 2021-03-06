import Vue from 'vue'
import Router from 'vue-router'

import menuModule from 'vuex-store/modules/menu'

import landing from 'components/landing/Landing'
import CompanyLogin from 'components/auth/login/CompanyLogin'
import CompanySignup from 'components/auth/signup/CompanySignup'
import StudentLogin from 'components/auth/login/StudentLogin'
import StudentSignup from 'components/auth/signup/StudentSignup'
import StudentProfile from 'components/profile/Profile'

import NewProject from 'components/projects/NewProject'
import EditProject from 'components/projects/EditProject'
import SeparateStudentProjectStudent from 'components/projects/Separate'
import SeparateCompanyProjectStudent from 'components/projects/SeparateCompanyProject'
import SeparateContestCompany from 'components/company/contest/Separate'
import SeparateAwardCompany from 'components/company/awards/Separate'
import SeparateAwardStudent from 'components/awards/Separate'

import SeparateStudentContest from 'components/contests/Separate'
import SeparateStudentProjectCompany from 'components/company/projects/Separate'
import SeparateCompanyProjectCompany from 'components/company/projects/SeparateCompanyProject'

import CompanyNewsfeed from 'components/company/newsfeed/Newsfeed'
import CompanyContest from 'components/company/contest/Contest'
import CompanyProjects from 'components/company/projects/Project'
import CompanyProjectNew from 'components/company/projects/NewProject'
import CompanyProjectEdit from 'components/company/projects/EditProject'
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
import PostSignupCompany from 'components/company/profile/PostSignup'
import StudentNotification from 'components/profile/Notifications'
import CompanyNotification from 'components/company/profile/Notifications'
import Upload from 'components/projects/Upload'
import Unverified from '../components/unverified/index.vue'
import Changelog from 'components/public/Changelog'

Vue.use(Router)

export default new Router({
  routes: [
    ...generateRoutesFromMenu(menuModule.state.items),
    // {path: '*', redirect: { name: getDefaultRoute(menuModule.state.items).name }},
    {
      path: '/',
      component: landing,
      name: 'landing'
    },
    {
      path: '/changelog',
      component: Changelog,
      name: 'changelog'
    },
    {
      path: '/upload',
      component: Upload,
      name: 'upload'
    },
    {
      path: '/auth/company/login',
      component: CompanyLogin,
      name: 'companylogin'
    },
    {
      path: '/auth/company/signup',
      component: CompanySignup,
      name: 'companysignup'
    },
    {
      path: '/auth/student/login',
      component: StudentLogin,
      name: 'studentlogin'
    },
    {
      path: '/auth/student/signup',
      component: StudentSignup,
      name: 'studentsignup'
    },
    {
      path: '/unverified',
      component: Unverified,
      name: 'unverified',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/student/projects/new',
      component: NewProject,
      name: 'newproject',
      meta: {
        requiresAuth: true,
        accountAuth: true
      }
    },
    {
      path: '/student/projects/edit/:id',
      component: EditProject,
      name: 'editproject',
      meta: {
        requiresAuth: true,
        accountAuth: true
      }
    },
    {
      path: '/student/postsignup',
      component: PostSignup,
      name: 'postsignup',
      meta: {
        requiresAuth: true,
        accountAuth: true
      }
    },
    {
      path: '/student/notifications',
      component: StudentNotification,
      name: 'Student Notifications',
      meta: {
        requiresAuth: true,
        accountAuth: true
      }
    },
    {
      path: '/student/profile',
      component: StudentProfile,
      name: 'studentprofile',
      meta: {
        requiresAuth: true,
        accountAuth: true
      }
    },
    // Project
    {
      path: '/company/project/:id',
      component: SeparateStudentProjectCompany,
      name: 'SeparateStudentProjectViewCompany',
      meta: {
        accountAuth: true,
        requiresAuth: true
      }
    },
    {
      path: '/company/companyproject/:id',
      component: SeparateCompanyProjectCompany,
      name: 'SeparateCompanyProjectViewCompany',
      meta: {
        accountAuth: true,
        requiresAuth: true
      }
    },
    {
      path: '/student/project/:id',
      component: SeparateStudentProjectStudent,
      name: 'SeparateStudentProjectViewStudent',
      meta: {
        requiresAuth: true,
        accountAuth: true
      }
    },
    {
      path: '/student/companyproject/:id',
      component: SeparateCompanyProjectStudent,
      name: 'SeparateCompanyProjectViewStudent',
      meta: {
        requiresAuth: true,
        accountAuth: true
      }
    },
    // Contest
    {
      path: '/company/contest/:id',
      component: SeparateContestCompany,
      name: 'SeparateContestViewCompany',
      meta: {
        accountAuth: true,
        requiresAuth: true
      }
    },
    {
      path: '/student/contest/:id',
      component: SeparateStudentContest,
      name: 'SeparateContestViewStudent',
      meta: {
        requiresAuth: true,
        accountAuth: true
      }
    },
    // Award
    {
      path: '/company/award/:id',
      component: SeparateAwardCompany,
      name: 'SeparateAwardViewCompany',
      meta: {
        accountAuth: true,
        requiresAuth: true
      }
    },
    {
      path: '/student/award/:id',
      component: SeparateAwardStudent,
      name: 'SeparateAwardViewStudent',
      meta: {
        requiresAuth: true,
        accountAuth: true
      }
    },
    // Company things
    {
      path: '/company/newsfeed',
      component: CompanyNewsfeed,
      name: 'Company Newsfeed',
      meta: {
        accountAuth: true,
        requiresAuth: true
      }
    },
    {
      path: '/company/contests',
      component: CompanyContest,
      name: 'Company Contests',
      meta: {
        accountAuth: true,
        requiresAuth: true
      }
    },
    {
      path: '/company/projects',
      component: CompanyProjects,
      name: 'Company Project List',
      meta: {
        accountAuth: true,
        requiresAuth: true
      }
    },
    {
      path: '/company/projects/new',
      component: CompanyProjectNew,
      name: 'Company Project New',
      meta: {
        accountAuth: true,
        requiresAuth: true
      }
    },
    {
      path: '/company/projects/edit/:id',
      component: CompanyProjectEdit,
      name: 'Company Project Edit',
      meta: {
        accountAuth: true,
        requiresAuth: true
      }
    },
    {
      path: '/company/awards',
      component: CompanyAwards,
      name: 'Company Awards',
      meta: {
        accountAuth: true,
        requiresAuth: true
      }
    },
    {
      path: '/company/messages',
      component: CompanyMessages,
      name: 'Company Messages',
      meta: {
        accountAuth: true,
        requiresAuth: true
      }
    },
    {
      path: '/company/favorites',
      component: CompanyFavorites,
      name: 'Company Favorites',
      meta: {
        accountAuth: true,
        requiresAuth: true
      }
    },
    {
      path: '/company/stats',
      component: CompanyStats,
      name: 'Company Stats',
      meta: {
        accountAuth: true,
        requiresAuth: true
      }
    },
    {
      path: '/company/settings',
      component: CompanySettings,
      name: 'Company Settings',
      meta: {
        accountAuth: true,
        requiresAuth: true
      }
    },
    {
      path: '/company/contests/new',
      component: CompanyNewContest,
      name: 'Company new contest',
      meta: {
        accountAuth: true,
        requiresAuth: true
      }
    },
    {
      path: '/company/contests/edit/:id',
      component: CompanyEditContest,
      name: 'Company edit contest',
      meta: {
        accountAuth: true,
        requiresAuth: true
      }
    },
    {
      path: '/company/awards/new',
      component: CompanyNewAward,
      name: 'Company new award',
      meta: {
        accountAuth: true,
        requiresAuth: true
      }
    },
    {
      path: '/company/awards/edit/:id',
      component: CompanyEditAward,
      name: 'Company edit award',
      meta: {
        accountAuth: true,
        requiresAuth: true
      }
    },
    {
      path: '/company/notifications',
      component: CompanyNotification,
      name: 'Company Notifications',
      meta: {
        accountAuth: true,
        requiresAuth: true
      }
    },
    {
      path: '/company/postsignup',
      component: PostSignupCompany,
      name: 'postsignupcompany',
      meta: {
        accountAuth: true,
        requiresAuth: true
      }
    },
    {
      path: '*',
      component: NotFound,
      name: '404'
    }
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
