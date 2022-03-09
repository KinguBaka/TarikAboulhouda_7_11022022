<template>
  <div id="app">
    <Navbar/>
    <router-view/>
    <ScrollUp />
  </div>
</template>

<script>
  import Navbar from './components/Navbar.vue'
  import ScrollUp from './components/ScrollUp.vue'

  export default {
    name: 'App',
    components: {
      Navbar,
      ScrollUp
    }
  }
</script>

<style>
  html {
    background-color: #f7f7f8;
  }
  #app {
    background-color: #f7f7f8;
    height: 100%;
  }

  h1{
    font-size: 5vw;
  }

  h2 {
    font-size: 24px;
  }

  h3 {
    font-size: 20px;
  }

  p {
    font-size: .9375rem;
  }

  button {
    width: 120px;
  }

  img {
    max-width: 100%;
  }

  html, body{
    margin :0;
    padding: 0;
    height: 100%;
  }
</style>