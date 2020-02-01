<template>
  <div id="app" class="container">
    <NavigationBar :loggedIn=isLoggedIn @loggedOut="setLoggedOut" />
    <SigninModal v-if="isModalVisible" @close="closeModal" />
    <router-view/>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar'
import SigninModal from '@/components/SigninModal'
import { checkIfLoggedIn } from '@/api/users'
import EventBus from '@/eventBus'

export default {
  name: 'app',
  components: {
    SigninModal,
    NavigationBar
  },
  data () {
    return {
      isModalVisible: false,
      isLoggedIn: false
    }
  },
  beforeMount () {
    this.checkLoginStatus()
  },
  mounted() {
    this.showModalListener()
  },
  methods: {
    showModalListener () {
      EventBus.$on('loginClicked', () => {
        this.isModalVisible = true });
    },
    closeModal () {
      this.isModalVisible = false
      this.checkLoginStatus()
    },
    async checkLoginStatus () {
      try {
        await checkIfLoggedIn()
        this.isLoggedIn = true
      } catch {
        this.loggedIn = false
      }
    },
    setLoggedOut () {
      this.isLoggedIn = false
    }
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