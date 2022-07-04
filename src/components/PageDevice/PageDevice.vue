<template>
  <div class="itemPage">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="count"
      :page-size="3"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import emitter from "../../utils/mitt";

const props = defineProps(["count"]);
const route = useRoute();

let count = ref(20);

watch(
  props.count,
  () => {
    count.value = props.count.num;
  },
  { immediate: true }
);

const currentChange = (currentPage: number) => {
  if (route.path === "/") {
    emitter.emit("refreshHomeData", currentPage);
  } else if (route.path === "/editorManage/productionManage") {
    emitter.emit("refreshProductionData", currentPage);
  }
};
</script>

<style lass="less" scoped>
.itemPage {
  display: flex;
  justify-content: center;
}
</style>
