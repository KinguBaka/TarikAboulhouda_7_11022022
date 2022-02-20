<template>
    <div id="createComment">
        <textarea require v-model="content"  placeholder="Ecrivez un commentaire..."></textarea>
        <button  @click.prevent="createComment(idPost)" >Commenter</button>
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
            }
        }
    }
</script>

<style>

</style>