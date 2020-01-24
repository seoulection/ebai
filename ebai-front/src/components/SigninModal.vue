<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" role="dialog" tabindex="0" @keydown.esc="close">
          <div class="modal-header">
            <slot name="header">
              <h2>Login</h2>
              <button class="close-btn" @click="close">X</button>
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              <SigninForm @loginSuccessful="close" />
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import SigninForm from './SigninForm'
export default {
  name: 'signinModal',
  components: {
    SigninForm
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 50rem;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  display: grid;
  grid-template-columns: 1fr repeat(3, auto);
  grid-column-gap: 5px;
  justify-items: center;
}

.modal-header h2 {
  grid-column-start: 1; 
}

.modal-header button {
  margin-left: auto;
}

.modal-body {
  margin: 20px 0;
}

.close-btn {
  border: none;
  background: none;
  color: black;
  padding: 0;
}
</style>
