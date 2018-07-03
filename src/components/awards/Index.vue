<template>
  <div>
    <vuestic-switch class="col-md-4 switch" v-model="isGeneral">
      <span slot="trueTitle">All awards</span>
      <span slot="falseTitle">Your awards</span>
    </vuestic-switch>
    <div class="row" v-show="showYours">
      <div class="col-md-8">
        <div class="noContests" v-show="noAwards">
          <h4>Make yourself more harder and get awards</h4>             
        </div>
        <vuestic-widget class="" v-for="award in awardArray" :key="award.id">
          <div>
            <div id="projects-name-div">
              <span class="projects-name"><strong><a href="" @click="viewAward(award._id)">{{award.title}}</a> </strong></span><br>
              <span class="projects-time"><timeago :since="award.createdAt" :auto-update="60"></timeago></span>
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
    <div class="row" v-show="showGeneral">
      <div class="col-md-8">
        <vuestic-widget class="" v-for="award in totalAwardArray" :key="award.id">
          <div>
            <div id="projects-name-div">
              <span class="projects-name"><strong><a href="" @click.prevent="viewAward(award._id)">{{award.title}}</a> </strong></span><br>
              <span class="projects-time"><timeago :since="award.createdAt" :auto-update="60"></timeago></span>
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
    <div class="col-md-8 col-sm-12 side">
        <vuestic-widget class="createproject-div sidenav1">
          <div class="col-md-offset-6 col-md-12">
            <h5 class="gotnew">Want more Awards?</h5>
            <h6>Read more about our tips..</h6>
          </div>
        </vuestic-widget>
        <Livefeeds></Livefeeds>
      </div>
  </div>
</template>

<script>
  import Livefeeds from '../rightsidebar/Livefeeds'
  export default {
    name: 'companyawards',
    components: {
      Livefeeds
    },
    data () {
      return {
        awardArray: [],
        totalAwardArray: [],
        noAwards: false,
        isGeneral: true,
        showGeneral: true,
        showYours: false
      }
    },
    methods: {
      viewAward: function (awardId) {
        this.$router.push('/student/award/' + awardId)
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
      this.$http.get('/students/get?email=' + email, headers)
      .then((studentData) => {
        console.log('student Data', studentData.data)
        const awardsArr = studentData.data[0].awards
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
      }).catch((studentErr) => {
        console.log('student err', studentErr)
      })

      this.$http.get('/awards/all', headers)
      .then((awardData) => {
        // console.log('all award data', awardData.data.awards)
        this.totalAwardArray = awardData.data.awards
        // console.log('award array all', this.totalAwardArray)
      })
      .catch((awardErr) => {
        console.log('awarderr', awardErr)
      })
    },
    updated () {
      if (this.isGeneral) {
        this.showYours = false
        this.showGeneral = true
      } else {
        this.showYours = true
        this.showGeneral = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";

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
  .switch {
    margin-bottom: 1rem;
  }
</style>
