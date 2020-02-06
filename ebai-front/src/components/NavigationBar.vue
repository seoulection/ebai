<template>
  <nav id="navigation" class="row">
    <div class="column-50">
      <div class="ebai-name">
        <h1>Ebai</h1>
        <p> Like Ebay but with an i </p>
      </div>
    </div>
    <ul class="column-50 nav-links">
      <li class="nav-link"><router-link to="/">Home</router-link></li>
      <li class="nav-link" v-if="!loggedIn"><router-link to="/signup">Register</router-link></li>
      <li class="nav-link"><router-link to="/users">Show All Users</router-link></li>
      <li class="nav-link" v-if="!loggedIn"><a class="loginLink" v-on:click="loginClicked">Login</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavigationBar',
  props: {
    loggedIn: Boolean
  },
  methods: {
    loginClicked () {
      this.$emit('loginClicked')
    }
  }
}
</script>

<style scoped>
  #navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .ebai-name {
    display: flex;
    flex-direction: column;
  }

  .ebai-name h1 {
    text-align: left;
    margin-bottom: 0;
  }

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