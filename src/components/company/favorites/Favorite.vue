<template>
  <h1>coming soon..</h1>
</template>

<script>
  export default {
    name: 'companyfavorites',
    beforeMount () {
      setTimeout((a) => {
        console.log('before mount')
      }, 3000)
    }
  }
</script>