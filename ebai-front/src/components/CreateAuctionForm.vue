<template>
  <form class="create-auction-form" v-on:submit.prevent="handleAuctionCreation">
    <LabeledInput inputId="title" labelText="Title" inputType="text" :required=true v-model="title" />
    <LabeledInput inputId="description" labelText="Description" inputType="text" :required=true v-model="description" />
    <LabeledInput inputId="starting-bid-price" labelText="Starting Bid Price" inputType="number" minVal="1" :required=true placeholder="Minimum $1.00" v-model="startingBidPrice" />
    <LabeledInput inputId="buy-it-now-price" labelText="Buy It Now Price" inputType="number" minVal="1" v-model="buyItNowPrice" />
    <LabeledInput inputId="end-date" labelText="End Date" inputType="date" :minVal="currentDate" :required=true v-model="endDate" />
    <button class="auction-btn" type="submit">Create</button>
  </form>
</template>

<script>
import moment from 'moment'
import LabeledInput from '@/components/LabeledInput'
import { createAuction } from '@/api/auctions'

export default {
  name: 'createAuction',
  data () {
    return {
      title: '',
      description: '',
      startingBidPrice: 1,
      buyItNowPrice: null,
      endDate: null
    }
  },
  computed: {
    currentDate: function () {
      return moment(new Date()).add(1, 'day').format('YYYY-MM-DD')
    }
  },
  components: {
    LabeledInput
  },
  methods: {
    async handleAuctionCreation () {
      var data = {
        auction: {
          title: this.title,
          description: this.description,
          current_bid_price: this.startingBidPrice * 100,
          buy_it_now_price: this.buyItNowPrice * 100,
          end_date: this.endDate
        }
      }

      try {
        const { data: { id } } = await createAuction(data)
        this.$router.push({ name: 'auction', params: { id: id }} )
      } catch (err) {
        this.error = err
      }
    }
  }
}
</script>

<style scoped>
  .create-auction-form {
    width: 75rem;
  }
</style>
