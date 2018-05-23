<template>
  <vuestic-widget class="col-md-8">
    <div v-for="notification in this.notificationsData" :key="notification.id">
      <a href="" @click.prevent="takeToNoti(notification)">{{notification.text}}</a>
    </div>
  </vuestic-widget>
</template>

<script>
  export default {
    name: 'company-notifications',
    data () {
      return {
        notificationsData: ''
      }
    },
    methods: {
      takeToNoti: function (notification) {
        if (notification.type === 'project') {
          this.$router.push('/company/project/' + notification.link)
        }
      }
    },
    created () {
      const self = this
      this.$http.get('/companies/get?email=' + this.$ls.get('email'), {
        headers: {
          'Authorization': 'Bearer ' + this.$ls.get('token')
        }
      })
      .then(function (companyData) {
        console.log('notifications data', companyData.data[0].notifications)
        self.notificationsData = companyData.data[0].notifications
      })
      .catch(function (companyDataErr) {
        console.log('company data err', companyDataErr)
      })
    }
  }
</script>
