<template>
  <nav>
    <div>
      <h1>GROUPOMANIA</h1>
    </div>
    <div class="nav-link">
      <div v-if="!user">
        <router-link to="/login"> Login </router-link>
        <router-link to="/signup"> Signup </router-link>
      </div>
      <div v-if="user">
        <Logout/>
      </div>
    </div>
  </nav>
</template>

<script>
  import Logout from './Logout.vue'
  import {mapGetters} from 'vuex'

  export default {
    name: "Navbar",
    components: {
      Logout
    },
    computed: {
    ...mapGetters(['user'])
    }
  }
</script>

<style lang='scss' >
  nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .nav-link a {
      margin: 0 10px 0 10px;
    }
  }
</style>