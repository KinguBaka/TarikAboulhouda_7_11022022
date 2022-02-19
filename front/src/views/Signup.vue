<template>
    <div id="signup">
        <form  @submit.prevent="signup">
            <h2>S'inscrire</h2>
            <label>Email</label>
            <input required v-model="email" type="text" placeholder="email@email.com"/>
            <label>Mot de passe <span class="red">*</span></label>
            <input required v-model="password" type="password" placeholder="Password"/>
            <label>Username <span class="red">*</span></label>
            <input required v-model="username" type="text" placeholder="toto"/>
            <label for="bio">Bio</label>
            <textarea v-model="bio" type="text" placeholder="Présentez-vous"></textarea>
            <span >* champ obligatoire</span> <br>
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
                bio:''
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
                });
                this.$router.push('/login');
            }
        }
    }
</script>

<style lang="scss">
    #signup {

        width: 70%;
        margin : 10% auto 10% auto;

        form {
            display: flex;
            text-align: center;
            vertical-align: middle;
            flex-direction: column;
        }
    }
    
</style>