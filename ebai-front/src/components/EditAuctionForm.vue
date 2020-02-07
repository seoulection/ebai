<template>
  <form class="edit-auction-form" enctype="multipart/form-data" v-on:submit.prevent="handleAuctionUpdate">
    <LabeledInput
      inputId="title"
      labelText="Title"
      inputType="text"
      :required=true
      :inputValue="auctionTitle"
      v-model="auctionTitle"
    />
    <LabeledInput
      inputId="description"
      labelText="Description"
      inputType="text"
      :required=true
      :inputValue="auctionDescription"
      v-model="auctionDescription"
    />
    <label class="form-label" for="auctionImage">
      Upload a new image:
      <input
        id="auctionImage"
        ref="auctionImage"
        type="file"
        accept="image/jpeg, image/jpg, image/png"
        @change="setAuctionImage()"
      >
    </label>
    <button class="auction-btn" type="submit">Create</button>
  </form>
</template>

<script>
import LabeledInput from '@/components/LabeledInput'
import { updateAuction } from '@/api/auctions'

export default {
  name: 'createAuction',
  data () {
    return {
      image: null
    }
  },
  props: {
    auctionTitle: String,
    auctionDescription: String
  },
  components: {
    LabeledInput,
  },
  methods: {
    setAuctionImage() {
      this.image = this.$refs.auctionImage.files[0]
    },
    async handleAuctionUpdate() {
      try {
        const params = {
          title: this.auctionTitle,
          description: this.auctionDescription,
          image: this.image
        }

        let formData = new FormData()
        Object.entries(params).forEach(
          ([key, value]) => formData.append(key, value)
        )

        await updateAuction(this.$route.params.id, formData)
        this.$router.push({ name: 'auction', params: { id: this.$route.params.id }} )
      } catch (err) {
        console.log(err)
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
