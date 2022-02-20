<template>
  <div id="home">
      <div v-if="!user">
        <h1>Merci de vous connecter pour profiter du réseaux GROUPOMANIA</h1>
      </div>
      <div v-if="user">
        <h1>Vos messages apparaitrons bientot !</h1>
        <Posts/>
      </div>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Posts from './Posts'

    export default {
        name: 'Home',
        computed: {
            ...mapGetters(['user'])
        },
        components : {
            Posts
        }
    }
</script>

<style>

</style>