<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <router-link class="navbar-brand"  to="/">
        <img src="../assets/icon-left-font-monochrome-black.svg" id="icone" alt="">
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse ml-auto" id="navbarNavAltMarkup">
        <div v-if="user" class="navbar-nav">
          <router-link class="nav-link active" aria-current="page" to="/"><i class="fas fa-home"></i>   Accueil</router-link>
          <router-link class="nav-link active" @click.prevent="majIdProfil()" :to="`/profilUser/${this.user.id}`"><i class="fas fa-user"></i>  Mon profil</router-link>
          <Logout/>
        </div>
        <div v-if="!user" class="navbar-nav">
          <router-link class="nav-link active" aria-current="page" to="/login"><i class="fas fa-sign-in-alt"></i>  Se connecter</router-link>
          <router-link class="nav-link " to="/signup"><i class="fas fa-user-plus"></i>  S'inscrire</router-link>
        </div>
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
    },
    methods: {
      majIdProfil() {
        this.$store.dispatch('idProfil', this.user.id);
      }
    }
  }
</script>

<style lang='scss' >

  .navbar {
    background-color: #FFFF;
    box-shadow: 0px 6px 26px -3px rgba(0,0,0,0.20);
  }

  #navbarNavAltMarkup {
    justify-content: flex-end;
  }

  .nav-link {
    margin: 0px 20px 0px 20px;
  }

  #icone {
    width: 200px;
  }
</style>