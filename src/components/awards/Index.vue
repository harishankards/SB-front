<template>
  <div class="row">
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
        <div><a href="" class="viewMoreBtn" @click="viewAward(award._id)"> Read More <i class="fa fa-arrow-right"></i> </a></div>
        <div id="tagDiv">
          <strong>Tags:</strong><span v-for="tag in award.tags" :key="tag.id" class="tagNames">{{tag.name}}</span>
        </div>
      </vuestic-widget>
    </div>
    <div class="col-md-4">
      <vuestic-widget class="createproject-div">
        <div class="col-md-offset-6 col-md-12">
          <h5 class="gotnew">Want more Awards?</h5>
          <h6>Read more about our tips..</h6>
        </div>
      </vuestic-widget>
      <vuestic-widget class="live-feed" headerText="Live feeds">
        <vuestic-feed class="newsfeed-page" :initialPosts="posts"></vuestic-feed>
      </vuestic-widget>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'companyawards',
    data () {
      return {
        awardArray: [],
        noAwards: false,
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
      viewAward: function (awardId) {
        this.$router.push('/company/award/' + awardId)
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
</style>
