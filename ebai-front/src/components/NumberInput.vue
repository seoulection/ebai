<template>
  <div>
    <label class="form-label" :for="inputId">
      {{ labelText }}<span v-if="required"> (required)</span>:
      <input 
        :id="inputId" 
        type="number"
        :required="required" 
        :min="minVal"
        :step="stepVal"
        :placeholder="placeholder"
        @input="$emit('input', $event.target.value)" >
    </label>
  </div>
</template>

<script>
export default {
  name: 'numberInput',
  props: {
    labelText: String,
    required: Boolean,
    inputId: String,
    minVal: String,
    stepVal: String,
    placeholder: String
  }
}
</script>

<style scoped>
  .form-label {
    text-align: left;
  }
</style>