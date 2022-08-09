<template>
  <Header @openLogin="openLogin" />
  <Login
    v-show="isLogin"
    @closeLogin="closeLogin"
    @openRegister="openRegister"
  />
  <Register
    v-show="isRegister"
    @closeRegister="closeRegister"
    @openLogin="openLogin"
  />
  <router-view> </router-view>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Api from "./Api";
import Header from "./components/Header/Header.vue";

let isLogin = ref(false);

let isRegister = ref(false);

function closeLogin() {
  isLogin.value = false;
}

function openLogin() {
  isLogin.value = true;
}

function closeRegister() {
  isRegister.value = false;
}

function openRegister() {
  isRegister.value = true;
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  ul li {
    list-style: none;
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
