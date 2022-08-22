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
import Header from "./components/Header/Header.vue";
import emitter from "./utils/mitt";

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

onMounted(() => {
  emitter.on("toSearch", (keyword) => {
    emitter.emit("goSearch", keyword);
  });
});

onUnmounted(() => {
  emitter.off("toSearch");
});
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
  overflow: hidden;
  background-color: #f5f6f7;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes appear {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 100%;
  }
}

@keyframes moveY {
  0% {
    transform: translateY(-50px);
  }
  100% {
    transform: translateY(0px);
  }
}

.tips {
  margin-top: 50px;
  text-align: center;
  color: #999;
}
</style>
