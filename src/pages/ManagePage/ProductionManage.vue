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
        <el-menu-item index="2">已发布</el-menu-item>
        <el-menu-item index="3">审核中</el-menu-item>
        <el-menu-item index="4">未通过</el-menu-item>
      </el-menu>
    </template>
    <template v-slot:content>
      <ArticleItem
        v-for="item of currentData"
        :key="item.id"
        :item="item"
        @edit="editProduction"
        @del="delProduction"
        @look="lookDetail"
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
import { Ref } from "vue";
import { ElMessage } from "element-plus";

interface Article {
  id: string;
  createTime: string;
  title: string;
  authorId: string;
  authorName: string;
  content: string;
  mdContent: string;
  coverPic: string;
  digest: string;
  specialColumn: string;
  tag: string;
  likeNum: number;
  showNum: number;
}

let activeIndex = ref("2");
let page = ref(0);
let size = ref(4);
let data = reactive({
  publish: [],
  publishNum: 0,
  checking: [],
  checkingNum: 0,
  fail: [],
  failNum: 0,
});
let currentData: Ref<Article[]> = ref([]);

let count = reactive({
  sum: 0,
});
const router = useRouter();

const handleSelect = (index: string) => {
  activeIndex.value = index;
  switch (index) {
    case "2": {
      currentData.value = data.publish;
      count.sum = data.publishNum;
      break;
    }
    case "3": {
      currentData.value = data.checking;
      count.sum = data.checkingNum;
      break;
    }
    case "4": {
      currentData.value = data.fail;
      count.sum = data.failNum;
      break;
    }
  }
};

const editProduction = (id: string) => {
  router.push({
    path: "/editorPage",
    query: {
      articleId: id,
    },
  });
};

const lookDetail = (id: string) => {
  router.push({
    path: "/detail",
    query: {
      articleId: id,
    },
  });
};
const getAllData = async () => {
  const result = await Api.article.getArticle(
    "/get_myArticle",
    JSON.parse(localStorage.getItem("user_info") || "{}").userId,
    page.value,
    size.value
  );

  if (result.code === 200) {
    ({
      publish: data.publish,
      publishNum: data.publishNum,
      checking: data.checking,
      checkingNum: data.checkingNum,
      fail: data.fail,
      failNum: data.failNum,
    } = result.data);
  } else {
    ElMessage({
      message: result.message,
      type: "warning",
    });
  }

  handleSelect(activeIndex.value);
};
const delProduction = async (id: string) => {
  let result;
  switch (activeIndex.value) {
    case "2": {
      result = await Api.article.delAticle(id);
      break;
    }
    case "3": {
      result = await Api.checking_article.delAticle(id);
      break;
    }
    case "4": {
      result = await Api.fail_article.delAticle(id);
      break;
    }
  }

  ElMessage({
    message: result.data ? "删除成功" : "删除失败",
    type: result.data ? "success" : "warning",
  });

  // 重新获取数据
  getAllData();
};
onMounted(() => {
  getAllData();
  emitter.on("refreshProductionData", (currentPage) => {
    page.value = (currentPage as number) - 1;
    handleSelect(activeIndex.value);
  });
});

onUnmounted(() => {
  emitter.off("refreshProductionData");
});
</script>

<style lang="scss" scoped></style>
