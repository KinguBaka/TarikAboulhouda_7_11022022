<template>
  <div id="myprofil">
      <h1>{{ user.username }}</h1>
      <h2> {{ user.bio }} </h2>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'Myprofil',
        computed: {
            ...mapGetters(['user'])
        }
    }
</script>

<style>

</style>