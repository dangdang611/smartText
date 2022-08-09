<template>
  <NewItem v-for="m of NewMessage" :key="m.id" :message="m"></NewItem>
  <div class="videoShow">
    <VideoNews
      v-for="m of VideoMessage"
      :key="m.videoId"
      :message="m"
    ></VideoNews>
  </div>
</template>

<script lang="ts">
export default {
  props: ["NewMessage", "VideoMessage"],
};
</script>

<style lang="scss" scoped></style>
