<template>
  <div class="signup container">
    <h1>Create an account</h1>
    <form v-on:submit.prevent="handleSubmit">
      <div class="row">
        <label class="column form-label" for="firstName">
          First Name*:
          <input id="firstName" type="text" v-model="firstName" required>
        </label>
        <label class="column form-label" for="lastName">
          Last Name*:
          <input id="lastName" type="text" v-model="lastName" required>
        </label>
      </div>
      <label class="form-label" for="email">
        Email Address*:
        <input id="email" type="email" v-model="email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" required title="Invalid email format"> 
      </label>
      <label class="form-label" for="password">
        Password*:<br />
        <span class="info">Password must contain letters, numbers, and at least one special character from the following: !@#$%.<br>It cannot start with a digit or special character.</span>
        <input id="password" type="password" v-model="password" pattern="^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}" required title="Invalid password format">
      </label>
      <button type="submit">Register</button>
    </form>
    <h3 id="error" v-if="error">{{ error }}</h3>
  </div>
</template>

<script>
import { createUser } from '@/api/users'

export default {
  data () {
    return {
      firstName: '',
      lastName: '',
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
          first_name: this.firstName,
          last_name: this.lastName,
          email: this.email,
          password: this.password,
        }
      }

      try {
        await createUser(data)
        this.$router.push({ name: 'success' })
      } catch(err) {
        if (err.response && err.response.status === 422) {
          this.error = 'Email is already taken. Please try again!'
        } else {
          this.error = err
        }
      }
    }
  }
}
</script>

<style scoped>
h3 {
  color: red;
}
.info {
  font-size: 1rem;
}
.form-label {
  text-align: left;
}
.container {
  max-width: 70rem;
}
</style>
