<template>
  <div>
    <button class="btn btn-danger backbtn" @click="$router.go(-1)">
      <i class="fa fa-caret-left"></i>
      Back
    </button>
    <div class="noProjects" v-show="!showContest">
      <h4>Contest Not found</h4>
      <img class="col-md-8" src="../../assets/vendor/leaflet/404.png" alt="">
    </div>
    <vuestic-widget v-show="showContest" class="col-md-9" :headerText="this.contestData.title">
      <p><strong> About</strong><br>{{this.contestData.about}}</p>
      <p><strong> Rules and Format</strong><br><span v-html="this.contestData.rulesFormat"></span></p>
      <p><strong> Hosted by</strong><br> {{this.hostData.email}}</p>
      <p><strong>Starts on:</strong>  {{this.contestData.date.start | moment("dddd, MMMM Do YYYY, h:mm a")}}</p>
      <p><strong>Ends on: </strong> {{this.contestData.date.end | moment("dddd, MMMM Do YYYY, h:mm a") }}</p>            
      <strong>Tags:</strong><span v-for="tag in contestData.tags" :key="tag.id" class="tagNames">{{tag.name}}</span>
      <p class="published">Published: <timeago :since="this.contestData.createdAt" :auto-update="60"></timeago></p>
      <div>
        <button class="btn btn-info backbtn" v-show="isNotRegistered" @click="showRegisterModal()">Register</button>
        <button class="btn btn-info backbtn" v-show="isRegistered" @click="showUnregisterModal()">Deregister</button>        
      </div>
      <hr>
      <div>
        <div class="comment-section">
        <i class="fa fa-child"></i> {{this.contestData.registrations.length}} people registered
        </div>
        <div class="comment-section" style="cursor:pointer;">   
          <button type="button" class="btn-style"  @click="showShareDiv()">         
          <span class="glyphicon glyphicon-share-alt"></span> Share </button>
           </div>
           <social-sharing :url="url" v-if="shareIcons"
                    :title="contestData.title"
                    description="Student Burger is a progressive social network for building interfaces between the Students and the Companies"
                    :quote="contestData.about"
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
  import Vue from 'vue'
  import { VTooltip, VPopover, VClosePopover } from 'v-tooltip'

  Vue.directive('tooltip', VTooltip)
  Vue.directive('close-popover', VClosePopover)
  Vue.component('v-popover', VPopover)

  Vue.use(VTooltip)
  VTooltip.options.defaultTemplate =
    '<div class="foo" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  
  export default {
    name: 'separateContestStudent',
    components: {
      VueDisqus
    },
    data () {
      return {
        msg: 'ello',
        contestData: {
          date: {
            start: '',
            end: ''
          },
          registrations: []
        },
        contestId: '',
        hostData: '',
        isNotRegistered: null,
        isRegistered: null,
        showContest: null,
        shareIcons: false,
        url: 'https://studentburger.com' + this.$route.fullPath
      }
    },
    methods: {
      showRegisterModal: function () {
        console.log('register')
        const contestId = this.contestId
        const self = this
        const authToken = this.$ls.get('token')
        const email = this.$ls.get('email')
        this.$swal({
          title: 'Are you sure?',
          text: 'You want to register?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#BA1F33',
          cancelButtonColor: '#4ae387',
          confirmButtonText: 'Yes, do it!'
        })
        .then((result) => {
          if (result.value) {
            self.$http.get('/students/get?email=' + email,
              {
                headers: {
                  'Authorization': 'Bearer ' + authToken,
                  'Content-Type': 'application/json'
                }
              })
            .then(function (studentData) {
              console.log('studentData', studentData.data)
              self.$http.post('/contests/registrations',
                {
                  'contest': contestId,
                  'student': studentData.data[0]._id
                },
                {
                  headers: {
                    'Authorization': 'Bearer ' + authToken,
                    'Content-Type': 'application/json'
                  }
                })
              .then(function (registered) {
                console.log('contest registered', registered)
                self.isRegistered = true
                self.isNotRegistered = false
                self.contestData.registrations.length++
                self.$swal(
                  'Registered!',
                  'Your registration to the contest is successful',
                  'success'
                )
              })
              .catch(function (contestRegistrationError) {
                console.log('contestRegistrationError', contestRegistrationError)
              })
            })
            .catch(function (studentDataErr) {
              console.log('studentDataErr', studentDataErr.data)
            })
          } else if (result.dismiss === self.$swal.DismissReason.cancel) {
            self.$swal(
              'Cancelled',
              'Your are not registered :)',
              'error'
            )
          }
        })
      },
      showUnregisterModal: function () {
        console.log('unregister')
        const self = this
        const contestId = this.contestId
        const authToken = this.$ls.get('token')
        const email = this.$ls.get('email')
        this.$swal({
          title: 'Are you sure?',
          text: 'You want to deregister?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#BA1F33',
          cancelButtonColor: '#4ae387',
          confirmButtonText: 'Yes, do it!'
        })
        .then((result) => {
          if (result.value) {
            self.$http.get('/students/get?email=' + email,
              {
                headers: {
                  'Authorization': 'Bearer ' + authToken,
                  'Content-Type': 'application/json'
                }
              }
            )
            .then(function (studentData) {
              console.log('studetn data from deregister', studentData.data[0])
              self.$http.post('/contests/registrations/remove',
                {
                  'contest': contestId,
                  'student': studentData.data[0]._id
                },
                {
                  headers: {
                    'Authorization': 'Bearer ' + authToken,
                    'Content-Type': 'application/json'
                  }
                }
              )
              .then(function (deregistered) {
                console.log('contest deregistered', deregistered)
                self.isRegistered = false
                self.isNotRegistered = true
                self.contestData.registrations.length--
                self.$swal(
                  'Deregistered!',
                  'Your registration to the contest has been deleted.',
                  'success'
                )
              })
              .catch(function (projectDeleteErr) {
                console.log('projectDeleteErr', projectDeleteErr)
              })
            })
            .catch(function (studentDataErr) {
              console.log('student data err from deregister', studentDataErr)
            })
          } else if (result.dismiss === self.$swal.DismissReason.cancel) {
            self.$swal(
              'Cancelled',
              'Your Registration is safe :)',
              'error'
            )
          }
        })
      },
      showShareDiv: function () {
        this.shareIcons = !this.shareIcons
      }
    },
    created () {
      var secondthis = this
      const contestId = this.$route.params.id
      const authToken = this.$ls.get('token')
      const studentEmail = this.$ls.get('email')
      this.contestId = contestId
      console.log('this contestid', this.contestId)
      this.$http.get('contests/get?id=' + contestId, {
        headers: {
          'Authorization': 'Bearer ' + authToken
        }
      })
      .then(function (contestDetails) {
        secondthis.showContest = true
        console.log('contestData', contestDetails.data)
        secondthis.contestData = contestDetails.data
        secondthis.$http.get('/companies/get?id=' + contestDetails.data.host, {
          headers: {
            'Authorization': 'Bearer ' + authToken
          }
        })
        .then(function (companyData) {
          secondthis.hostData = companyData.data[0]
        })
        .catch(function (companyDataErr) {
          console.log('company data err', companyDataErr)
        })

        secondthis.$http.get('/students/get?email=' + studentEmail,
          {
            headers: {
              'Authorization': 'Bearer ' + authToken,
              'Content-Type': 'application/json'
            }
          })
        .then(function (studentData) {
          console.log('student data from created', studentData.data[0])
          if (contestDetails.data.registrations.includes(studentData.data[0]._id)) {
            console.log('registered')
            secondthis.isRegistered = true
            secondthis.isNotRegistered = false
          } else {
            console.log('not registered')
            secondthis.isNotRegistered = true
            secondthis.isRegistered = false
          }
        })
        .catch(function (studentDataErr) {
          secondthis.showContest = false
          console.log('student data err', studentDataErr)
        })
      })
      .catch(function (contestDataErr) {
        secondthis.showContest = false
        console.log('contestDataErr', contestDataErr)
      })
    },
    updated () {
      console.log(VTooltip)
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
  }
  .btn-style:hover{
    background:  #f2f2f2;
    border: none;
  }
  .tagNames {
    padding: 0.2rem 0.5rem;
    margin-left: 0.5rem;
    background: $tagcolor;
    color: white;
    border-radius: 5%;
  }
  #icon-style{
    margin-top: 2%;
    margin-left: 12%; 
    cursor: pointer;
  }
  .btn-outline-primary{
    margin-left: 50%;
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

  .tooltip {
  // ...

    &.popover {
      $color: #f9f9f9;

      .popover-inner {
        background: $color;
        color: black;
        padding: 24px;
        border-radius: 5px;
        box-shadow: 0 5px 30px rgba(black, .1);
      }

      .popover-arrow {
        border-color: $color;
      }
    }
  }
  .noProjects {
    text-align: center;
    font-weight: bold;
    // margin-top: 7rem;
  }
</style>
