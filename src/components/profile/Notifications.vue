<template>
  <vuestic-widget class="col-md-8">
    <div v-for="notification in this.notificationsData" :key="notification.id">
      <a href="" @click.prevent="takeToNoti(notification)">{{notification.text}}</a>
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
