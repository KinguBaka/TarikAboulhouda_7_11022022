<template>
    <div id="LikePost">
        <i class="like fas fa-thumbs-down" v-if="postUsersLiked.includes(userId)" @click.prevent="dislikePost(postId, this.idProfil)"></i>
        <i class="like fas fa-thumbs-up" v-else @click.prevent="likePost(postId, this.idProfil)"></i>
    </div>
</template>

<script>
    import axios from 'axios'
    import {mapGetters} from 'vuex'

    export default {
        name: 'LikePost',
        props:{
            postUsersLiked: Array,
            userId: Number,
            postId: Number
        },
         computed : {
            ...mapGetters(['idProfil'])
        },
        methods: {
            async dislikePost(postId, id) {
                await axios.put(`/post/${postId}/like`,{
                    like: 0
                })
                let url = window.location.href;
                if (url.includes('/profilUser')) {
                    const response = await axios.get(`/user/${id}/post`)
                    this.$store.dispatch('posts', response.data)
                } else {
                    const response = await axios.get('/post/all')
                    this.$store.dispatch('posts', response.data)
                }
            },
            async likePost(postId, id) {
                await axios.put(`/post/${postId}/like`,{
                    like: 1
                })
                let url = window.location.href;
                if (url.includes('/profilUser')) {
                    const response = await axios.get(`/user/${id}/post`)
                    this.$store.dispatch('posts', response.data)
                } else {
                    const response = await axios.get('/post/all')
                    this.$store.dispatch('posts', response.data)
                }
            }
        }
    }
</script>

<style>
    .like {
        color: #1b5ad4;
        font-size: 1.5rem;
    }
    .like:hover {
        cursor: pointer;
    }
</style>