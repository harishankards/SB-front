<template>
  <div class="row">
     <div class="col-md-8 col-sm-12 side">
      <vuestic-widget class="createproject-div sidenav1">
        <div class="col-md-offset-6 col-md-12">
          <h5 class="gotnew">Saw someone great?</h5>
          <button class="btn btn-primary btn-micro" @click="createNew"> Announce award</button>    
        </div>
      </vuestic-widget>
      <CompanyLivefeeds></CompanyLivefeeds>
    </div>
    <div class="col-md-8 displayContent">
      <div class="noContests" v-show="noAwards">
        <h4> Oops! You have no Awards to view. </h4>
        <button class="btn btn-primary btn-micro" @click="createNew"> New Award</button>              
      </div>
      <vuestic-widget class="" v-for="award in awardArray" :key="award.id">
        <div>
          <div id="projects-name-div">
            <span class="projects-name"><strong><a href="" @click.prevent="viewAward(award._id)">{{award.title}}</a> </strong></span><br>
            <span class="projects-time"><timeago :since="award.createdAt" :auto-update="60"></timeago></span>
          </div>
          <div class="deleteIconDiv">
            <i class="fa fa-edit editIcon" @click="takeToEdit(award)"></i>                        
            <i class="fa fa-trash deleteIcon" @click="showDeleteModal(award._id)"></i>
          </div>
        </div>
        <div id="projects-content-div">
          <span id="projects-description">{{award.description}}</span>
        </div>
        <!-- <div><a href="" class="viewMoreBtn" @click="viewAward(award._id)"> Read More <i class="fa fa-arrow-right"></i> </a></div> -->
        <div id="tagDiv">
          <strong>Tags:</strong><span v-for="tag in award.tags" :key="tag.id" class="tagNames">{{tag.name}}</span>
        </div>
      </vuestic-widget>
    </div>
  </div>
</template>

<script>
  import { eventBus } from '../../../main.js'
  import CompanyLivefeeds from '../rightsidebar/CompanyLivefeeds'
  export default {
    name: 'companyawards',
    components: {CompanyLivefeeds},
    data () {
      return {
        awardArray: [],
        noAwards: false
      }
    },
    methods: {
      createNew: function () {
        this.$router.push('/company/awards/new')
      },
      viewAward: function (awardId) {
        this.$router.push('/company/award/' + awardId)
      },
      takeToEdit: function (award) {
        eventBus.awardToBeEdited = award
        this.$router.push('/company/awards/edit/' + award._id)
      },
      showDeleteModal: function (awardId) {
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
        }).then((result) => {
          if (result.value) {
            self.$http({
              method: 'delete',
              url: '/awards/delete',
              data: {
                'award': awardId
              },
              headers: {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json'
              }
            })
            .then(function (awardDeleted) {
              console.log('award delete', awardDeleted)
              self.awardArray.map((award) => {
                if (award._id === awardId) {
                  const index = self.awardArray.indexOf(award)
                  if (index > -1) {
                    self.awardArray.splice(index, 1)
                  }
                }
              })
              self.$swal(
                'Deleted!',
                'Your contest has been deleted.',
                'success'
              )
            })
            .catch(function (awardDeleteErr) {
              console.log('awardDeleteErr', awardDeleteErr)
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
      if (this.awardArray.length === 0) {
        this.noAwards = true
      }
    },
    created () {
      const email = this.$ls.get('email')
      const authToken = this.$ls.get('token')
      const headers = {
        headers: {
          'Authorization': 'Bearer ' + authToken
        }
      }
      this.$http.get('/companies/get?email=' + email, headers)
      .then((companyData) => {
        console.log('company Data', companyData.data)
        const awardsArr = companyData.data[0].awards
        if (awardsArr.length === 0) {
          this.noAwards = true
        }
        awardsArr.map(award => {
          this.$http.get('/awards/get?id=' + award, headers)
          .then((awardData) => {
            this.awardArray.push(awardData.data)
            console.log('award array', this.awardArray)
          })
          .catch((awardErr) => {
            console.log('awarderr', awardErr)
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
   .sidenav1{
    // position: fixed;
    margin-left: 720px;
    width: 40%;
    // height: 150px;
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
   @media screen and (max-width: 650px){
    .displayContent{
      margin-top: 40%;
    }
   }
</style>
