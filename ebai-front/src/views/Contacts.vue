<template>
  <div id="contacts">
    <div v-for="(contact) in contacts" :key="contact.id">
      <p>{{contact.name}} is {{contact.relationship}}</p>
    </div>
  </div>
</template>

<script>
import { getContacts } from '../api/contacts'

export default {
  data() {
    return {
      contacts: [],
      name: [],
      relationship: [],
      errors: []
    }
  },
  async created() {
    // eslint-disable-next-line no-console
    this.contacts = await getContacts()
  }
}
</script>
