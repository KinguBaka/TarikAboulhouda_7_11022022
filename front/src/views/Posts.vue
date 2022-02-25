<template>
    <div id="posts">
        <CreatePost />
        <div v-for="post of posts" :key="post.id" class="card postAndComment">
            <div :id="post.id" class="onePost">
                <div v-if="post.UserId === user.id || user.isAdmin == true" class="dropdown">
                    <i class="fas fa-edit edit" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></i>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li>
                            <button v-if="post.UserId === user.id || user.isAdmin === true" class="btn btn-danger" @click.prevent="deletePost(post.id)">Supprimer</button>
                        </li>
                        <li>
                            <button v-if="post.UserId === user.id" class="btn btn-primary" @click.prevent="modifPost(post.id)" data-bs-toggle="offcanvas" 
                            data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">Modifier</button>
                        </li>
                    </ul>
                </div>
                <h2><i class="far fa-user"></i> <router-link to="/profilUser" @click="userProfil(post.UserId)">{{ post.User.username }}</router-link> </h2>
                <h3> {{ post.title }} </h3>
                <p> {{ post.content }} </p>
                <img v-if="post.attachment" :src="post.attachment"/>
                <p> {{ post.likes }} likes </p>
                <LikePost :postId="post.id" :postUsersLiked="post.usersLiked" :userId="user.id" />
                <p class="date"> {{ format_date(post.createdAt) }} </p>
            </div>
            <div v-for="comment of comments" :key="comment.id">
                <div v-if="comment.PostId === post.id" class="oneComment">
                    <div class="dropdown" v-if="comment.UserId === user.id || user.isAdmin === true">
                        <i class="fas fa-edit edit" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></i>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li>
                                <button v-if="comment.UserId === user.id || user.isAdmin === true" class="btn btn-danger" @click.prevent="deleteComment(comment.PostId, comment.id)">Supprimer</button>
                            </li>
                            <li>
                                <button v-if="comment.UserId === user.id" class="btn btn-primary" @click.prevent="modifComment(comment.id, comment.PostId)" data-bs-toggle="offcanvas" 
                                data-bs-target="#offcanvasWithBackdrop2" aria-controls="offcanvasWithBackdrop2">Modifier</button>
                            </li>
                        </ul>
                    </div>
                    <div class="commentContent">
                        <router-link to='/profilUser' class="commentUsername" @click="userProfil(comment.UserId)"> {{comment.User.username}} </router-link>
                        <p> {{comment.content}} </p>
                        <p class="date"> {{format_date(comment.createdAt)}} </p>
                    </div>
                </div>
            </div>
            <CreateComment :idPost="post.id" />
        </div>
        <ModifPost :postId="this.modifPostId" />
        <ModifComment :idPostModif="this.modifCommentPostId" :idComment="modifCommentId" />
    </div>
</template>

<script>
    import axios from 'axios'
    import {mapGetters} from 'vuex'
    import format_date from '../moment/moment'
    import CreatePost from '../components/CreatePost.vue'
    import CreateComment from '../components/CreateComment.vue'
    import ModifPost from '../components/ModifPost.vue'
    import LikePost from '../components/LikePost.vue'
    import ModifComment from '../components/ModifComment.vue'

    export default {
        name: 'Posts',
        data() {
            return {
                modifPostId: 0,
                modifCommentId: 0,
                modifCommentPostId: 0,
                profilUserId: 0
            }
        },
        computed : {
            ...mapGetters(['posts']),
            ...mapGetters(['comments']),
            ...mapGetters(['user'])
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
            },
            modifPost(id) {
                this.modifPostId = id
            },
            async deletePost(id) {
                await axios.delete('/post/'+ id)
                const response = await axios.get('/post/all')
                this.$store.dispatch('posts', response.data)
            },
            async deleteComment(idPost, idComment) {
                await axios.delete(`/post/${idPost}/comment/${idComment}`)
                const response = await axios.get('/comment')
                this.$store.dispatch('comments', response.data)
            },
            modifComment(idComment, idPost) {
                this.modifCommentId = idComment,
                this.modifCommentPostId= idPost
            },
            userProfil(id) {
                this.$store.dispatch('idProfil', id)
            }
        },
        mounted: function() {
            this.listPosts(),
            this.listComment()
        },
        components : {
            CreatePost,
            CreateComment,
            ModifPost,
            LikePost,
            ModifComment
        }
    }
</script>

<style lang="scss">
    #posts {
        width: 70%;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
    }

    .postAndComment {
        margin: 30px 0 30px 0;
        padding: 15px 0 15px 0;
        background: linear-gradient(rgb(54, 54, 54), rgb(80, 79, 79));
        border-radius: 20px;
        border: rgb(189, 189, 189) 1px solid
    }

    .dropdown ul {
        background-color: rgb(33,37,41);
        text-align: center;
    }
    .dropdown button {
        width: 80%;
        margin: 3px;
    }
    .onePost {
        margin: 10px 30px 5px 30px;
        padding: 10px;
        border-radius: 50px;
        background-color:rgb(33,37,41);
        color: whitesmoke;
        .edit{
            margin: 15px;
            font-size: 2vw;
            position: absolute;
            right: 0;
            color: rgb(119, 119, 119);
        }
    }
    .oneComment .edit{
        margin: 15px;
        font-size: 1.5vw;
        position: absolute;
        right: 0;
        color: rgb(119, 119, 119);
    }
    .commentUsername {
        color: #cfa544;
    }
    .oneComment {
        margin: 5px 30px 5px 30px;
        padding: 10px;
        border-radius: 50px;
        background-color:rgb(33,37,41);
        color: whitesmoke;
    }
    .commentContent {
        
        padding: 7px;
        border-radius: 20px;
        margin: 5px 0 5px 0;
    }
    .commentContent p {
        margin-bottom: 3px;
    }
    .date {
        font-size: 1vw;
    }
</style>