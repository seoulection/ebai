<template>
  <div class="create-auction">
    <h2>Create a new auction</h2>
    <CreateAuctionForm />
  </div>
</template>

<script>
import CreateAuctionForm from '@/components/CreateAuctionForm'

export default {
  name: 'createAuction',
  components: {
    CreateAuctionForm
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
