<template>
    <div class="row">
      <div class="col-md-8 col-sm-12 side">
        <vuestic-widget class="createproject-div sidenav1">
          <div class="col-md-offset-6 col-md-12">
            <h5 class="gotnew">Got something new?</h5>
            <button class="btn btn-primary btn-micro" @click="createNew"> New Contest</button>    
          </div>
        </vuestic-widget>
        <CompanyLivefeeds></CompanyLivefeeds>
      </div>
      <div class="col-md-8 col-sm-12 displayContent">
        <vuestic-switch class="col-md-13 switch" v-model="isUpcoming">
        <span slot="trueTitle">Upcoming</span>
        <span slot="falseTitle">History</span>
    </vuestic-switch>
      <div v-show="showUpcoming">
        <div class="noContests" v-if="noUpcomingContests">
          <h4>You have no upcoming Contests to view. </h4>
          <button class="btn btn-primary btn-micro" @click="createNew"> New Contest</button> 
        </div>
        <vuestic-widget class="" v-for="contest in upcomingContestArray" :key="contest.id">
          <div>
            
            <div id="projects-name-div">
              <span class="projects-name"><strong><a href="" @click.prevent="viewContest(contest._id)">{{contest.title}}</a> </strong></span><br>
              <span class="projects-time"><timeago :since="contest.createdAt" :auto-update="60"></timeago></span>
            </div>
            <div class="deleteIconDiv">
              <i class="fa fa-edit editIcon" @click="takeToEdit(contest)"></i>                          
              <i class="fa fa-trash deleteIcon" @click="showDeleteModal(contest._id)"></i>
            </div>
          </div>
          <div id="projects-content-div">
            <p id="projects-description">{{contest.about}}</p>
            <p v-if="contest"><strong>Starts on:</strong>  {{contest.date.start | moment("dddd, MMMM Do YYYY, h:mm a")}}</p>
            <p v-if="contest"><strong>Ends on: </strong> {{contest.date.end | moment("dddd, MMMM Do YYYY, h:mm a") }}</p>            
          </div>
          <!-- <div><a href="" class="viewMoreBtn" @click="viewContest(contest._id)"> Read More <i class="fa fa-arrow-right"></i> </a></div> -->
          <div id="tagDiv">
            <strong>Tags:</strong><span v-for="tag in contest.tags" :key="tag.id" class="tagNames">{{tag.name}}</span>
          </div>
        </vuestic-widget>
      </div>
      <div v-show="showHistory">
        <div class="noContests" v-if="noPreviousContests">
          <h4>You have no Previous Contests to view. </h4>
        </div>
        <vuestic-widget class="" v-for="contest in previousContestArray" :key="contest.id">
          <div>
            
            <div id="projects-name-div">
              <span class="projects-name"><strong><a href="" @click.prevent="viewContest(contest._id)">{{contest.title}}</a> </strong></span><br>
              <span class="projects-time"><timeago :since="contest.createdAt" :auto-update="60"></timeago></span>
            </div>
            <div class="deleteIconDiv">
              <i class="fa fa-edit editIcon" @click="takeToEdit(contest)"></i>                          
              <i class="fa fa-trash deleteIcon" @click="showDeleteModal(contest._id)"></i>
            </div>
          </div>
          <div id="projects-content-div">
            <p id="projects-description">{{contest.about}}</p>
            <p v-if="contest"><strong>Starts on:</strong>  {{contest.date.start | moment("dddd, MMMM Do YYYY, h:mm a")}}</p>
            <p v-if="contest"><strong>Ends on: </strong> {{contest.date.end | moment("dddd, MMMM Do YYYY, h:mm a") }}</p>            
          </div>
          <!-- <div><a href="" class="viewMoreBtn" @click="viewContest(contest._id)"> Read More <i class="fa fa-arrow-right"></i> </a></div> -->
          <div id="tagDiv">
            <strong>Tags:</strong><span v-for="tag in contest.tags" :key="tag.id" class="tagNames">{{tag.name}}</span>
          </div>
        </vuestic-widget>
        </div>
      </div>
    </div>
</template>

<script>
  import { eventBus } from '../../../main.js'
  import CompanyLivefeeds from '../rightsidebar/CompanyLivefeeds'
  export default {
    name: 'Contest',
    components: {CompanyLivefeeds},
    data () {
      return {
        contestArray: [],
        upcomingContestArray: [],
        previousContestArray: [],
        noContests: false,
        isUpcoming: true,
        showHistory: false,
        showUpcoming: true,
        noPreviousContests: false,
        noUpcomingContests: false
      }
    },

    methods: {
      createNew: function () {
        this.$router.push('/company/contests/new')
      },
      viewContest: function (contestId) {
        this.$router.push('/company/contest/' + contestId)
      },
      takeToEdit: function (contest) {
        eventBus.contestToBeEdited = contest
        this.$router.push('/company/contests/edit/' + contest._id)
      },
      showDeleteModal: function (contestId) {
        const self = this
        const authToken = this.$ls.get('token')
        this.$swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#BA1F33',
          cancelButtonColor: '#4ae387',
          confirmButtonText: 'Yes, delete it!'
        })
        .then((result) => {
          if (result.value) {
            self.$http({
              method: 'delete',
              url: '/contests/delete',
              data: {
                'contest': contestId
              },
              headers: {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json'
              }
            })
            .then(function (contestDeleted) {
              console.log('contest delete', contestDeleted)
              self.contestArray.map((contest) => {
                if (contest._id === contestId) {
                  const index = self.contestArray.indexOf(contest)
                  if (index > -1) {
                    self.contestArray.splice(index, 1)
                  }
                }
              })
              self.$swal(
                'Deleted!',
                'Your contest has been deleted.',
                'success'
              )
            })
            .catch(function (contestDeleteErr) {
              console.log('contestDeleteErr', contestDeleteErr)
            })
          } else if (result.dismiss === self.$swal.DismissReason.cancel) {
            self.$swal(
              'Cancelled',
              'Your Project is safe :)',
              'error'
            )
          }
        })
      }
    },
    updated () {
      if (this.upcomingContestArray.length === 0) {
        this.noContests = true
      }
      if (this.previousContestArray.length === 0) {
        this.noPreviousContests = true
      }
      if (this.upcomingContestArray.length === 0) {
        this.noUpcomingContests = true
      } else {
        this.noUpcomingContests = false
      }
      if (this.isUpcoming) {
        this.showUpcoming = true
        this.showHistory = false
      } else {
        this.showUpcoming = false
        this.showHistory = true
      }
    },
    created () {
      const email = this.$ls.get('email')
      const authToken = this.$ls.get('token')
      this.$http.get('/companies/get?email=' + email, {
        headers: {
          'Authorization': 'Bearer ' + authToken
        }
      })
      .then((companyData) => {
        // console.log('company Data', companyData.data)
        const contestArr = companyData.data[0].contests
        console.log('contestArr', contestArr)
        if (contestArr.length === 0) {
          this.noContests = true
        }
        contestArr.map(contest => {
          // console.log('single contest', contest)
          this.$http.get('/contests/get?id=' + contest, {
            headers: {
              'Authorization': 'Bearer ' + authToken
            }
          })
          .then((contestData) => {
            console.log('contest data', contestData)
            // console.log('contest date', Date.parse(contestData.data.date.end))
            // console.log('new date', Date.parse(new Date()))
            if (Date.parse(contestData.data.date.end) < Date.parse(new Date())) {
              // console.log('project ended')
              this.previousContestArray.push(contestData.data)
              // console.log('prev', this.previousContestArray)
            } else {
              this.upcomingContestArray.push(contestData.data)
              // console.log('upcoming', this.upcomingContestArray)
            }
          })
          .catch((contestErr) => {
            console.log('contestErr', contestErr)
          })
        })
      }).catch((companyErr) => {
        console.log('company err', companyErr)
      })
      if (this.upcomingContestArray.length === 0) {
        this.noUpcomingContests = true
      } else {
        this.noUpcomingContests = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";

  .createproject-div{
    text-align: center;
  }
  .newsfeed-page{
    padding-left: 0rem !important;
  }
  .sidenav1{
    // position: fixed;
    margin-left: 720px;
    width: 40%;
    // top: 13.7%;
  }
  @media screen and (max-width: 650px)
  {
    .sidenav1{
    position: relative !important;
    margin-left: 0px !important;
    width: 100% !important;
    }
  }
  .side{
    position: fixed;
  }
  .projects-time{
    margin-top: 3px;
    color: #a29e9e;
  }

  #projects-name-div{
    display: inline-block;
    // margin-left: 0.4rem;
  }

  #projects-content-div{
    margin-top: 0.5rem;
  }

  .gotnew{
    margin-bottom: 1.5rem;
  }
  .noContests {
    text-align: center;
    font-weight: bold;
    margin-top: 7rem;
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
  .deleteIconDiv {
    float: right;
  }

  .deleteIcon {
    font-size: 1.2rem;
    cursor: pointer;
  }
  .editIcon {
    font-size: 1.1rem;
    margin-right: 0.5rem;
    cursor: pointer;
  }
  .noContests{
    text-align: center;
  }
  .switch{
    margin-bottom: 4%;
  }
   @media screen and (max-width: 650px){
    .displayContent{
      margin-top: 40%;
    }
   }
</style>
