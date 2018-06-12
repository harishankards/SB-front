<template>
<div>
  <button class="button" @click="$router.go(-1)">
        <i class="fa fa-caret-left"></i>
        Back
    </button>
  <vuestic-widget class="col-md-8">
    <h5 class="headerStyle">Your Notifications</h5>
    <div v-show="notificationAvailable" v-for="notification in this.notificationsData" :key="notification.id" @click.prevent="takeToNoti(notification)" class="notificationStyle">
     <div class="iconStyle">{{firstletter(notification.text)}} </div>
     <a href="" class="textStyle">{{notification.text}} - {{notification.title}}</a> 
     <div class="iconPosition" v-if="isProject(notification.type)"><i class="fa fa-flag"></i></div>
     <div class="iconPosition" v-if="isContest(notification.type)"><i class="fa fa-rocket"></i></div>
     </div>   
     <div v-show="!notificationAvailable" class="headingStyle">
      You have no notifications to view!!
    </div>
  </vuestic-widget></div>
</template>

<script>
  export default {
    name: 'student-notifications',
    data () {
      return {
        notificationsData: '',
        notificationAvailable: false
      }
    },
    methods: {
      takeToNoti: function (notification) {
        if (notification.type === 'project') {
          this.$router.push('/student/project/' + notification.link)
        }
      },
      firstletter: function (text) {
        console.log('inside first letter function', text)
        return text.charAt(0).toUpperCase()
      },
      isProject: function (type) {
        if (type === 'project' || type === 'companyproject') {
          return true
        } else {
          return false
        }
      },
      isContest: function (type) {
        if (type === 'contest') {
          return true
        } else {
          return false
        }
      }
    },
    created () {
      const self = this
      this.$http.get('/students/get?email=' + this.$ls.get('email'), {
        headers: {
          'Authorization': 'Bearer ' + this.$ls.get('token')
        }
      })
      .then(function (studentData) {
        console.log('notifications data', studentData.data[0].notifications)
        self.notificationsData = studentData.data[0].notifications.reverse()
        if (self.notificationsData.length > 0) {
          console.log('success')
          self.notificationAvailable = true
        }
      })
      .catch(function (studentDataErr) {
        console.log('student data err', studentDataErr)
      })
    }
  }
</script>
<style lang="scss" scoped>
@import "../../sass/_variables.scss";
.notificationStyle{
  border-top: 1px solid lightgray;
  padding-top: 1%;
  padding-bottom: 2%;
  cursor: pointer;
}
.iconStyle{
  border-radius: 20px;
  font-size: 100%;
  margin-left: 5%;
  display: inline-block;
  padding-bottom: 2%;
  width:40px;
  height:40px;
  font-size: 25px;
  border:1px solid #000;
  text-align: center;
}
.textStyle{
   padding-bottom: 1%;
   padding-left: 5%;
   width: auto;
   display: inline-block;
}
.notificationStyle:hover{
  background-color: #D3E7DD;
}
.headingStyle{
  margin-left: 4%;
  padding-left: 25%;
  padding-bottom: 1%;
}
.headerStyle{
  margin-left: 3%;
  padding-bottom: 2%; 
}
.button{
  background-color: $vue-green;
  border: none;
  width: 10%;
  padding-top: 1%;
  padding-bottom: 1%;
  margin-bottom: 2%;
}
@media screen and (max-width: 650px)
  {
   .button{
  background-color: $vue-green;
  border: none;
  width: 21% !important;
  padding-top: 1%;
  padding-bottom: 1%;
  margin-bottom: 5% !important;
  } 
}
.iconPosition{
  display: inline;
  float: right;
  padding-right: 5%;
}
</style>

