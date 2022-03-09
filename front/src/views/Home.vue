<template>
  <div id="home">
      <div v-if="!user" id="notLogin">
        <h1>Bienvenue chez Groupomania</h1>
        <div id="notLoginText">
          <h2>Vous n'êtes pas connecté !</h2>
          <p> <strong> Connectez-vous ou créez un compte pour échanger avec vos collégues ! </strong> </p>
        </div>
      </div>
      <div v-if="user">
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

<style lang="scss">

  #home {
    margin-left: auto;
    margin-right: auto;
    height: 100vh;
  }
  
  #notLogin {
    text-align: center;
    height: 100%;
    padding: 20vh 5vw;
    background-image: url("../assets/pexels-sevenstorm-juhaszimrus-443383v2.jpg");
    background-repeat:no-repeat;
    background-size: cover;

    h4 {
      margin: 50px;
    }

    #notLoginText {
      margin-top: 100px;
      margin-bottom: 100px;
    }
  }
</style>