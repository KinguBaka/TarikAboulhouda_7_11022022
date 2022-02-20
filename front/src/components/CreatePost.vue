<template>
    <div id="createPost">
        <h2>Postez votre message !</h2>
        <input require v-model="title" placeholder="Votre titre !"/>
        <textarea require rows="5" v-model="content" placeholder="Que voulez-vous dire?"></textarea>
        <input type="file" id="file" ref="file" accept="image/png, image/jpeg" @change="handleFileUpload()">
        <button  @click.prevent="createMessage" class="btn btn-primary">Publier</button>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'CreateMessage',
        data(){
            return {
                title:'',
                content:'',
                attachment: ''
            }
        },
        methods : {
            async createMessage() {
                let body = new FormData();
                body.append('title', this.title);
                body.append('content', this.content);
                body.append('attachment', this.attachment)

                await axios.post('/post/publish', body)
                const response = await axios.get('/post/all')
                this.$store.dispatch('posts', response.data)
            },
            handleFileUpload() {
                this.attachment = this.$refs.file.files[0];
            }
        }
    }
</script>

<style>

</style>