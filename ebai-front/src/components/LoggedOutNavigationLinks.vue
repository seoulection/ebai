<template>
  <ul class="column-50 nav-links">
    <li class="nav-link"><router-link to="/">Home</router-link></li>
    <li class="nav-link"><router-link to="/signup">Register</router-link></li>
    <li class="nav-link"><a class="loginLink" v-on:click="loginClicked">Login</a></li>
  </ul>
</template>

<script>
export default {
  name: 'LoggedOutNavigationLinks',
  methods: {
    loginClicked () {
      this.$emit('loginClicked')
    }
  }
}
</script>

<style scoped>
  .nav-link {
    padding: 0 0.5rem;
  }

  .nav-links {
    display: flex;
    list-style: none;
  }
  
  .loginLink {
    cursor: pointer;
  }

  li + li::before {
    content: " | ";
  }
</style>