<template>
  <div class="error-component">
    <h1 class="error-component-message">{{errorMessage}}</h1>
  </div>
</template>

<script>
export default {
  name: 'errorComponent',
  props: {
    errorMessage: String
  }
}
</script>

<style>
.error-component-message {
  color: red;
}
</style>
