<template>
  <vuestic-widget class="col-md-8">
    <h5 class="headingStyle">Your Notifications</h5>
    <div v-for="notification in this.notificationsData" :key="notification.id" @click.prevent="takeToNoti(notification)" class="notificationStyle">
      <div class="iconStyle">{{firstletter(notification.text)}}</div>
      <a href="" class="textStyle">{{notification.text}}</a>      
    </div>
  </vuestic-widget>
</template>

<script>
  export default {
    name: 'student-notifications',
    data () {
      return {
        notificationsData: ''
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
        self.notificationsData = studentData.data[0].notifications
      })
      .catch(function (studentDataErr) {
        console.log('student data err', studentDataErr)
      })
    }
  }
</script>
<style scoped>
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
   display: inline-block;
}
.notificationStyle:hover{
  background-color: #D3E7DD;
}
.headingStyle{
  margin-left: 4%;
  padding-bottom: 1%;
}
</style>

