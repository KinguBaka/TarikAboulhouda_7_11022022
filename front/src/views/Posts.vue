<template>
    <div id="posts">
        <div v-for="post of posts" :key="post.id" class="postAndComment">
            <div :id="post.id" class="post">
                <h2> {{ post.User.username }} </h2>
                <h3> {{ post.title }} </h3>
                <p> {{ post.content }} </p>
                <img v-if="post.attachment" :src="post.attachment"/>
                <p> {{ post.likes }} likes</p>
                <p> {{ format_date(post.createdAt) }} </p>
            </div>
            <div v-for="comment of comments" :key="comment.id">
                <div v-if="comment.PostId === post.id" class="comment">
                    <div class="commentContent">
                        <p class="commentUsername"> {{comment.User.username}} </p>
                        <p> {{comment.content}} </p>
                        <p class="date"> {{format_date(comment.createdAt)}} </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {mapGetters} from 'vuex'
    import format_date from '../moment/moment'

    export default {
        name: 'Posts',
        computed : {
            ...mapGetters(['posts']),
            ...mapGetters(['comments'])
        },
        methods: {
            format_date,
            async listPosts() {
                const response = await axios.get('/post/all')
                this.$store.dispatch('posts', response.data)
            },
            async listComment() {
                const response = await axios.get('/comment')
                this.$store.dispatch('comments', response.data)
            }
        },
        mounted: function() {
            this.listPosts(),
            this.listComment()
        }
    }
</script>

<style lang="scss">
    .post {
        border: solid 1px black;
        padding: 10px;
    }

    .comment {
        border: solid 1px black;
        padding: 10px;
    }

    .postAndComment {
        margin: 10px;
    }
</style>