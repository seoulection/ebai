<template>
  <div class="signup">
    <form v-on:submit.prevent="handleSubmit">
      <label for="first_name">
        First Name:
        <input id="first_name" type="text" v-model="first_name" required>
      </label>
      <label for="last_name">
        Last Name:
        <input id="last_name" type="text" v-model="last_name" required>
      </label>
      <br>
      <label for="email">
        Email Address:
        <input id="email" type="email" v-model="email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" required title="Invalid email format"> 
      </label>
      <br>
      <label for="password">
        Password:<br />
        <span>Password must contain letters, numbers, and at least one special character from the following: !@#$%. It cannot start with a digit or special character.</span>
        <input id="password" type="password" v-model="password" pattern="^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}" required title="Invalid password format">
      </label>
      <button type="submit">Submit</button>
    </form>
    <h3 v-if="error">{{ error }}</h3>
  </div>
</template>

<script>
import { createUser } from '@/api/users'

export default {
  data () {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async handleSubmit () {
      this.errors = []
      var data = {
        user: {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
        }
      }

      const status = await createUser(data)

      if (status === 201) {
        this.$router.push('/signup/success')
      } else {
        this.error = 'Username is already taken'
      }
    }
  }
}
</script>

<style scoped>
h3 {
  color: red;
}
</style>
