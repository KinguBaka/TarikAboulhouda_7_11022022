<template>
    <div id="LikePost">
        <i class="like fas fa-thumbs-down" v-if="postUsersLiked.includes(userId)" @click.prevent="dislikePost(postId)"></i>
        <i class="like fas fa-thumbs-up" v-else @click.prevent="likePost(postId)"></i>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'LikePost',
        props:{
            postUsersLiked: Array,
            userId: Number,
            postId: Number
        },
        methods: {
            async dislikePost(postId) {
                await axios.put(`/post/${postId}/like`,{
                    like: 0
                })
                const response = await axios.get('/post/all')
                this.$store.dispatch('posts', response.data)
            },
            async likePost(postId) {
                await axios.put(`/post/${postId}/like`,{
                    like: 1
                })
                const response = await axios.get('/post/all')
                this.$store.dispatch('posts', response.data)
            }
        }
    }
</script>

<style>

</style>