<template>
  <div>
    <label class="form-label" :for="inputId">
      {{ labelText }}<span v-if="required"> (required)</span>:
      <input
        :id="inputId"
        :type="inputType"
        :required="required"
        :min="minVal"
        :value="inputValue"
        :placeholder="placeholder"
        @input="$emit('input', $event.target.value)" >
    </label>
  </div>
</template>

<script>
export default {
  name: 'labeledInput',
  props: {
    labelText: String,
    inputType: String,
    required: Boolean,
    inputId: String,
    minVal: String,
    inputValue: String,
    placeholder: String,
  }
}
</script>

<style scoped>
  .form-label {
    text-align: left;
  }
</style>
