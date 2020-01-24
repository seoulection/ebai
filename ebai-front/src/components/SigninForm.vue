<template>
  <div class="signin">
    <form class="signin-form" v-on:submit.prevent="handleLogin">
      <label class="form-label" for="email">
        Email Address*:
        <input id="email" type="email" v-model="email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" required title="Invalid email format"> 
      </label>
      <label class="form-label" for="password">
        Password*:<br />
        <input id="password" type="password" v-model="password" required>
      </label>
      <button type="submit">Login</button>
    </form>
    <h3 id="error" v-if="error">{{ error }}</h3>
  </div>
</template>

<script>
import { loginUser } from '@/api/users'

export default {
  name: 'signin',
  data () {
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async handleLogin () {
      this.errors = []
      var data = {
        user: {
          email: this.email,
          password: this.password,
        }
      }
      try {
        await loginUser(data)
        this.loginSuccessful()
      } catch (err) {
        this.loginFailed()
      }
    },
    loginSuccessful () {
      this.$router.push({ name: 'dashboard' }) 
      this.$emit('loginSuccessful')
    },
    loginFailed () {
      this.error = 'Invalid credentials'
    }
  }
}
</script>

<style scoped>
  .signin-form label {
    text-align: left;
  }
</style>
