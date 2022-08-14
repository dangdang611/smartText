<template>
  <div class="itemPage">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="count"
      :page-size="4"
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
    count.value = props.count.sum;
  },
  { immediate: true }
);

const currentChange = (currentPage: number) => {
  if (route.path === "/editorManage/productionManage") {
    emitter.emit("refreshProductionData", currentPage);
  } else if (route.path === "/editorManage/commentManage") {
    emitter.emit("refreshCommentData", currentPage);
  } else if (route.path === "/editorManage/checkArticle") {
    emitter.emit("refreshCheckData  ", currentPage);
  }
};
</script>

<style lass="less" scoped>
.itemPage {
  display: flex;
  justify-content: center;
}
</style>
