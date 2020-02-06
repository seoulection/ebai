<template>
  <div>
    <h2>{{ user.first_name }} {{ user.last_name }}</h2>
    <h4>{{ user.email }}</h4>
    <h5>{{ user.password_digest }}</h5>
  </div>
</template>

<script>
export default {
  props: ['user']
}
</script>