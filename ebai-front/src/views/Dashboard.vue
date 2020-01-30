<template>
  <div class="dashboard">
    <h2 class="dashboard-title">This is the dashboard</h2>
    <button type="button" @click='goToNewAuction'> Create new auction </button>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  methods: {
    goToNewAuction() {
      this.$router.push({name: 'createAuction'})
    }
  }
}
</script>