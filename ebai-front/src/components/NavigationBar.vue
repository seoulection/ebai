<template>
  <nav id="navigation" class="row">
    <div class="column-50">
      <div class="ebai-name">
        <h1>Ebai</h1>
        <p> Like Ebay but with an i </p>
      </div>
    </div>
    <LoggedInNavigationLinks v-if="loggedIn" @logoutClicked="logout" />
    <LoggedOutNavigationLinks v-if="!loggedIn" v-on="$listeners" />
  </nav>
</template>

<script>
import axios from 'axios'
import LoggedInNavigationLinks from '@/components/LoggedInNavigationLinks'
import LoggedOutNavigationLinks from '@/components/LoggedOutNavigationLinks'

export default {
  name: 'NavigationBar',
  props: {
    loggedIn: Boolean
  },
  components: {
    LoggedInNavigationLinks,
    LoggedOutNavigationLinks
  },
  methods: {
    async logout() {
      console.log('in logout')
      try {
        const res = await axios.delete('http://localhost:3000/signin', {
          withCredentials: true
        })
        this.$emit('loggedOut')
        console.log(res)
      } catch (e){
        console.log(e)
      }
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
</style>