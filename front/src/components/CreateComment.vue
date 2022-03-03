<template>
    <div id="createComment">
        <textarea class="form-control" require v-model="content"  placeholder="Ecrivez un commentaire..."></textarea>
        <button class="btn btn-primary" @click.prevent="createComment(idPost)" >Commenter</button>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'CreateComment',
        data() {
            return {
                content: ''
            }
        },
        props: {
            idPost : Number
        },
        methods : {
            async createComment(idPost) {
                let content = this.content

                await axios.post(`/post/${idPost}/comment/publish`, {
                    content
                })
                const response = await axios.get('/comment')
                this.$store.dispatch('comments', response.data)
                this.content = ''
            }
        }
    }
</script>

<style>
    #createComment .form-control {
        margin: 15px auto 10px auto;
        width: 50%;
    }
</style>