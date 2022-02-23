<template>
    <div div="modifPost" >
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasWithBackdrop" aria-labelledby="offcanvasWithBackdropLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasWithBackdropLabel">Modifier votre message :</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <input class="form-control" require v-model="modifTitle" placeholder="Votre titre !"/>
                <textarea  rows="6" require v-model="modifContent" class="form-control" placeholder="Que voulez-vous dire?"></textarea>
                <input class="form-control" type="file" id="modiffile" ref="modifFile" accept="image/png, image/jpeg" @change="modifFileUpload()">
                <button  @click.prevent="updatePost(postId)" class="btn btn-primary">Modifier</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'ModifPost',
        data() {
            return {
                modifTitle:'',
                modifContent:'',
                modifTitleAttachment:''
            }
        },
        props: {
            postId : Number
        },
        methods : {
            async updatePost(id) {

                let body = new FormData();
                body.append('title', this.modifTitle);
                body.append('content', this.modifContent);

                if (this.modifAttachement !== '') {
                    body.append('attachment', this.modifAttachment)
                }

                await axios.put('/post/'+id,
                    body
                );
                const response = await axios.get('/post/all')
                this.$store.dispatch('posts', response.data)
            },
            modifFileUpload() {
                this.modifAttachment = this.$refs.modifFile.files[0];
            }
        }

    }
</script>

<style>

</style>