<template>
  <div id="login">
      <form @submit.prevent="login">
          <h2>Se connecter</h2>
          <label>Email</label>
          <br>
          <input class="form-control" required v-model="email" type="text">
          <br>
          <label>Mot de passe</label>
          <br>
          <input class="form-control" required v-model="password" type="password">
          <br>
          <button class="btn btn-primary" type="submit">se connecter</button>
      </form>
  </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Login',
        data() {
            return {
                email: '',
                password: ''
            }
        }, 
        methods : {
            async login() {

                await axios.post('/login', {
                    email: this.email,
                    password: this.password
                })
                .then((response) => {
                    localStorage.setItem('token', response.data.token)
                    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
                })
                .then( () => {
                    this.getUserProfil()
                    this.$router.push('/');
                })
                .catch((error) => {
                    window.alert(error.response.data.error);
                })
            }, 
            async getUserProfil() {
                await axios.get('/me')
                .then((response) =>{
                    this.$store.dispatch('user', response.data)
                })
            }
        }
    }
</script>

<style lang="scss">

    #login {
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

    }
    
</style>