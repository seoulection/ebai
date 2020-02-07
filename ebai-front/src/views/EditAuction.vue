<template>
  <div class="edit-auction">
    <div class="edit-auction-form" v-if="authorized">
      <h2>Edit auction</h2>
      <EditAuctionForm :auctionTitle="title" :auctionDescription="description" />
    </div>
    <ErrorComponent v-else />
  </div>
</template>

<script>
import EditAuctionForm from '@/components/EditAuctionForm'
import ErrorComponent from '@/components/ErrorComponent'
import { showAuction } from '@/api/auctions'

export default {
  name: 'editAuction',
  components: {
    EditAuctionForm,
    ErrorComponent
  },
  data () {
    return {
      title: '',
      description: '',
      error: '',
      authorized: true
    }
  },
  created () {
    this.authenticateUser()
  },
  methods: {
    async authenticateUser() {
      try {
        const { data: { auction: { title, description, user_id } } } = await showAuction(this.$route.params.id)
        if (user_id == this.$store.state.user.userId) {
          this.title = title
          this.description = description
        } else {
          this.authorized = false
          throw new Error('Not authorized')
        }
      } catch(err) {
        console.log(err)
        this.error = err
      }
    }
  }
}
</script>

<style scoped>
  .create-auction {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
