<template>
  <nav class="navbar app-navbar navbar-toggleable-md">
    <div class="navbar-brand-container d-flex align-items-center justify-content-start">
      <a class="navbar-brand" href="#" @click.prevent='takeHome()'>
        <i class="i-vuestic"></i>
      </a>
    </div>

    <div class="row navbar-container">

      <!-- <div class="menu-icon-container d-flex align-items-center justify-content-center justify-content-lg-start col">
        <a class="menu-icon i-menu-expanded" href="#" @click.prevent="toggleSidebar(false)" v-if="sidebarOpened"></a>
        <a class="menu-icon i-menu-collapsed" href="#" @click.prevent="toggleSidebar(true)" v-else></a>
      </div> -->

      <div class="navbar-text offset-md-1 col-md-8 d-none d-lg-flex align-items-center justify-content-center">
        <!-- Student Burger -->
      </div>

      <div class="col nav-item dropdown navbar-dropdown d-flex align-items-center justify-content-center" v-dropdown>
        <a class="nav-link dropdown-toggle d-flex align-items-center justify-content" href="" @click.prevent="closeMenu">
          <span class="i-nav-notification" :class="{notify: hasUnread}"></span>
        </a>
        <div class="dropdown-menu">
          <div class="dropdown-menu-content">
            <a v-for="notification in notifications" :key="notification.id" class="dropdown-item divStyle" href="" @click.prevent="takeToNoti(notification)">
              <span class="ellipsis">{{notification.text}}</span>
            </a>
            <div class="dropdown-item plain-link-item divstyle" v-if="!hasUnread">
              <span class="dropdown-item2"> <i class="fa fa-bell-slash-o"></i> No new notifications!</span>
            </div>
            <div class="dropdown-item plain-link-item divstyle">
              <a class="plain-link" href="" @click.prevent="takeToNotiHome()">{{'notifications.all' | translate}}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col nav-item dropdown navbar-dropdown d-flex align-items-center justify-content-center" v-dropdown>
        <a class="nav-link dropdown-toggle d-flex align-items-center justify-content" href="" @click.prevent="closeMenu">
          <span class="avatar-container">
            <img src="https://goo.gl/KnVxVY" />
          </span>
        </a>
        <div class="dropdown-menu last">
          <div class="dropdown-menu-content">
            <div class="dropdown-item plain-link-item divstyle" @click.prevent="takeToProfile">
              <a class="plain-link" href="" >{{'user.profile' | translate}}</a>
            </div>
            <div class="dropdown-item plain-link-item divstyle"  @click.prevent="logout">
              <a class="plain-link" href="">{{'user.logout' | translate}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { eventBus } from '../../../main'

  export default {
    name: 'navbar',

    components: {},

    data () {
      return {
        notifications: [],
        hasUnread: false
      }
    },

    computed: {
      ...mapGetters([
        'sidebarOpened',
        'toggleWithoutAnimation'
      ])
    },

    methods: {
      ...mapActions([
        'closeMenu',
        'toggleSidebar',
        'isToggleWithoutAnimation'
      ]),
      logout () {
        console.log('logout clicked')
        this.$store.dispatch('logout')
        this.$router.push('/')
      },
      takeToProfile () {
        this.$router.push('/student/profile')
      },
      takeToNoti (notification) {
        console.log('notification clicked', notification)
        const email = this.$ls.get('email')
        const token = this.$ls.get('token')
        const self = this
        this.$http.get('/students/get?email=' + email, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        .then(function (studentData) {
          console.log('studentData', studentData.data[0])
          const student = studentData.data[0]
          student.notifications.map((notificationItem) => {
            console.log('notifications map')
            return new Promise((resolve, reject) => {
              if (notificationItem.link === notification.link) {
                notificationItem.read = true
                resolve()
              }
            })
            .then(() => {
              console.log('student details from notification', student, token)
              self.$http.put('/students/update', student, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
              })
              .then(function (notificationUpdated) {
                console.log('notification updated', notificationUpdated)
                if (notification.type === 'project') {
                  self.$router.push('/student/project/' + notification.link)
                } else if (notification.type === 'award') {
                  self.$router.push('/student/award/' + notification.link)
                } else if (notification.type === 'contest') {
                  self.$router.push('/student/contest/' + notification.link)
                } else if (notification.type === 'companyproject') {
                  self.$router.push('/student/companyproject/' + notification.link)
                }
              })
              .catch(function (notificationUpdateErr) {
                console.log('notification update err', notificationUpdateErr)
              })
            })
          })
        })
        .catch(function (studentDataErr) {
          console.log('studentDataErr', studentDataErr)
        })
      },
      takeHome () {
        this.$router.push('/student/newsfeed')
      },
      takeToNotiHome () {
        if (this.$route.path.match('company')) {
          this.$router.push('/company/notifications')
        } else if (this.$route.path.match('student')) {
          this.$router.push('/student/notifications')
        }
      }
    },
    created () {
      const self = this
      eventBus.$on('notificationData', (data) => {
        console.log('notifications data')
        const filteredNotifications = []
        self.notifications = filteredNotifications
        data.map((notification) => {
          if (notification.read === false) {
            filteredNotifications.push(notification)
            console.log('-------------filtered notifications', filteredNotifications)
            self.notifications = filteredNotifications.reverse().slice(0, 3)
          }
        })
        if (this.notifications.length === 0) {
          this.hasUnread = false
        } else {
          this.hasUnread = true
        }
      })
    }
  }
</script>

<style lang="scss">
  @import "../../../sass/_variables.scss";
  @import "../../../../node_modules/bootstrap/scss/mixins/breakpoints";
  @import "../../../../node_modules/bootstrap/scss/functions";
  @import "../../../../node_modules/bootstrap/scss/variables";

  .navbar.app-navbar {
    position: fixed; top: 0; width: 100%; z-index: 5;
    .navbar-container {
      width: 100%;
      height: 100%;
      margin: 0;
    }

    height: $top-nav-height;
    padding-left: $nav-padding-left;
    padding-right: $nav-padding-right;
    background-color: $top-nav-bg;

    .avatar-container {
      display: inline-block;
      width: 50px;
      height: 50px;
      background-color: white;
      border-radius: 50%;
      border: 2px solid $lighter-gray;
      overflow: hidden;

      img {
        height: 100%;
        width: 100%;
      }
    }

    .menu-icon-container {
      padding: 0;
      font-size: $font-size-base;
    }

    .navbar-brand-container {
      position: absolute;
      z-index: 3;
      height: 100%;
      left: $navbar-brand-container-left;
      top: 0;
    }

    .nav-item {
      padding: 0;
      height: 100%;
    }

    .dropdown.navbar-dropdown {
      .dropdown-toggle {
        padding: 0;
        &:after {
           display: none;
         }
      }

      &.show {
        @include media-breakpoint-up(lg) {
          .dropdown-menu {
            left: auto;
            right: 0;
          }
        }
        &:after {
           position: absolute;
           bottom: -$dropdown-show-b;
           right: calc(50% - 10px);
           width: 0;
           height: 0;
           display: block;
           content: '';
           border-left: 10px solid transparent;
           border-right: 10px solid transparent;
           border-bottom: 10px solid $darkest-gray;
         }
      }

      .dropdown-menu {
        margin-top: $dropdown-show-b;
        padding-top: 0;
        width: 100%;
      }


      .dropdown-item {
        height: $navbar-dd-item-height;
        cursor: pointer;
        font-size: $font-size-base;

        &:active, &:focus, &.active {
          outline: none;
        }

        &:hover {
          background-color: #fff;
        }

        &.plain-link-item {
          color: $brand-primary;

          &:hover, &:active, &:focus {
            background: $dropdown-background;
          }

          .plain-link {
            text-decoration: none;
          }
        }
      }
    }

    .notify {
      position: relative;

      &::after {
         content: '';
         position: absolute;
         right: -6px;
         top: -6px;
         background-color: $brand-primary;
         height: 12px;
         width: 12px;
         border-radius: 50%;
       }
    }

    .i-nav-notification.notify::after {
      right: -4px;
      top: 0;
    }

    @include media-breakpoint-down(md) {
      height: $top-mobile-nav-height;
      padding: $nav-mobile-pt $nav-mobile-padding-h $nav-mobile-pb $nav-mobile-padding-h;

      .navbar-brand-container {
        width: $nav-mobile-brand-width;
        top: $nav-mobile-brand-top;
        left: $nav-mobile-brand-left;
        height: auto;
        .navbar-brand {
          height: $font-size-smaller;
          padding: 0;
          font-size: $font-size-smaller;
        }
      }

      .dropdown.navbar-dropdown {
        &.show {
          display: flex;
          &:after {
            bottom: -$dropdown-mobile-show-b;
            z-index: 2;
          }
          .dropdown-menu {
            margin-top: $dropdown-mobile-show-b;
            left: auto;
            &.last {
              right: 0;
            }
          }
        }
      }
    }
  }
  .dropdown-item2 {
    color: #fff;
    // padding: 3rem;
    i {
      margin-right: 0.5rem;
    }
  }
  .divstyle:hover{
    background-color: black !important;
  }
</style>
