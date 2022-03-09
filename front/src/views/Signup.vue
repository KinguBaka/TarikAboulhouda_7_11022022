<template>
    <div id="signup">
        <form  @submit.prevent="signup">
            <h2>S'inscrire</h2>
            <label>Email <span class="red">*</span></label>
            <input class="form-control" required v-model="email" type="text" placeholder="email@email.com"/>
            <p class="warningMessage" v-if="this.errors.email"> {{errors.email.msg}}</p>
            <label>Mot de passe <span class="red">*</span></label>
            <input class="form-control" required v-model="password" type="password" placeholder="Password"/>
            <p class="warningMessage" v-if="this.errors.password"> {{errors.password.msg}}</p>
            <label>Username <span class="red">*</span></label>
            <input class="form-control" required v-model="username" type="text" placeholder="toto"/>
            <p class="warningMessage" v-if="this.errors.username"> {{errors.username.msg}}</p>
            <label for="bio">Bio</label>
            <textarea class="form-control" v-model="bio" type="text" placeholder="Présentez-vous"></textarea>
            <p class="warningMessage" v-if="this.errors.bio"> {{errors.bio.msg}}</p>
            <span class="red droite">* champ obligatoire</span> <br>
            <button class="btn btn-primary" type="submit">S'inscrire</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Signup',
        data() {
            return {
                email:'',
                username:'',
                password:'',
                bio:'',
                errors:{}
            }
        },
        methods : {
            async signup(){
                await axios.post('/signup',
                {
                    email: this.email,
                    username: this.username,
                    password: this.password,
                    bio: this.bio
                })
                .catch((error) => {
                    if (error.response.data.error) {
                        window.alert(error.response.data.error);
                    } else if (error.response.data.errors) {
                        this.errors = error.response.data.errors
                    }     
                })
                .then((error) => {
                    if (error) {
                        this.$router.push('/login')
                    }
                })
            }
        }
    }
</script>

<style lang="scss">

    #signup {
        margin : 10% ;
        text-align: center;
        vertical-align: middle;
        border-radius: 20px;
        box-shadow: 0px 0px 23px 8px rgba(0,0,0,0.15);
        padding: 15px;
        background-color:#FFFF;
        color: black;

        label {
            font-size:  20px;
            margin-top: 15px;
        }

        .form-control {
            margin: 5px auto 10px auto;
            max-width: 500px;
        }

        .droite {
            float: right;
        }

        .red {
            color: red ;
        }
    }

    
</style>