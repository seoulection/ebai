<template>
  <div class="auction-listing">
    <router-link :to="auctionLink(auction.id)" class="auction-link">
      <div>
        <h2 class="auction-title">{{auction.title}}</h2>
        <img class="auction-image" :src="auction.image" :alt="auction.description">
      </div>
      <div>
        <p class="auction-current-bid-price">Current Bid Price: ${{auction.current_bid_price/ 100}}</p>
        <p class="auction-end-date">End Date: {{formatDate(auction.end_date)}}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'auctionListing',
  props: {
    auction: {}
  },
  methods: {
    auctionLink(id) {
      return "/auctions/" + id
    },
    formatDate(date) {
      return moment(date).format('MM-DD-YYYY')
    }
  }
}
</script>

<style>
.auction-listing {
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  margin-bottom: 5rem;
  width: 30%;
}

.auction-link {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>