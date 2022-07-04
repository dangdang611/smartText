<template>
  <Search></Search>
  <Content v-show="!isSearch"></Content>
  <SearchContent v-show="isSearch" :keyword="key"></SearchContent>
  <el-backtop :bottom="100">
    <div
      style="
        height: 100%;
        width: 100%;
        background-color: var(--el-bg-color-overlay);
        box-shadow: var(--el-box-shadow-lighter);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      "
    >
      <el-icon>
        <i-ep-Top></i-ep-Top>
      </el-icon>
    </div>
  </el-backtop>
</template>

<script lang="ts" setup>
import Search from "../components/Search/Search.vue";
import Content from "../components/Content/Content.vue";
import emitter from "../utils/mitt";

let isSearch = ref(false);
let key = reactive({
  value: "",
});

onMounted(() => {
  emitter.on("toSearch", (keyword) => {
    isSearch.value = true;
    key.value = keyword as string;
  });
});

onUnmounted(() => {
  emitter.off("toSearch");
});
</script>

<style lang="scss" scoped></style>
