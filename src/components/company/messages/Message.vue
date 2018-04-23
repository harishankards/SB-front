<template>
  <vuestic-widget class="col-md-10">
    <!-- <div class="" style="float:left; clear:none">
      <h1>chat widgets</h1>
    </div> -->
    <div class="col-md-7 col-md-offset-3" style="">
      <vuestic-chat v-model="chatMessages" height="10rem"></vuestic-chat>    
    </div>    
  </vuestic-widget>
</template>

<script>
  export default {
    name: 'companymessages',
    data () {
      return {
        chatMessages: [
          {
            text: 'Hello! Are you busy?', // Text of message
            yours: false // Indicates if this message from you
          },
          {
            text: 'Hi. For you - I\'m busy forever...',
            yours: true
          }
        ]
      }
    }
  }
</script>