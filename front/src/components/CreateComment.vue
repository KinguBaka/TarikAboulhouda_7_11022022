<template>
    <div id="createComment">
        <textarea class="form-control" require v-model="content"  placeholder="Ecrivez un commentaire..."></textarea>
        <p class="warningMessage" v-if="this.errors.content"> {{errors.content.msg}}</p>       
        <button class="btn btn-primary" @click.prevent="createComment(idPost)" >Commenter</button>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'CreateComment',
        data() {
            return {
                content: '',
                errors: ''
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
                .catch((error) => {
                    if (error.response.data.errors) {
                        this.errors = error.response.data.errors
                    }     
                })
                .then((error) => { 
                    if (error) {
                        this.content = '';
                        this.errors = '';
                    }
                })
                const response = await axios.get('/comment')
                this.$store.dispatch('comments', response.data)
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