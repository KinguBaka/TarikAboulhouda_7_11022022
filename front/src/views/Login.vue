<template>
  <div id="login">
      <form @submit.prevent="login">
          <h2>se connecter</h2>
          <label>email</label>
          <input required v-model="email" type="text">
          <label  >mot de passe</label>
          <input required v-model="password" type="password">
          <button type="submit">se connecter</button>
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
                    console.log("vous etes connecté !");
                })
                .then( async () => {
                    const response2 = await axios.get('/me')
                    this.$store.dispatch('user', response2.data)
                    this.$router.push('/');
                })
            }
        }
    }
</script>

<style lang="scss">
    #login {

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