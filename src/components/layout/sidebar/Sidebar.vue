<template>
  <aside class="sidebar">
    <vuestic-scrollbar>
      <ul class="sidebar-menu">
        <li v-show="isStudent()" v-for="(item, index) in menuItems" :key="item.name">
          <router-link
            class="sidebar-link"
            :to="item.path"
            :target="item.meta.newWindow ? '_blank' : '_self'"
            @click="toggleMenuItem(item)"
            v-if="item.path">
            <i class="sidebar-menu-item-icon" v-bind:class="item.meta.iconClass"></i>
            {{item.meta.title | translate}}
          </router-link>
          <a href="#"
             @click.prevent="toggleMenuItem(item)"
             class="sidebar-link"
             v-bind:class="{expanded: item.meta.expanded}"
             v-else>
            <i class="sidebar-menu-item-icon" v-bind:class="item.meta.iconClass"></i>
            {{item.meta.title | translate}}
            <i class="expand-icon fa fa-angle-down"></i>
          </a>
          <expanding>
            <ul class="sidebar-submenu in" v-show="item.meta.expanded">
              <li v-for="childItem in item.children" :key="childItem.name">
                <router-link
                  class="sidebar-link sidebar-submenu-link"
                  :to="childItem.path"
                  :target="childItem.meta.newWindow ? '_blank' : '_self'">
                  {{childItem.meta.title | translate}}
                </router-link>
              </li>
            </ul>
          </expanding>
        </li>
        <li v-show="isCompany()" v-for="(item, index) in companyMenuItems" :key="item.name">
          <router-link
            class="sidebar-link"
            :to="item.path"
            :target="item.meta.newWindow ? '_blank' : '_self'"
            @click="toggleMenuItem(item)"
            v-if="item.path">
            <i class="sidebar-menu-item-icon" v-bind:class="item.meta.iconClass"></i>
            {{item.meta.title | translate}}
          </router-link>
          <a href="#"
             @click.prevent="toggleMenuItem(item)"
             class="sidebar-link"
             v-bind:class="{expanded: item.meta.expanded}"
             v-else>
            <i class="sidebar-menu-item-icon" v-bind:class="item.meta.iconClass"></i>
            {{item.meta.title | translate}}
            <i class="expand-icon fa fa-angle-down"></i>
          </a>
          <expanding>
            <ul class="sidebar-submenu in" v-show="item.meta.expanded">
              <li v-for="childItem in item.children" :key="childItem.name">
                <router-link
                  class="sidebar-link sidebar-submenu-link"
                  :to="childItem.path"
                  :target="childItem.meta.newWindow ? '_blank' : '_self'">
                  {{childItem.meta.title | translate}}
                </router-link>
              </li>
            </ul>
          </expanding>
        </li>
      </ul>
    </vuestic-scrollbar>

  </aside>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Expanding from 'vue-bulma-expanding/src/Expanding'
  export default {
    name: 'sidebar',

    components: {
      Expanding
    },
    methods: {
      ...mapActions({
        expand: 'toggleExpandMenuItem'
      }),
      toggleMenuItem (item) {
        if (item.children) {
          this.expand({   // TODO: check default prop
            menuItem: item,
            expand: !item.meta.expanded
          })
        }
      },
      isCompany () {
        return this.$route.path.match('company')
      },
      isStudent () {
        return this.$route.path.match('student')
      }
    },
    computed: {
      ...mapGetters({
        'menuItems': 'menuItems'
      })
    },
    watch: {
      $route (route) {
        let parent = _findMatchingParentMenuItem.call(this, route.name) || {}
        this.menuItems.forEach((item) => {
          this.expand({
            menuItem: item,
            expand: parent.name === item.name
          })
        })
      }
    },
    data () {
      return {
        show: false,
        companyMenuItems: [
          {
            name: 'Company Newsfeed',
            path: '/company/newsfeed',
            component: 'company/newsfeed/Newsfeed',
            meta: {
              expanded: false,
              title: 'menu.newsfeed',
              iconClass: 'fa fa-newspaper-o'
            }
          },
          {
            name: 'Company Contests',
            path: '/company/contests',
            component: 'company/contest/Contest',
            meta: {
              expanded: false,
              title: 'menu.contests.parent',
              iconClass: 'fa fa-flag'
            }
          },
          {
            name: 'Company Projects',
            path: '/company/projects',
            component: 'company/projects/Project',
            meta: {
              expanded: false,
              title: 'menu.projects.parent',
              iconClass: 'fa fa-rocket'
            }
          },
          {
            name: 'Company Awards',
            path: '/company/awards',
            component: 'company/awards/Award',
            meta: {
              expanded: false,
              title: 'company.awards',
              iconClass: 'fa fa-trophy'
            }
          },
          {
            name: 'Company Messages',
            path: '/company/messages',
            component: 'company/messages/Message',
            meta: {
              expanded: false,
              title: 'company.messages',
              iconClass: 'fa fa-paper-plane'
            }
          },
          {
            name: 'Company Favorites',
            path: '/company/favorites',
            component: 'company/favorites/Favorite',
            meta: {
              expanded: false,
              title: 'company.favorites',
              iconClass: 'fa fa-heart'
            }
          },
          {
            name: 'Company Stats',
            path: '/company/stats',
            component: 'company/stats/Stats',
            meta: {
              expanded: false,
              title: 'menu.stats',
              iconClass: 'fa fa-pie-chart'
            }
          },
          {
            name: 'Company Settings',
            path: '/company/settings',
            component: 'company/settings/Settings',
            meta: {
              expanded: false,
              title: 'menu.settings',
              iconClass: 'fa fa-gear'
            }
          }
        ]
      }
    }
  }

  function _findMatchingParentMenuItem (itemName) {
    let parentItem

    this.menuItems.forEach((item) => {
      parentItem = (item.children && item.children.find((child) => child.name === itemName)) ? item : parentItem
    })

    return parentItem
  }
</script>

<style lang="scss">
@import "../../../sass/_variables.scss";
@import "../../../../node_modules/bootstrap/scss/mixins/breakpoints";
@import "../../../../node_modules/bootstrap/scss/functions";
@import "../../../../node_modules/bootstrap/scss/variables";

.sidebar {
  @include media-breakpoint-down(md) {
    top: $sidebar-mobile-top;
    left: $sidebar-mobile-left;
    width: $sidebar-mobile-width;
    z-index: $sidebar-mobile-z-index;
  }

  height: $sidebar-viewport-height;
  .vuestic-scrollbar {
    height: 100%;
    .scrollbar-wrapper {
      box-shadow: $sidebar-box-shadow;
    }
    .scrollbar-content {
      background: $sidebar-bg;
    }
  }

  position: fixed;
  width: $sidebar-width;
  top: $sidebar-top;
  left: $sidebar-left;
  transition: all 0.2s ease;
  opacity: 1;

  .sidebar-hidden_without-animation & {
    transition: none;
  }

  .sidebar-hidden & {
    @include media-breakpoint-down(md) {
      top: $sidebar-hidden-top-mobile;
      opacity: 0;
      z-index: $sidebar-mobile-z-index;
      height: $sidebar-hidden-height-mobile;
    }
    top: $sidebar-hidden-top;
    opacity: 0;
    z-index: $min-z-index;
  }

  .sidebar-link {
    position: relative;
    height: $sidebar-link-height;
    padding-left: $sidebar-link-pl;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    text-decoration: none;

    &.router-link-active,
    &:hover {
      color: $white;
      background-color: $sidebar-link-active-bg;

      .sidebar-menu-item-icon,
      .expand-icon {
        color: $white;
      }
    }

    .expand-icon {
      position: absolute;
      right: $sidebar-arrow-right;
      top: calc(50% - #{$font-size-root}/2);
      font-weight: bold;
      transition: transform 0.3s ease;
    }

    &.expanded {
      .expand-icon {
        transform: rotate(180deg);
      }
    }

    .sidebar-menu-item-icon {
      font-size: $sidebar-menu-item-icon-size;
      color: $vue-green;
      margin-right: 14px;

      &.fa-dashboard {
        /* Temp fix */
        position: relative;
        top: -2px;
      }
    }
  }

  .sidebar-submenu-link {
    height: $sidebar-submenu-link-height;
  }

  .sidebar-menu,
  .sidebar-submenu {
    list-style: none;
    padding-left: 0;

    li {
      display: block;
      padding-left: 0;
    }
  }

  .sidebar-submenu {
    .sidebar-link {
      padding-left: $sidebar-submenu-link-pl;
      font-size: $font-size-smaller;
    }
  }

  .sidebar-menu {
    max-height: 100%;
    margin-bottom: 0;
  }

  .expand-icon {
    color: $vue-green;
  }

  a {
    color: $white;
    text-decoration: none;
  }
}
</style>
