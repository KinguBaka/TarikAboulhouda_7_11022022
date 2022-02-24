<template>
  <div id="myprofil">
    <router-link to="/updateprofil"> 
        <i class="fas fa-cog"></i>
    </router-link>
        
    <h1><i class="far fa-user"></i>  {{user.username}} </h1>
    <h4> {{user.bio}} </h4>
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

<style lang="scss">
    #myprofil {
    margin-left: auto;
    margin-right: auto;
    width: 70%;
    text-align: center;
        h1 {
            margin: 35px 0 35px 0;
            color: #cfa544;
        }
        h4 {
            margin: 35px 0 35px 0;
        }
        .fas {
            color: rgb(119, 119, 119);
            font-size: 3vw;
            margin-right: 0;
            float: right;
        }
    }
</style>