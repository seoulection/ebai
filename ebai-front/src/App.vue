<template>
  <div id="app" class="container">
    <NavigationBar />
    <router-view/>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar'

export default {
  name: 'app',
  components: {
    NavigationBar
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#navigation {
  padding: 30px;
}

#navigation a {
  font-weight: bold;
  color: #2c3e50;
}

#navigation a.router-link-exact-active {
  color: #9b4dca;
}

</style>
