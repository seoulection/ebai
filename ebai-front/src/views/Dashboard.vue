<template>
  <div class="dashboard">
    <div class="dashboard-details" v-if="isUserLoaded()">
      <h2 class="dashboard-title">This is the dashboard</h2>
      <button type="button" @click='goToNewAuction'> Create new auction </button>
    </div>
    <h2 class="error" v-if="error">{{ error }}</h2>
  </div>
</template>

<script>
import { getUserDashboard } from '@/api/users'

export default {
  name: 'dashboard',
  data () {
    return {
      user: {},
      userAuctions: [],
      error: ''
    }
  },
  created () {
    this.getDashboard()
  },
  methods: {
    goToNewAuction() {
      this.$router.push({name: 'createAuction'})
    },
    async getDashboard () {
      try {
        const { data: { user, auctions }} = await getUserDashboard()
        this.user = user
        this.userAuctions = auctions
      } catch (err) {
        this.error = err
      }
    },
    isUserLoaded () {
      return Object.entries(this.user).length > 0
    }
  }
}
</script>