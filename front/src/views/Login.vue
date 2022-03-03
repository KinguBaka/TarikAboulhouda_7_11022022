<template>
  <div id="login">
      <form @submit.prevent="login">
          <h2>se connecter</h2>
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
                    console.log(localStorage.getItem('token'));
                    console.log("vous etes connecté !");
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
    }
    #login label {
        font-size:  2vw;
        margin-top: 15px;
    }
    #login .form-control {
        margin: 5px auto 10px auto;
        width: 40%;
    }
    
</style>