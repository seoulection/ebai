<template>
  <div class="auction" v-if="!error">
    <img class="auction-image" :src="auctionImage" :alt="auctionData.title">
    <div class="auction-details">
      <h2 class="auction-title">{{ auctionData.title }}</h2>
      <Countdown :starttime="convertStartTime" :endtime="convertEndTime" trans='{  
         "day":"Day",
         "hours":"Hours",
         "minutes":"Minuts",
         "seconds":"Seconds",
         "expired":"Auction expired.",
         "running":"Till the end of auction.",
         "status": {
            "expired":"Expired",
            "running":"Running",
            "upcoming":"Future"
           }}' />
      <p class="description">{{ auctionData.description }}</p>
      <section class="auction-prices">
        <div class="bid">
          <div class="bid-form-container">
            <p class="bid-current-price" v-if="auctionData.current_bid_price">Current Price: <strong class="current-bid-price">${{ auctionData.current_bid_price / 100 }}</strong></p>
            <form class="bid-form" v-if="isLoggedIn" v-on:submit.prevent="handleBidSubmission">
              <input class="bid-input" type="number" step="0.01" pattern="^\d*(\.\d{0,2})?$" :min="convertToDollars" v-model="bidAmount">
              <button class="bid-button" type="submit">Bid</button>
            </form>
          </div>
          <p class="auction-buy-price" v-if="auctionData.buy_it_now_price">Buy It Now! <strong class="buy-it-now-price">${{ auctionData.buy_it_now_price / 100 }}</strong></p>
        </div>
      </section>
      <p class="lister">Seller: <span class="lister-name">{{ userName }}</span></p>
    </div>
  </div>
  <div class="error" v-else>
    <h2 class="error-text">{{ error }}</h2>
  </div>
</template>

<script>
import moment from 'moment'
import Countdown from '@/components/Countdown'
import { showAuction, updateAuction } from '@/api/auctions'
import { getUser } from '@/api/users'
import { createBid } from '@/api/bids'

export default {
  name: 'auction',
  components: {
    Countdown
  },
  data () {
    return {
      auctionData: {},
      auctionImage: '',
      userName: '',
      bidAmount: null,
      currentBidPrice: 0,
      error: '',
      endTime: null,
      startTime: null
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.user.loggedIn && (this.$store.state.user.userId != this.auctionData.user_id)
    },
    convertToDollars () {
      return (this.auctionData.current_bid_price + 1) / 100
    },
    convertStartTime() {
      return new Date().getTime()
    },
    convertEndTime() {
      console.log("**", this.auctionData.end_date)
      console.log("---", moment(this.auctionData.end_date).valueOf())
      return moment(this.auctionData.end_date).valueOf()
    },
  },
  created () {
    this.getAuction()
  },
  mounted () {
   
  },
  methods: {
    async getAuction() {
      try {
        const { data } = await showAuction(this.$route.params.id)
        this.auctionData = data.auction
        this.auctionImage = data.image
 
        const { data: { first_name, last_name} } = await getUser(data.auction.user_id)
        this.userName = `${first_name} ${last_name}`
      } catch (err) {
        this.error = err
      }
    },
    async handleBidSubmission() {
      try {
        const flooredAmount = Math.floor(this.bidAmount * 100)
        const auctionId = this.$route.params.id
        const data = {
          amount: flooredAmount
        }

        await createBid(auctionId, data)

        const updatedAuctionData = {
          current_bid_price: flooredAmount
        }

        await updateAuction(auctionId, updatedAuctionData)
        this.auctionData.current_bid_price = flooredAmount
      } catch (err) {
        this.error = err
      }
    }
  }
}
</script>

<style scoped>
.auction {
  display: flex;
}

.auction-image {
  width: 50%;
}

.auction-title {
  color: #9B4DCA;
  font-weight: bold;
}

.auction-details {
  display: flex;
  flex-direction: column;
  padding-left: 4rem;
  width: 50%;
}

.end-date-section {
  text-align: left;
}

.auction-prices {
  background-color: lavender;
  border-radius: 5px;
  padding: 1rem;
  text-align: left;
}

.bid {
  display: flex;
  flex-direction: column;
}

.bid-form-container, .bid-form {
  display: flex;
  justify-content: space-between;
}


.bid-form input {
  margin-right: 1rem;
  background:white;
}


.error-text {
  color: red;
}

</style>
