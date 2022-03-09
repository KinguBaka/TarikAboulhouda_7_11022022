<template>
    <div id="userPostAndComment">
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
                <h2> <router-link class="username" :to="`/profilUser/${post.UserId}`" @click="userProfil(post.UserId)"><i class="far fa-user"></i> {{ post.User.username }}</router-link> </h2>
                <p class="date"> {{ format_date(post.createdAt) }} </p>
                <h3> {{ post.title }} </h3>
                <p> {{ post.content }} </p>
                <img v-if="post.attachment" :src="post.attachment"/>
                <div class="postLike">
                    <p> {{ post.likes }} likes </p>
                    <LikePost :postId="post.id" :postUsersLiked="post.usersLiked" :userId="user.id" />
                </div>
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
                        <router-link :to="`/profilUser/${comment.UserId}`" class="username" @click="userProfil(comment.UserId)"><i class="far fa-user"></i> {{comment.User.username}} </router-link>
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
    import CreateComment from './CreateComment.vue'
    import ModifPost from './ModifPost.vue'
    import LikePost from './LikePost.vue'
    import ModifComment from './ModifComment.vue'


    export default {
        name: 'UserPostAndComment',
        data() {
            return {
                modifPostId: 0,
                modifCommentId: 0,
                modifCommentPostId: 0
            }
        },
        computed : {
            ...mapGetters(['posts']),
            ...mapGetters(['comments']),
            ...mapGetters(['user']),
            ...mapGetters(['idProfil'])
        },
        methods: {
            format_date,
            async listUserPosts(id) {
                const response = await axios.get(`/user/${id}/post`)
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
                const response = await axios.get(`/user/${this.idProfil}/post`)
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
                this.$forceUpdate()
            }
        },
        mounted: function() {
            this.listUserPosts(this.idProfil),
            this.listComment()
        },
        components : {
            CreateComment,
            ModifPost,
            LikePost,
            ModifComment
        }
    }
</script>

<style lang="scss">

    #userPostAndComment {
        text-align: center;
        margin-left: auto;
        margin-right: auto;

        a {
            text-decoration: none;
        }

        .postAndComment {
            margin: 30px 0 30px 0;
            padding: 15px 0 15px 0;
            box-shadow: 0px 0px 23px 8px rgba(0,0,0,0.15);
            border-radius: 20px;
            background-color:#FFFF;
            color: black;

            .username {
                color: #1b5ad4;
            }
        }

        .dropdown {
            ul {
                background-color: #f7f7f8;
                text-align: center;
            }
            button {
                margin: 3px;
            }
        }

        .onePost {
            padding: 10px;
            border-radius: 50px;

            .edit{
                margin: 15px;
                font-size: 2vw;
                position: absolute;
                right: 0;
                color: #1b5ad4;
            }
        }

        .oneComment {
        margin: 5px 30px 5px 30px;
        padding: 10px;
        border-radius: 50px;
        background-color:#f7f7f8;
        border:  solid #e7e7e7 1px;

            .edit{
                margin: 15px;
                font-size: 1.5vw;
                position: absolute;
                right: 0;
                color: #1b5ad4;
            }
        }

        .commentContent {
            padding: 7px;
            border-radius: 20px;
            margin: 5px 0 5px 0;

            p {
                margin-bottom: 3px;
            }
        }

        .date {
            font-size: .8000rem;
        }

        .postLike {
            display: flex;
            flex-direction: column;
            margin: 1vh 0 1vh 0;

            * {
                margin: 0.3vh;
            }
        }
    }
</style>