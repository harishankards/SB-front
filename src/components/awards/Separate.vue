<template>
  <div>
    <button class="btn btn-danger backbtn" @click="$router.go(-1)">
      <i class="fa fa-caret-left"></i>
      Back
    </button>
    <div class="noProjects" v-show="!showAward">
      <h4>Award Not found</h4>
      <img class="col-md-8" src="../../assets/vendor/leaflet/404.png" alt="">
    </div>
    <vuestic-widget v-show="showAward" class="col-md-9" :headerText="this.awardData.title">
      <p><strong> Award given to</strong><br>{{this.studentData.email}}</p>
      <p><strong> Provided by</strong><br> {{this.companyData.email}}</p>    
      <p><strong> Description</strong><br><span v-html="this.awardData.description"></span></p>
      <strong>Tags:</strong><span v-for="tag in awardData.tags" :key="tag.id" class="tagNames">{{tag.name}}</span>
      <p class="published">Published: <timeago :since="this.awardData.createdAt" :auto-update="60"></timeago></p>
      <hr>
      <div>
        <div class="comment-section">
        <!-- <i class="fa fa-child"></i> {{this.awardData.registrations.length}} people registered -->
        </div>
        <div class="comment-section">
          <button type="button" class="btn-style"  @click="showShareDiv()">
            <span class="glyphicon glyphicon-share-alt"></span> Share </button></div>
           <social-sharing :url="url" v-if="shareIcons"
                    :title="awardData.title"
                    description="Student Burger is a progressive social network for building interfaces between the Students and the Companies"
                    :quote="awardData.description"
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

  export default {
    name: 'separateAwardStudent',
    data () {
      return {
        awardData: '',
        awardId: '',
        companyData: '',
        studentData: '',
        shareIcons: false,
        showAward: null,
        url: 'https://studentburger.com' + this.$route.fullPath
      }
    },
    methods: {
      showShareDiv: function () {
        this.shareIcons = !this.shareIcons
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
      })
      .catch(function (awardDataErr) {
        secondthis.showAward = false
        console.log('awardDataErr', awardDataErr)
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";

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
   .btn-style{
    border: none;
    width: 100px;
    cursor: pointer;
    background: white;
    outline: none;
    margin-left: 200%;
  }
  @media screen and (max-width: 650px){
    .btn-style{
      margin-left: 50%;
    }
  }
  .btn-style:hover{
    background:  #f2f2f2;
    border: none;
    outline: none;
  }
  #icon-style{
    margin-top: 2%;
    margin-left: 12%; 
    cursor: pointer;
  }
</style>
