<template>
  <div class="user-list">
    <section v-for="(user, index) in users" v-bind:key="index">
      <UserCard :user="user" />
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import UserCard from '@/components/UserCard'

export default {
  name: 'userList',
  components: {
    UserCard
  },
  data () {
    return {
      users: []
    }
  },
  created () {
    axios.get('http://localhost:3000/users')
      .then(res => {
        this.users = res.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
