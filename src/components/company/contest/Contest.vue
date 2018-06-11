<template>
    <div class="row">
      <div class="col-md-8">
        <div class="noContests" v-show="noContests">
          <h4> Oops! You have no Contests to view. </h4>
          <button class="btn btn-primary btn-micro" @click="createNew"> New Contests</button>              
      </div>
        <vuestic-widget class="" v-for="contest in contestArray" :key="contest.id">
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
      <div class="col-md-4 col-sm-12 sidenav">
        <vuestic-widget class="createproject-div">
          <div class="col-md-offset-6 col-md-12">
            <h5 class="gotnew">Got something new?</h5>
            <button class="btn btn-primary btn-micro" @click="createNew"> New Contest</button>    
          </div>
        </vuestic-widget>
        <vuestic-widget class="live-feed" headerText="Live feeds">
          <vuestic-feed class="newsfeed-page" :initialPosts="posts"></vuestic-feed>
        </vuestic-widget>
      </div>
    </div>
</template>

<script>
  import { eventBus } from '../../../main.js'
  export default {
    name: 'Contest',
    component: {},
    data () {
      return {
        contestArray: [],
        noContests: false,
        posts: [
          {
            id: 0,
            photoURL: 'https://goo.gl/KnVxVY',
            name: 'Harishankar',
            text: 'registered for your contest SpriteXtreme',
            action: 'upvoted'
          },
          {
            id: 1,
            photoURL: 'https://goo.gl/1nKusR',
            name: 'Balaji D Loganathan',
            text: 'was given an award by a company',
            action: 'commented'
          },
          {
            id: 2,
            photoURL: 'https://goo.gl/Ckaexc',
            name: 'Surendran S',
            text: 'has the most upvoted project which you upvoted',
            action: 'upvoted'
          }
        ]
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
      if (this.contestArray.length === 0) {
        this.noContests = true
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
        // console.log('contestArr', contestArr)
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
            this.contestArray.push(contestData.data)
            console.log('contest array', this.contestArray)
          })
          .catch((contestErr) => {
            console.log('contestErr', contestErr)
          })
        })
      }).catch((companyErr) => {
        console.log('company err', companyErr)
      })
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
  .sidenav{
    position: fixed;
    margin-left: 678px;
    width: 26%;
    top: 12.5%;
  }
  @media screen and (max-width: 650px)
  {
    .sidenav{
    position: relative !important;
    margin-left: 0px !important;
    width: 100% !important;
    }
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
</style>
