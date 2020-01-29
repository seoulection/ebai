<template>
  <nav id="navigation" class="row">
    <div class="column-50">
      <div class="ebai-name">
        <h1>Ebai</h1>
        <p> Like Ebay but with an i </p>
      </div>
    </div>
    <LoggedInNavigationLinks v-if="loggedIn" @logoutClicked="logout" />
    <LoggedOutNavigationLinks v-if="!loggedIn"/>
  </nav>
</template>

<script>
import { logoutUser } from '@/api/users'
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
      try {
        await logoutUser()
        this.$emit('loggedOut')
      } catch (e) {
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