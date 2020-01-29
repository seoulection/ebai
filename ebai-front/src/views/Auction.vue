<template>
  <div class="auction">
    <img class="auction-image" src="../assets/tshirt.jpg" alt="black ric flair tshirt">
    <div class="auction-details">
      <h2 class="auction-title">{{ auctionData.title }}</h2>
      <p class="end-date-section">Sale ends in: <strong class="end-date">{{ auctionData.end_date }}</strong></p>
      <p class="description">{{ auctionData.description }}</p>
      <section class="auction-prices">
        <p class="auction-current-price" v-if="auctionData.current_bid_price">Current Price: <strong class="current-bid-price">${{ auctionData.current_bid_price / 100 }}.00</strong></p>
        <p class="auction-buy-price" v-if="auctionData.buy_it_now_price">Buy It Now! <strong class="buy-it-now-price">${{ auctionData.buy_it_now_price / 100 }}.00</strong></p>
      </section>
      <p class="lister">Seller: <span class="lister-name">{{ userName }}</span></p>
      <p class="error" v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { showAuction } from '@/api/auctions'
import { getUser } from '@/api/users'

export default {
  name: 'auction',
  data () {
    return {
      auctionData: {},
      userName: '',
      error: ''
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

</style>