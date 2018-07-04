<template>
  <div class="dashboard">
    <div class="col-md-8 col-sm-12 side"> 
      <vuestic-widget class="info-widget sidenav1">
        <div class="ad-header">
          <span class="ad-header-title"> Hot topic around internet </span>
          <i class="fa fa-fire ad-header-icon"></i>
        </div>
        <div class="ad-content">
          <div class="ad-title"><a href="#">70% companies in Chennai are using Freshsales as their Customer Relationship software</a></div>
        </div>
      </vuestic-widget>
      <CompanyLivefeeds></CompanyLivefeeds>
    </div>    
    <newsfeed-info-widgets></newsfeed-info-widgets>
    <div class="row">
      <div class="col-md-8 col-sm-12">
        <vuestic-widget class="" v-for="project in projectsData" :key="project.id">
        <div id="projects-name-div">
          <span class="projects-name"><strong><a href="" @click.prevent="viewProject(project._id)">{{project.title}}</a> </strong></span><br>
          <span class="projects-time"><timeago :since="project.createdAt" :auto-update="60"></timeago></span>
        </div>
          <div>
            <swiper :options="swiperOption" class="sliderStyle">
              <swiper-slide v-for="file in project.files" :key="file.id">
                <img :src="file.filePath">
              </swiper-slide>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
          </div>
          <div id="projects-content-div">
            <span id="projects-description">{{project.abstract}}</span>
            <!-- <a href="" class="viewMoreBtn" @click="viewProject(project._id)"> Read More <i class="fa fa-arrow-right"></i> </a>           -->
          </div>
          <div id="tagDiv">
            <strong>Tags:</strong><span v-for="tag in project.tags" :key="tag.id" class="tagNames">{{tag.name}}</span>
          </div>
          <hr>
          <div class="userInteractionDiv">
            <i id="spacingStyle" class="fa fa-thumbs-up">{{project.upvotes.length}}</i>{{upvoteContent(project.upvotes.length)}}
          </div>
        </vuestic-widget>
      </div>
    </div>


  </div>
</template>

<script>
  import VueDisqus from 'vue-disqus/VueDisqus.vue'
  import NewsfeedInfoWidgets from './NewsfeedInfoWidgets'
  import CompanyLivefeeds from '../rightsidebar/CompanyLivefeeds'

  export default {
    name: 'dashboard',
    components: {
      NewsfeedInfoWidgets,
      VueDisqus,
      CompanyLivefeeds
    },
    data () {
      return {
        companyData: '',
        projectsData: '',
        swiperOption: {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    },
    methods: {
      giveInitial: function (post) {
        let initial = post.name.charAt(0)
        return initial
      },
      viewProject: function (projectId) {
        this.$router.push('/company/project/' + projectId)
      },
      upvoteContent: function (len) {
        if (len < 2) {
          return 'upvote'
        } else {
          return 'upvotes'
        }
      }
    },
    created () {
      const email = this.$ls.get('email')
      const token = this.$ls.get('token')
      const self = this
      const header = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
      this.$http.get('/companies/get?email=' + email, header)
      .then((companyData) => {
        console.log('company Data', companyData.data)
        self.companyData = companyData.data
        self.$http.get('/projects/all', header)
        .then(function (projectsData) {
          console.log('projects data', projectsData.data.projects)
          self.projectsData = projectsData.data.projects
        })
        .catch(function (projectsDataErr) {
          console.log('projects data err', projectsDataErr)
        })
      }).catch((companyErr) => {
        console.log('company err', companyErr)
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";
  .newsfeed-page{
    padding-left: 0rem !important;
  }
  .feed-card-time{
    margin-top: 3px;
    color: #a29e9e;
  }
  #feed-card-image{
    display: inline-block;
    border: 1px solid #a29e9e;
    border-radius: 50%;
    background: #CA3C25;
    font-size: 1.5rem;
    height: 3rem;
    width: 3rem;
    padding-left: 0.95rem;
    padding-top: 0.3rem;
    color: #e8dfdf;
    vertical-align: top;
  }
  .sidenav1{
    // position: fixed;
    margin-left: 720px;
    width: 40%;
    // margin-top: -30% !important;
    height: 161px;
  }
  .side{
    position: fixed;
    margin-left: -2%;
  }
 @media screen and (max-width: 650px){
   .sidenav1{
     position: relative !important;
     margin-left: 0px !important;
     width: 100% !important;
     top: 2.5% !important;
    }
}
  @media screen and (max-width: 650px){
    .side{
      position: relative !important;
      margin-left: 0px !important;
      width: auto !important;
      top: 10% !important;
    }
  }
  #feed-card-user-name-div{
    display: inline-block;
    margin-left: 0.4rem;
  }

  #post-content-div{
    margin-top: 0.5rem;
  }

  #tagDiv {
    display: inline-block;
    margin-top: 1rem;
  }
  .tagNames {
    padding: 0.2rem 0.5rem;
    margin-left: 0.5rem;
    background: $tagcolor;
    color: white;
    border-radius: 5%;
  }
  .projects-time{
    margin-top: 3px;
    color: #a29e9e;
  }
  
  #projects-name-div{
    display: inline-block;
    // margin-left: 0.4rem;
  }

  .projects-name{
    font-size: 1.3rem;
  }

  #projects-content-div{
    margin-top: 0.5rem;
  }

  .viewMoreBtn {
    display: block;
  }
  #spacingStyle{
    letter-spacing: 5px;
  } 
  .ad-header-title{
    display: inline-block;
    font-size: 1em; 
  }
  .ad-header-icon{
    font-size: 2em;
    float: right;
  }

  .ad-header{
    padding-bottom: 2%;
  }

  .ad-title{
    font-size: 1.1em;
  }
  .info-widget-inner {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;

    &.has-chart {
      justify-content: space-between;
    }

    .stats {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }

  .stats-number {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 2.625rem;
    margin-bottom: 0.5rem;

    .stats-icon {
      font-size: 1.5625rem;
      position: absolute;
      top: 0.625rem;
      left: -1.25rem;

      &.icon-wide {
        left: -1.875rem;
      }
    }
  }
  .sliderStyle{
    margin-bottom: 3%;
    margin-top: 3%;
    height: 300px;
    width: 100%;
    z-index: 1;
  }
</style>
