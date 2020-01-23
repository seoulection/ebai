<template>
  <div class="users">
    <UserList />
  </div>
</template>

<script>
import UserList from '@/components/UserList'

export default {
  name: 'users',
  components: {
    UserList
  }
}
</script>
