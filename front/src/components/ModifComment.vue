<template>
    <div div="modifComment" >
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasWithBackdrop2" aria-labelledby="offcanvasWithBackdropLabel2">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasWithBackdropLabel2">Modifier votre commentaire :</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <textarea require v-model="modifContent" rows="8" class="form-control" placeholder="Que voulez-vous dire?"></textarea>
                <p class="warningMessage" v-if="this.errors.content"> {{errors.content.msg}}</p>
                <button  @click.prevent="updateComment(idPostModif, idComment)" class="btn btn-primary">Modifier</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'ModifComment',
        data() {
            return {
                modifContent:'',
                errors: ''
            }
        },
        props: {
            idComment : Number,
            idPostModif : Number
        },
        methods : {
            async updateComment(idPost, idComment) {
                let content = this.modifContent
                await axios.put(`/post/${idPost}/comment/${idComment}`,{
                    content
                })
                .catch((error) => {
                    if (error.response.data.errors) {
                        this.errors = error.response.data.errors
                    }     
                })
                .then((error) => { 
                    if (error) {
                        this.modifContent = '';
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
    .form-control {
        width: 100%;
        margin: 0 0 15px 0;
    }
</style>