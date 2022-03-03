<template>
    <div id="profilUser">
        <div v-if="user.id === idProfil">
            <router-link to="/updateprofil"> 
                <i class="fas fa-cog"></i>
            </router-link>       
            <h1><i class="far fa-user"></i> {{user.username}} </h1>
            <h4> {{user.bio}} </h4>
            <UserPostAndComment />
        </div>
        <div v-else>
            <h1><i class="far fa-user"></i> {{userUsername}} </h1>
            <h4> {{userBio}} </h4>
            <UserPostAndComment />
        </div>
  </div>
</template>

<script>
    import axios from 'axios'
    import {mapGetters} from 'vuex'
    import UserPostAndComment from '../components/UserPostAndComment.vue'

    export default {
        name: 'ProfilUser',
        data() {
            return {
                userUsername: "",
                userBio:"",
                userId:""
            }
        },
        computed: {
            ...mapGetters(['idProfil']),
            ...mapGetters(['user'])
        }, 
        methods : {
            async getUserProfil(id) {
                const response = await axios.get(`/user/${id}`) 
                this.userUsername = response.data.username,
                this.userBio = response.data.bio,
                this.userId = response.data.id
            },
        },
        mounted: function() {
            this.getUserProfil(this.idProfil)
        },
        updated() {
            this.getUserProfil(this.idProfil)
        },
        components : {
            UserPostAndComment
        }
    }
</script>

<style lang="scss" scoped>
    #profilUser {
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