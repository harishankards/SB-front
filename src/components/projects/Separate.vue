<template>
	<div>
    <button class="btn btn-danger backbtn" @click="$router.go(-1)">
        <i class="fa fa-caret-left"></i>
        Back
    </button>
    <div class="noProjects" v-show="!showProject">
      <h4>Project Not found</h4>
      <img class="col-md-8" src="../../assets/vendor/leaflet/404.png" alt="">
    </div>
    <vuestic-widget v-show="showProject" class="col-md-9" :headerText="this.projectData.title">
      <swiper :options="swiperOption" class="sliderStyle">
          <swiper-slide v-for="file in projectData.files" :key="file.id"><img :src="file.filePath" class="imageStyle"></swiper-slide>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      <p><strong>Published </strong><br><timeago :since="this.projectData.createdAt" :auto-update="60"></timeago></p>
      <p><strong> Abstract</strong><br>{{this.projectData.abstract}}</p>
      <p><strong> Description</strong><br><span v-html="this.projectData.description"></span></p>
      <p><strong> Author</strong><br> {{this.authorData.email}}</p>
      <strong>Tags:</strong><span v-for="tag in projectData.tags" :key="tag.id" class="tagNames">{{tag.name}}</span>
      <hr>
      <div>
        <div v-if="this.projectData.upvotes" class="comment-section">
        <button type="button" class="btn-style" @click="togglelike">
          <i class="fa fa-thumbs-up" :class="{likebutton: liked}"></i> {{this.projectData.upvotes.length}} {{this.upvoteContent}} </button>
        </div>
        <div class="comment-section" style="cursor:pointer;">
          <button type="button" class="btn-style"  @click="showShareDiv()">         
          <span class="glyphicon glyphicon-share-alt"></span> Share </button> </div>
           <social-sharing :url="url" v-if="shareIcons"
                    :title="projectData.title"
                    description="Student Burger is a progressive social network for building interfaces between the Students and the Companies"
                    :quote="projectData.abstract"
                    hashtags="studentburger,socialnetwork,student,company"
                    twitter-user="_studentburger"
                    inline-template>
              <div id="icon-style">
                <network network="email">
                    <i class="fa fa-envelope" style="color:red;cursor:pointer;"></i> Email
                </network>
                <network style="padding-left:12px;" network="facebook">
                  <i class="fa fa-facebook" style="color:#3B5998;cursor:pointer;"></i> Facebook
                </network>
                <network network="googleplus" style="padding-left:12px;">
                  <i class="fa fa-google-plus" style="color:#DB4437;cursor:pointer;"></i> Google +
                </network>
                <network network="linkedin" style="padding-left:12px;">
                  <i class="fa fa-linkedin" style="color:#0077B5;cursor:pointer;"></i> LinkedIn
                </network>
                <network network="twitter" style="padding-left:12px;">
                  <i class="fa fa-twitter" style="color:#1DA1F2;cursor:pointer;"></i> Twitter
                </network>
            </div>
          </social-sharing>
       
      </div>
      <!-- <vue-disqus shortname="student-burger"></vue-disqus> -->
      
    </vuestic-widget>
  </div>
</template>

<script>
  import VueDisqus from 'vue-disqus/VueDisqus.vue'

  export default {
    name: 'separateProjectStudent',
    components: {
      VueDisqus
    },
    data () {
      return {
        projectData: {
          upvotes: []
        },
        projectId: '',
        authorData: '',
        showProject: null,
        shareIcons: false,
        liked: false,
        upvoteContent: '',
        url: 'https://studentburger.com' + this.$route.fullPath,
        swiperOption: {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    },
    methods: {
      showShareDiv: function () {
        this.shareIcons = !this.shareIcons
      },
      togglelike: function () {
        const self = this
        const authToken = this.$ls.get('token')
        const headers = {
          headers: {
            'Authorization': 'Bearer ' + authToken
          }
        }
        const studentId = this.$ls.get('logged_student_id')
        if (!this.liked) {
          console.log('not liked', this.liked)
          this.$http.post('/projects/upvotes', {
            student: studentId,
            project: self.projectId
          }, headers)
          .then(function (upvoteSuccess) {
            console.log('success', upvoteSuccess)
          })
          .catch(function (upvoteError) {
            console.log('error', upvoteError)
          })
        } else if (this.liked) {
          console.log('liked', this.liked)
          this.$http.post('/projects/upvotes/remove', {
            student: studentId,
            project: self.projectId
          }, headers)
          .then(function (upvoteDeleteSuccess) {
            console.log('success', upvoteDeleteSuccess)
          })
          .catch(function (upvoteDeleteErr) {
            console.log('error', upvoteDeleteErr)
          })
        }
        this.liked = !this.liked
        this.liked ? this.projectData.upvotes.length ++ : this.projectData.upvotes.length --
      },
      studentViewUpdate: function (projectId) {
        const studentId = this.$ls.get('logged_student_id')
        const authToken = this.$ls.get('token')
        this.$http.post('/projects/addStudentView', {
          student: studentId,
          project: projectId
        }, {
          headers: {
            'Authorization': 'Bearer ' + authToken
          }
        })
        .then(function (studentViewUpdated) {
          console.log('success', studentViewUpdated)
        })
        .catch(function (studentViewUpdateErr) {
          console.log('error', studentViewUpdateErr)
        })
      }
    },
    created () {
      var secondthis = this
      const projectId = this.$route.params.id
      const loggedStudent = this.$ls.get('logged_student_id')
      const authToken = this.$ls.get('token')
      this.projectId = projectId
      this.$http.get('projects/get?id=' + projectId, {
        headers: {
          'Authorization': 'Bearer ' + authToken
        }
      })
      .then(function (projectDetails) {
        secondthis.showProject = true
        secondthis.studentViewUpdate(projectId)
        console.log('projectData', projectDetails.data)
        if (projectDetails.data.upvotes.includes(loggedStudent)) {
          secondthis.liked = true
        }
        secondthis.projectData = projectDetails.data
        secondthis.$http.get('/students/get?id=' + projectDetails.data.author, {
          headers: {
            'Authorization': 'Bearer ' + authToken
          }
        })
        .then(function (studentData) {
          console.log('student data', studentData.data[0])
          secondthis.authorData = studentData.data[0]
          console.log('studet', secondthis.authorData.email)
        })
        .catch(function (studentDataErr) {
          secondthis.showProject = false
          console.log('student data err', studentDataErr)
        })
      })
      .catch(function (projectDataErr) {
        secondthis.showProject = false
        console.log('projectdataerr', projectDataErr)
      })
    },
    updated () {
      if (this.projectData.upvotes.length < 2) {
        this.upvoteContent = 'upvote'
      } else {
        this.upvoteContent = 'upvotes'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";
  .comment-section {
    display: inline-block;
    margin-left: 5%;
  }
  #tagDiv {
    display: inline-block;
    margin-top: 1rem;
  }
  .btn-style{
    border: none;
    width: 100px;
    cursor: pointer;
    background: white;
    outline: none;
  }
  .btn-style:hover{
    background:  #f2f2f2;
    border: none;
  }
  #icon-style{
    margin-top: 2%;
    margin-left: 12%; 
    cursor: pointer;
  }
  .tagNames {
    padding: 0.2rem 0.5rem;
    margin-left: 0.5rem;
    background: $tagcolor;
    color: white;
    border-radius: 5%;
  }
  .backbtn{
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 5%;
  }
  .noProjects {
    text-align: center;
    font-weight: bold;
    // margin-top: 7rem;
  }
  .likebutton{
    color:#3385ff;
  }
  .sliderStyle{
    margin-bottom: 3%;
    z-index: 1;
  }
  .imageStyle{
   object-fit: cover;
   height: 350px;
   width: 100%;
 }
</style>
