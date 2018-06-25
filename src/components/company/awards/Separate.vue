<template>
  <div>
    <button class="btn btn-danger backbtn" @click="$router.go(-1)">
      <i class="fa fa-caret-left"></i>
      Back
    </button>
    <div class="noProjects" v-show="!showAward">
      <h4>Award Not found</h4>
      <img class="col-md-8" src="../../../assets/vendor/leaflet/404.png" alt="">
    </div>
    <vuestic-widget v-show="showAward" class="col-md-9" :headerText="this.awardData.title">
      <p><strong> Award given to</strong><br>{{this.studentData.email}}</p>
      <p><strong> Provided by</strong><br> {{this.companyData.email}}</p>    
      <p><strong> Description</strong><br><span v-html="this.awardData.description"></span></p>
      <div class='row' v-show="awardFiles">
      <div v-for="data in awardFiles" :key="data.key" class="col-md-8 image-container" >
          <img :src="data.filePath" />
      </div>
      </div>

      <strong>Tags:</strong><span v-for="tag in awardData.tags" :key="tag.id" class="tagNames">{{tag.name}}</span>
      <p class="published">Published: <timeago :since="this.awardData.createdAt" :auto-update="60"></timeago></p>
      <hr>
      <div>
        <div class="comment-section">
        <!-- <i class="fa fa-child"></i> {{this.awardData.registrations.length}} people registered -->
        </div>
        <div class="comment-section">
          <i class="fa fa-share"></i> Share
        </div>
      </div>
      <!-- <vue-disqus shortname="student-burger"></vue-disqus> -->
    </vuestic-widget>
  </div>

</template>

<script>
  import Vue from 'vue'
  import VueDisqus from 'vue-disqus/VueDisqus.vue'
  import 'viewerjs/dist/viewer.css'
  import Viewer from 'v-viewer/src/component.vue'

  Vue.use(Viewer)

  export default {
    name: 'separateAwardCompany',
    components: {
      VueDisqus,
      Viewer
    },
    data () {
      return {
        awardData: '',
        awardId: '',
        companyData: '',
        studentData: '',
        awardFiles: [],
        showAward: null
      }
    },
    methods: {
      inited (viewer) {
        this.$viewer = viewer
      },
      show () {
        this.$viewer.show()
      }
    },
    created () {
      var secondthis = this
      const awardId = this.$route.params.id
      const authToken = this.$ls.get('token')
      this.awardId = awardId
      this.$http.get('awards/get?id=' + awardId, {
        headers: {
          'Authorization': 'Bearer ' + authToken
        }
      })
      .then(function (awardDetails) {
        secondthis.showAward = true
        console.log('awardData', awardDetails.data)
        secondthis.awardData = awardDetails.data
        secondthis.awardFiles = awardDetails.data.files
        secondthis.$http.get('/companies/get?id=' + awardDetails.data.provider, {
          headers: {
            'Authorization': 'Bearer ' + authToken
          }
        })
        .then(function (companyData) {
          console.log('company data', companyData.data[0])
          secondthis.companyData = companyData.data[0]
          console.log('company', secondthis.companyData.email)
        })
        .catch(function (companyDataErr) {
          secondthis.showAward = false
          console.log('company data err', companyDataErr)
        })

        secondthis.$http.get('/students/get?id=' + awardDetails.data.receiver, {
          headers: {
            'Authorization': 'Bearer ' + authToken
          }
        })
        .then(function (studentData) {
          console.log('student data', studentData.data[0])
          secondthis.studentData = studentData.data[0]
          console.log('student', secondthis.studentData.email)
        })
        .catch(function (studentDataErr) {
          secondthis.showAward = false
          console.log('student data err', studentDataErr)
        })

        // secondthis.$http.get('/attachments?filepath=/' + awardDetails.data.files[0], {
        //   headers: {
        //     'Authorization': 'Bearer ' + authToken
        //   }
        // })
        // .then(function (fileData) {
        //   console.log('filedata came', fileData)
        //   secondthis.$ls.set('imageData', fileData.data)
        // })
        // .catch(function (fileDataErr) {
        //   secondthis.showAward = false
        //   console.log('fileDataerr', fileDataErr)
        // })
      })
      .catch(function (awardDataErr) {
        secondthis.showAward = false
        console.log('awardDataErr', awardDataErr)
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";

  .comment-section {
    display: inline-block;
    padding-right: 1rem;
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
  .published {
    color: gray;
    margin-top: 1rem;
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
  .image-container{
    margin: 10px 0px;
  }
  .image-container img{
    width : 100%;
  }
</style>
