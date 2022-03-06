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
                        console.log(error.response.data.errors);
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
        margin : 10% auto 10% auto;
        width: 70%;
        text-align: center;
        vertical-align: middle;
        border: grey 1px solid ;
        border-radius: 20px;
        box-shadow: 10px 10px 30px grey ;
        padding: 15px;
        background-color:rgb(33,37,41);
        color: whitesmoke;
        button {
            margin: 10px;
        }
        label {
            font-size:  2vw;
            margin-top: 15px;
        }
    }

    .red {
        color: red ;
    }

   .warningMessage {
       color: red ;
   }

    .droite {
        float: right;
    }
    
</style>