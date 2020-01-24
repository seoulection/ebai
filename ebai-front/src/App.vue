<template>
  <div id="app" class="container">
    <NavigationBar :loggedIn=loggedIn @loginClicked="showModal" />
    <Modal v-show="isModalVisible" @close="closeModal" />
    <router-view/>
  </div>
</template>

<script>
import Modal from '@/components/Modal'
import NavigationBar from '@/components/NavigationBar'
import { checkIfLoggedIn } from '@/api/users'

export default {
  name: 'app',
  components: {
    Modal,
    NavigationBar
  },
  data () {
    return {
      isModalVisible: false,
      loggedIn: false
    }
  },
  beforeMount () {
    this.checkLoginStatus()
  },
  methods: {
    showModal () {
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    },
    async checkLoginStatus () {
      try {
        await checkIfLoggedIn()
        this.loggedIn = true
      } catch (err) {
        console.log(err)
      }
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
