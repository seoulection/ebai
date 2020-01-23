<template>
  <div class="user-list">
    <section v-for="(user, index) in users" v-bind:key="index">
      <h2>{{ user.first_name }} {{ user.last_name }}</h2>
      <h4>{{ user.email }}</h4>
      <h5>{{ user.password_digest }}</h5>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      users: []
    }
  },
  created () {
    axios.get('http://localhost:3000/users')
      .then(res => {
        // eslint-disable-next-line no-console
        console.log(res.data)
        this.users = res.data
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
  }
}
</script>
