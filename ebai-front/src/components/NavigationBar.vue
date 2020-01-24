<template>
  <nav id="navigation" class="row">
    <div class="column-50">
      <div class="ebai-name">
        <h1>Ebai</h1>
        <p> Like Ebay but with an i </p>
      </div>
    </div>
    <div class="column-50">
      <router-link to="/">Home</router-link> |
      <router-link to="/signup">Register</router-link> |
      <router-link to="/users">Show All Users</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavigationBar'
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
</style>