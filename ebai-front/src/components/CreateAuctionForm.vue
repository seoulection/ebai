<template>
  <form class="create-auction-form" enctype="multipart/form-data" v-on:submit.prevent="handleAuctionCreation">
    <LabeledInput inputId="title" labelText="Title" inputType="text" :required=true v-model="title" />
    <LabeledInput inputId="description" labelText="Description" inputType="text" :required=true v-model="description" />
    <label class="form-label" for="auctionImage">
      Please upload an image:
      <input id="auctionImage" ref="auctionImage" type="file" accept="image/jpeg, image/jpg, image/png" @change="setAuctionImage()">
    </label>
    <NumberInput inputId="starting-bid-price" labelText="Starting Bid Price" minVal="1" :required=true placeholder="Minimum $1.00" v-model="startingBidPrice" stepVal="0.01" />
    <NumberInput inputId="buy-it-now-price" labelText="Buy It Now Price" minVal="1" v-model="buyItNowPrice" stepVal="0.01" />
    <label for="end-date">How long do you want the auction to last (required):</label>
    <select name="end-times" id="end-date" v-model="endDate" required>
      <option value="1">1 minute</option>
      <option value="720">12 hours</option>
      <option value="1440">24 hours</option>
      <option value="2160">36 hours</option>
      <option value="2880">48 hours</option>
      <option value="4320">72 hours</option>
    </select>
    <button class="auction-btn" type="submit">Create</button>
    <h2 class="error" v-if="error">{{ error }}</h2>
  </form>
</template>

<script>
import moment from 'moment'
import LabeledInput from '@/components/LabeledInput'
import NumberInput from '@/components/NumberInput'
import { createAuction } from '@/api/auctions'

export default {
  name: 'createAuction',
  data () {
    return {
      title: '',
      description: '',
      image: null,
      startingBidPrice: null,
      buyItNowPrice: null,
      endDate: null,
      error: ''
    }
  },
  components: {
    LabeledInput,
    NumberInput
  },
  methods: {
    setAuctionImage() {
      this.image = this.$refs.auctionImage.files[0]
    },
    async handleAuctionCreation () {
      if (this.buyItNowPrice != null && Number(this.buyItNowPrice) < Number(this.startingBidPrice)) {
          this.error = "Buy it now price must be larger than starting bid price."
      } else {
        const params = {
          title: this.title,
          description: this.description,
          image: this.image,
          current_bid_price: this.startingBidPrice * 100,
          buy_it_now_price: this.buyItNowPrice * 100,
          end_date: moment().add(this.endDate, 'minutes')
        } 

        let formData = new FormData()
        Object.entries(params).forEach(
          ([key, value]) => formData.append(key, value)
        )

        try {
          const { data: { id } } = await createAuction(formData)
          this.$router.push({ name: 'auction', params: { id: id }} )
        } catch (err) {
          this.error = err
        }
      }
    }
  }
}
</script>

<style scoped>
  .create-auction-form {
    width: 75rem;
  }

  .create-auction-form  label {
    text-align: left;
  }
</style>
