<template>
  <ul class="column-50 nav-links">
    <li class="nav-link"><router-link to="/">Home</router-link></li>
    <li class="nav-link"><router-link to="/users">Show All Users</router-link></li>
    <li class="nav-link"><router-link to="/" class="logoutLink" @click.native="logout">Logout</router-link></li>
  </ul>
</template>

<script>
export default {
  name: 'LoggedInNavigationLinks',
  methods: {
    logout () {
      this.$emit('logoutClicked')
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