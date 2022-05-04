<template>
    <div id="update">
        <router-link id="exit" :to="`/profilUser/${this.user.id}`">
            <i class="fas fa-times" ></i>
        </router-link>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div id="email1">
                    <i class="fas fa-edit" @click.prevent="modifEmail"></i>
                    <h2>Adresse email : <br> {{user.email}} </h2>
                
                </div>
                <div id="email2">
                    <i class="fas fa-times" @click.prevent="modifEmail"></i>
                    <form @submit.prevent="updateProfil">
                        <label> Nouvelle adresse email : </label> <br>
                        <input class="form-control" v-model="email" type="text" :placeholder="user.email" autocomplete="off"/>
                         <p class="warningMessage" v-if="this.errors.email"> {{errors.email.msg}}</p>
                        <button class="btn btn-primary" type="submit">Modifier</button>
                    </form>
                    
                </div>
            </li>
            <li class="list-group-item">
                <div id="mdp1">
                    <i class="fas fa-edit" @click.prevent="modifMdp"></i>
                   <h2> Mot de passe </h2>
                </div>
                <div id="mdp2">
                    <i class="fas fa-times" @click.prevent="modifMdp"></i>
                    <form @submit.prevent="updateProfil()">
                        <label> Nouveau mot de passe : </label> <br>
                        <input class="form-control" v-model="password" type="password" placeholder="Password" autocomplete="off"/>
                        <p class="warningMessage" v-if="this.errors.password"> {{errors.password.msg}}</p>
                        <button class="btn btn-primary" type="submit">Modifier</button>
                    </form>
                </div>
            </li>
            <li class="list-group-item">
                <div id="username1">
                    <i class="fas fa-edit" @click.prevent="modifUsername"></i>
                    <h2>Username : <br> {{user.username}} </h2>
                </div>
                <div id="username2">
                    <i class="fas fa-times" @click.prevent="modifUsername"></i>
                    <form @submit.prevent="updateProfil()">
                        <label> Nouveau username : </label> <br>
                        <input class="form-control" v-model="username" type="text" :placeholder="user.username"/>
                        <p class="warningMessage" v-if="this.errors.username"> {{errors.username.msg}}</p>
                        <button class="btn btn-primary" type="submit">Modifier</button>
                    </form>
                </div>
            </li>
            <li class="list-group-item">
                <div id="bio1">
                    <i class="fas fa-edit" @click.prevent="modifBio"></i>
                    <h2>Bio : <br> {{user.bio}} </h2>
                </div>
                <div id="bio2">
                    <i class="fas fa-times" @click.prevent="modifBio"></i>
                    <form @submit.prevent="updateProfil()">
                        <label> Nouvelle bio : </label> <br>
                        <textarea class="form-control" rows="5" cols="33" v-model="bio" :placeholder="user.bio"></textarea>
                        <p class="warningMessage" v-if="this.errors.bio"> {{errors.bio.msg}}</p>
                        <button class="btn btn-primary" type="submit">Modifier</button>
                    </form>
                </div>
            </li>
        </ul>

        <button type="button" class="btn btn-danger" @click.prevent="deleteProfil()">Supprimer son profil</button>

    </div>

</template>

<script>
    import {mapGetters} from 'vuex'
    import axios from 'axios'

    export default {
        name: 'Update',
        data() {
            return {
                email: null,
                password: null,
                username: null,
                bio: null,
                errors: ''
            }
        },
        computed: {
            ...mapGetters(['user'])
        },
        methods: {
            
            async deleteProfil(){
                await axios.delete('/me')
                localStorage.removeItem('token');
                sessionStorage.clear();
                this.$store.dispatch('user', null);
                this.$store.dispatch('posts', null);
                this.$store.dispatch('comments', null);
                this.$store.dispatch('idProfil', null);
                this.$router.push('/').catch(err => {
                // Ignore the vuex err regarding  navigating to the page they are already on.
                    if (
                        err.name !== 'NavigationDuplicated' &&
                        !err.message.includes('Avoided redundant navigation to current location')
                    ) {
                        // But print any other errors to the console
                        console.log(err);
                    }
                });
            },
            async updateProfil() {
                
                    let email = !this.email ? null: this.email
                    let username = !this.username ? null: this.username
                    let password = !this.password ? null: this.password
                    let bio = this.bio
                    let body = {}
                    const data = {
                        email,
                        username,
                        password,
                        bio
                    }

                    const newData = Object.keys(data).filter(key =>
                        data[key] != null
                    )
                    
                    for (let newValue of newData) {
                        body[newValue] = data[newValue]
                    }

                await axios.put('/me',
                   body
                )
                .catch((error) => {
                    if (error.response.data.errors) {
                        this.errors = error.response.data.errors
                    }     
                })
                .then((error) => {
                    if (error) {
                        this.$router.push(`/profilUser/${this.user.id}`);
                    }
                })
                const response2 = await axios.get('/me')
                this.$store.dispatch('user', response2.data)
            },
            modifEmail() {
                let email1 = document.getElementById("email1");
                let email2 = document.getElementById("email2");
                if(getComputedStyle(email1).display != "none"){
                    email1.style.display = "none";
                    email2.style.display = "block";
                } else {
                    email1.style.display = "block";
                    email2.style.display = "none";
                }
            },
            modifMdp() {
                let mdp1 = document.getElementById("mdp1");
                let mdp2 = document.getElementById("mdp2");
                if(getComputedStyle(mdp1).display != "none"){
                    mdp1.style.display = "none";
                    mdp2.style.display = "block";
                } else {
                    mdp1.style.display = "block";
                    mdp2.style.display = "none";
                }
            },
            modifUsername() {
                let username1 = document.getElementById("username1");
                let username2 = document.getElementById("username2");
                if(getComputedStyle(username1).display != "none"){
                    username1.style.display = "none";
                    username2.style.display = "block";
                } else {
                    username1.style.display = "block";
                    username2.style.display = "none";
                }
            },
            modifBio() {
                let bio1 = document.getElementById("bio1");
                let bio2 = document.getElementById("bio2");
                if(getComputedStyle(bio1).display != "none"){
                    bio1.style.display = "none";
                    bio2.style.display = "block";
                } else {
                    bio1.style.display = "block";
                    bio2.style.display = "none";
                }
            }
        }
    }
</script>

<style lang="scss">

    #update {
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        text-align: center;

        label {
            font-size: 20px;

        }

        ul {
            margin: 50px 0 50px 0;
            border-radius: 50px;
            i {
                color: #1b5ad4;
                font-size: 3vmin;
                float: right;

            }
        }

        i:hover {
            cursor: pointer;
        }

        li {
            padding: 20px 30px 20px 30px;
            background-color:#FFFF;
            color: black;
        }

        #exit i{
           color: #1b5ad4;
            font-size: 2vmax;
            position: relative;
            margin-right: -100% ;
            margin-top: 20px;
            text-decoration: none;
        }

        form .form-control {
            text-align: center;
            margin-left: auto;
            margin-right: auto;
            max-width: 500px;
        }

        #email2 {
            display: none
        }
        #mdp2 {
            display: none
        }
        #username2 {
            display: none
        }
        #bio2 {
            display: none
        }
    }
</style>