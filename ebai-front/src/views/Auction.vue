<template>
  <div class="auction" v-if="!error">
    <img class="auction-image" src="../assets/tshirt.jpg" alt="black ric flair tshirt">
    <div class="auction-details">
      <h2 class="auction-title">{{ auctionData.title }}</h2>
      <p class="end-date-section">Sale ends in: <strong class="end-date">{{ auctionData.end_date }}</strong></p>
      <p class="description">{{ auctionData.description }}</p>
      <section class="auction-prices">
        <div class="bid">
          <p class="auction-current-price" v-if="auctionData.current_bid_price">Current Price: <strong class="current-bid-price">${{ auctionData.current_bid_price / 100 }}</strong></p>
          <form v-if="isLoggedIn" v-on:submit.prevent="handleBidSubmission">
            <input class="bid-input" type="number" v-model="bidAmount">
            <button class="bid-button" type="submit">Bid</button>
          </form>
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
import axios from 'axios'
import { showAuction } from '@/api/auctions'
import { getUser } from '@/api/users'
//import { createBid } from '@/api/bids'

export default {
  name: 'auction',
  data () {
    return {
      auctionData: {},
      userName: '',
      bidAmount: null,
      error: ''
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.loggedIn
    }
  },
  created () {
    this.getAuction()
  },
  methods: {
    async getAuction () {
      try {
        const { data } = await showAuction(this.$route.params.id)
        this.auctionData = data
        
        const { data: { first_name, last_name} } = await getUser(data.user_id)
        this.userName = `${first_name} ${last_name}`
      } catch (err) {
        this.error = err
      }
    },
    async handleBidSubmission () {
      try {
        const data = {
          //bid: {
            //auction_id: this.$route.params.id,
            amount: this.bidAmount
          //}
        }
        // await createBid(data)
        await axios.post(`http://localhost:3000/auctions/${this.$route.params.id}/bids`, data, {
          withCredentials: true
        })
        //this.$routes.go()
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
  height: 10rem;
  padding: 1rem;
  text-align: left;
}

.error-text {
  color: red;
}

</style>
