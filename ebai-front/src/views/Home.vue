<template>
  <div class="home">
    <h1>On sale now!</h1>
    <div id="auctions">
      <AuctionListing v-for="auction in auctions" :auction="auction" :key="auction.id" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import AuctionListing from '@/components/AuctionListing'

export default {
  name: 'home',
  components: {
    AuctionListing
  },
  data () {
    return {
      auctions: []
    }
  },
  created () {
    this.getAuctions()
  },
  methods: {
    async getAuctions() {
      const response = await axios.get('http://localhost:3000/auctions')
      this.auctions = response.data
    }
  }
}
</script>

<style scoped>
  #auctions {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
</style>