<template>
    <div id="createPost">
        <h2>Postez votre message !</h2>
        <input class="form-control" require v-model="title" placeholder="Votre titre !"/>
        <p class="warningMessage" v-if="this.errors.title"> {{errors.title.msg}}</p>
        <textarea require rows="5" class="form-control" v-model="content" placeholder="Que voulez-vous dire?"></textarea>
        <p class="warningMessage" v-if="this.errors.content"> {{errors.content.msg}}</p>
        <input class="form-control" type="file" id="file" ref="file" accept="image/png, image/jpeg" @change="handleFileUpload()">
        <button  @click.prevent="createPost" class="btn btn-primary">Publier</button>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'CreatePost',
        data(){
            return {
                title:'',
                content:'',
                attachment: '',
                errors: ''
            }
        },
        methods : {
            async createPost() {
                let body = new FormData();
                body.append('title', this.title);
                body.append('content', this.content);
                body.append('attachment', this.attachment)

                await axios.post('/post/publish', body)
                .catch((error) => {
                    if (error.response.data.errors) {
                        this.errors = error.response.data.errors
                    }     
                })
                .then((error) => { 
                    if (error) {
                        this.title = '';
                        this.content = '';
                        this.attachment = '';
                        document.getElementById("file").value = '';
                        this.errors = '';
                    }
                })
                const response = await axios.get('/post/all')
                this.$store.dispatch('posts', response.data)
            },
            handleFileUpload() {
                this.attachment = this.$refs.file.files[0];
            }
        }
    }
</script>

<style lang="scss">
    #createPost {
        text-align: center;
        vertical-align: middle;
        margin: 40px 0 40px 0;
        padding: 25px;
        background-color:#FFFF;
        border-radius: 20px;
        box-shadow: 0px 0px 23px 8px rgba(0,0,0,0.15);
        color: black;
        h2 {
            margin: 15px 0 30px 0;
        }
        .form-control {
            margin: 5px auto 10px auto;
            max-width: 500px;
        }
    }
</style>