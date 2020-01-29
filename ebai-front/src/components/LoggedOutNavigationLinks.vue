<template>
  <ul class="column-50 nav-links">
    <li class="nav-link"><router-link to="/">Home</router-link></li>
    <li class="nav-link"><router-link to="/signup">Register</router-link></li>
    <li class="nav-link"><a class="loginLink" @click="loginClicked()">Login</a></li>
  </ul>
</template>

<script>
import EventBus from '@/eventBus.js'

export default {
  name: 'LoggedOutNavigationLinks',
  methods: {
    loginClicked() {
      EventBus.$emit('loginClicked')
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