import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    setLoggedIn (state, { userId, loggedIn }) {
      state.user = {
        userId,
        loggedIn
      }
    },
    setLoggedOut (state) {
      state.user.userId = null
      state.user.loggedIn = false
    }
  }
})

export default store
