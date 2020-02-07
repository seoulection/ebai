<template>
  <div class="auction-listing">
    <div>
      <router-link :to="auctionLink(auction.id)" class="auction-link">
        <h2 class="auction-title">{{auction.title}}</h2>
      </router-link>
       <router-link :to="auctionLink(auction.id)" class="auction-link">
        <img class="auction-image" :src="auction.image" :alt="auction.description">
      </router-link>
    </div>
    <div class="auction-details">
      <p class="auction-current-bid-price">Current Bid Price: ${{auction.current_bid_price/ 100}}</p>
      <p class="auction-end-date">End Date: {{formatDate(auction.end_date)}}</p>
      <Countdown v-if="auction.end_date" :starttime="currentDate" :endtime="endTime" trans='{  
         "day":"Day",
         "hours":"Hours",
         "minutes":"Minutes",
         "seconds":"Seconds",
         "expired":"Auction expired.",
         "running":"Till the end of auction.",
         "status": {
            "expired":"Expired",
            "running":"Running",
            "upcoming":"Future"
           }}' />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Countdown from '@/components/Countdown'

export default {
  name: 'auctionListing',
  data() {
    return {
      currentDate: new Date().getTime(),
      endTime: null
    }
  },
  components: {
    Countdown
  },
  props: {
    auction: {}
  },
  created() {
    this.endTime = moment(this.auction.end_date).valueOf()
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

<style scoped>
  .auction-listing {
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-bottom: 5rem;
    min-height: 45rem;
    width: 30%;
  }

  .auction-details p {
    margin-bottom: 0;
  }
</style>