<template>
  <div class="dashboard">
    <div class="col-md-8 col-sm-12">
    <newsfeed-info-widgets></newsfeed-info-widgets></div>
    <vuestic-switch class="col-md-4 switch" v-model="isProjects">
      <span slot="trueTitle">Projects</span>
      <span slot="falseTitle">Contests</span>
    </vuestic-switch>
    <div class="row">
      <div class="col-md-8 col-sm-12">
        <vuestic-widget class="" v-for="project in companyprojectsArray" :key="project.id" v-show="showProjects">
          <div>
            <swiper :options="swiperOption" class="sliderStyle">
              <swiper-slide> <img id="imgStyle" src="https://www.register.com/imgs/productDetail/custom-website-design-v2.jpg"></swiper-slide>
              <swiper-slide><img id="imgStyle" src="https://www.register.com/imgs/productDetail/custom-website-design-v2.jpg"></swiper-slide>
              <swiper-slide><img id="imgStyle" src="https://www.register.com/imgs/productDetail/custom-website-design-v2.jpg"></swiper-slide>
              <swiper-slide><img id="imgStyle" src="https://www.register.com/imgs/productDetail/custom-website-design-v2.jpg"></swiper-slide>
              <swiper-slide><img id="imgStyle" src="https://www.register.com/imgs/productDetail/custom-website-design-v2.jpg"></swiper-slide>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
            <div id="projects-name-div">
              <span class="projects-name"><strong><a href="" @click.prevent="viewCompanyProject(project._id)">{{project.title}}</a> </strong></span><br>
              <span class="projects-time"><timeago :since="project.createdAt" :auto-update="60"></timeago></span>
            </div>
          </div>
          <div id="projects-content-div">
            <!-- <span id="projects-description"><strong>Posted by:</strong>  {{project.author}}</span> -->
            <span id="projects-description">{{project.abstract}}</span>
            <!-- <a href="" class="viewMoreBtn" @click="viewProject(project._id)"> Read More <i class="fa fa-arrow-right"></i> </a>           -->
          </div>
          <div id="tagDiv">
            <strong>Tags:</strong><span v-for="tag in project.tags" :key="tag.id" class="tagNames">{{tag.name}}</span>
          </div>
          <hr>
          <div v-if="project.upvotes" class="userInteractionDiv">
            <i id="spacingStyle" class="fa fa-thumbs-up">{{project.upvotes.length}}</i>{{upvoteContent(project.upvotes.length)}}
          </div>
        </vuestic-widget>
        <vuestic-widget class="" v-for="project in projectsData" :key="project.id" v-show="showProjects">
          <div>
            
        <swiper :options="swiperOption" class="sliderStyle">
          <swiper-slide> <img id="imgStyle" src="https://www.register.com/imgs/productDetail/custom-website-design-v2.jpg"></swiper-slide>
          <swiper-slide><img id="imgStyle" src="https://www.register.com/imgs/productDetail/custom-website-design-v2.jpg"></swiper-slide>
          <swiper-slide><img id="imgStyle" src="https://www.register.com/imgs/productDetail/custom-website-design-v2.jpg"></swiper-slide>
          <swiper-slide><img id="imgStyle" src="https://www.register.com/imgs/productDetail/custom-website-design-v2.jpg"></swiper-slide>
          <swiper-slide><img id="imgStyle" src="https://www.register.com/imgs/productDetail/custom-website-design-v2.jpg"></swiper-slide>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
      </swiper>

            <div id="projects-name-div">
              <span class="projects-name"><strong><a href="" @click.prevent="viewProject(project._id)">{{project.title}}</a> </strong></span><br>
              <span class="projects-time"><timeago :since="project.createdAt" :auto-update="60"></timeago></span>
            </div>
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
        
        <vuestic-widget class="" v-for="contest in contestsData" :key="contest.id" v-show="showContests">
          <div>
            
            <div id="projects-name-div">
              <span class="projects-name"><strong><a href="#" @click.prevent="viewContest(contest._id)">{{contest.title}}</a> </strong></span><br>
              <span class="projects-time"><timeago :since="contest.createdAt" :auto-update="60"></timeago></span>
            </div>
          </div>
          <div id="projects-content-div">
            <p id="projects-description">{{contest.about}}</p>
            <p><strong>Starts on:</strong>  {{contest.date.start | moment("dddd, MMMM Do YYYY, h:mm a")}}</p>
            <p><strong>Ends on: </strong> {{contest.date.end | moment("dddd, MMMM Do YYYY, h:mm a") }}</p>            
          </div>
          <!-- <div><a href="" class="viewMoreBtn" @click="viewContest(contest._id)"> Read More <i class="fa fa-arrow-right"></i> </a></div> -->
          <div id="tagDiv">
            <strong>Tags:</strong><span v-for="tag in contest.tags" :key="tag.id" class="tagNames">{{tag.name}}</span>
          </div>
        </vuestic-widget>
      </div> 
      <div class="col-md-8 col-sm-12">
       
         <vuestic-widget class="info-widget sidenav1">
        <div class="ad-header">
          <span class="ad-header-title"> Hot topic around internet </span>
          <i class="fa fa-fire ad-header-icon"></i>
        </div>
        <div class="ad-content">
          <div class="ad-title"><a href="#">Freshworks launches a new product for students. Check it out now!</a></div>
        </div>
      </vuestic-widget>
      
        <Livefeeds></Livefeeds>
     
      </div>
    </div>


  </div>
</template>

<script>
  import NewsfeedInfoWidgets from './NewsfeedInfoWidgets'
  import Livefeeds from '../rightsidebar/Livefeeds'

  export default {
    name: 'dashboard',
    components: {
      NewsfeedInfoWidgets,
      Livefeeds
    },
    data () {
      return {
        projectsData: '',
        contestsData: '',
        studentData: '',
        companyprojectsArray: '',
        isProjects: true,
        showProjects: true,
        showContests: false,
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
        this.$router.push('/student/project/' + projectId)
      },
      viewCompanyProject: function (projectId) {
        this.$router.push('/student/companyproject/' + projectId)
      },
      viewContest: function (contestId) {
        this.$router.push('/student/contest/' + contestId)
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
      this.$http.get('/students/get?email=' + email, header)
      .then((studentData) => {
        console.log('student Data', studentData.data)
        self.studentData = studentData.data
        self.$http.get('/projects/all', header)
        .then(function (projectsData) {
          console.log('projects data', projectsData.data.projects)
          self.projectsData = projectsData.data.projects
        })
        .catch(function (projectsDataErr) {
          console.log('projects data err', projectsDataErr)
        })
        self.$http.get('/contests/all', header)
        .then(function (contestsData) {
          console.log('contests data', contestsData.data.contests)
          self.contestsData = contestsData.data.contests
        })
        .catch(function (contestsDataErr) {
          console.log('contests data err', contestsDataErr)
        })
        self.$http.get('/companyprojects/all', header)
        .then(function (companyprojectsData) {
          console.log('company projects data', companyprojectsData.data.projects)
          self.companyprojectsArray = companyprojectsData.data.projects
        })
        .catch(function (companyprojectsErr) {
          console.log('companyprojects data err', companyprojectsErr)
        })
      }).catch((studentErr) => {
        console.log('student err', studentErr)
      })
    },
    updated () {
      if (this.isProjects) {
        this.showContests = false
        this.showProjects = true
      } else {
        this.showProjects = false
        this.showContests = true
      }
    }
  }
</script>

<style lang="scss" scoped>
 
  @import "../../sass/_variables.scss";
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

  #feed-card-user-name-div{
    display: inline-block;
    margin-left: 0.4rem;
  }

  #post-content-div{
    margin-top: 0.5rem;
  }
   
  .switch {
    margin-bottom: 1rem;
  }
  .sidenav1{
    position: fixed;
    margin-left: 720px;
    width: 26%;
    top: 13.7%;
    height: 160px;
}
 @media screen and (max-width: 650px){
   .sidenav1{
     position: relative !important;
     margin-left: 0px !important;
     width: 100% !important;
     top: 2.5% !important;
    }
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
  
  .sliderStyle{
    margin-bottom: 3%;
    height: 300px;
    width: 100%;
    z-index: 1;
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
  .likebutton{
    color:#3385ff;
  }
  .btn-style{
    border: none;
    width: 100px;
    cursor: pointer;
    background: white;
    outline: none;
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
</style>
