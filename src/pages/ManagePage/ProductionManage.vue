<template>
  <ManageSlot :count="count">
    <template v-slot:title>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item disabled>状态</el-menu-item>
        <el-menu-item index="1">全部</el-menu-item>
        <el-menu-item index="2">已发布</el-menu-item>
        <el-menu-item index="3">审核中</el-menu-item>
        <el-menu-item index="4">未通过</el-menu-item>
      </el-menu>
    </template>
    <template v-slot:content>
      <ArticleItem
        v-for="item of data"
        :key="item.newsId"
        :item="item"
        @edit="editProduction"
        @del="delProduction"
      />
    </template>
  </ManageSlot>
</template>

<script lang="ts" setup>
// 可以不import
import ManageSlot from "../../components/Management/ManageSlot.vue";
import ArticleItem from "../../components/Management/ArticleItem.vue";
import Api from "../../Api";
import { useRouter } from "vue-router";
import emitter from "../../utils/mitt";

let activeIndex = ref("1");
let page = ref(1);
let size = ref(4);
let data = ref([
  {
    newsId: "001",
    title: "保姆式教学安装与配置Chrome的VUE调试工具vue-devtools",
    time: "2022-05-03 18:11:34",
    tag: ["原创", "Vue", "调试工具"],
    viewNums: 1190,
    collectNums: 22,
    likeNums: 22,
    commentNums: 13,
  },
  {
    newsId: "002",
    title: "一分钟教你学会react",
    time: "2022-05-03 18:11:34",
    tag: ["原创"],
    viewNums: 1190,
    collectNums: 22,
    likeNums: 22,
    commentNums: 13,
  },
  {
    newsId: "003",
    title: "这你也信，恭喜你，你进传销了",
    time: "2022-05-03 18:11:34",
    tag: ["原创"],
    viewNums: 1190,
    collectNums: 22,
    likeNums: 22,
    commentNums: 13,
  },
  {
    newsId: "004",
    title: "hahahahhahahahahahha，憨批",
    time: "2022-05-03 18:11:34",
    tag: ["原创"],
    viewNums: 1190,
    collectNums: 22,
    likeNums: 22,
    commentNums: 13,
  },
]);
let count = reactive({
  num: 0,
});
const router = useRouter();

const handleSelect = async (index: string) => {
  activeIndex.value = index;

  const result = await Api.manage.getProductionData(
    localStorage.getItem("count")!,
    Number(index),
    page.value,
    size.value
  );

  if (result.code === "200") {
    data.value = result.data.productions;
    count.num = result.data.total;
  } else {
    ElMessage({
      message: result.message,
      type: "warning",
    });
  }
};

const editProduction = (newsId: string) => {
  router.push({
    path: "/editorPage",
    query: {
      newsId,
    },
  });
};

const delProduction = async (newsId: string) => {
  const result = await Api.article.delAticle(newsId);

  ElMessage({
    message: result.message,
    type: result.code === "200" ? "success" : "warning",
  });

  // 重新获取数据
  handleSelect(activeIndex.value);
};
onMounted(() => {
  handleSelect(activeIndex.value);
  emitter.on("refreshProductionData", (currentPage) => {
    page.value = currentPage as number;
    handleSelect(activeIndex.value);
  });
});

onUnmounted(() => {
  emitter.off("refreshProductionData");
});
</script>

<style lang="scss" scoped></style>
