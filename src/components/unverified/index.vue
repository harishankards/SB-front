<template>
    <div class="text-center margin-top:40%">
        A verification link has been sent to your email.Please verify to procced.<br>
        If you already completed your verifcation please login again to continue
        <div v-show ='!sentverification'> click <a @click='sendVerification' style="color:blue">here</a> to resend code</div>
    </div>
</template>
<script>
import axios from 'axios'
import Swal2 from 'sweetalert2'

export default {
  name: 'unverified',
  data () {
    return {
      sentverification: false
    }
  },
  methods: {
    sendVerification () {
      const secondThis = this
      axios({
        url: '/getVerificationToken',
        method: 'get',
        headers: {
          authorization: 'Bearer ' + this.$ls.get('token')
        }
      })
      .then(function (response) {
        secondThis.sentverification = true
        const toast = Swal2.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        })

        toast({
          type: 'success',
          title: 'Link sent to your email'
        })
      })
      .catch(function (err) {
        if (err.response) {
          console.log(err.response)
          const toast = Swal2.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          })
          toast({
            type: 'error',
            title: err.response.data || 'Error occured'
          })
        } else {
          const toast = Swal2.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          })
          toast({
            type: 'Error',
            title: 'Unexpected error occured'
          })
        }
      })
    }
  }
}
</script>

