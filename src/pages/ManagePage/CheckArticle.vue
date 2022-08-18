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
        <el-menu-item index="2">待审核</el-menu-item>
        <el-menu-item index="3">已完成</el-menu-item>
        <el-menu-item index="4">已否决</el-menu-item>
      </el-menu>
    </template>
    <template v-slot:content>
      <CheckItem
        v-for="item of currentData"
        :key="item.id"
        :item="item"
        @pass="passArticle"
        @fail="failArticle"
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
      currentData.value = data.checking;
      count.sum = data.checkingNum;
      break;
    }
    case "3": {
      currentData.value = data.publish;
      count.sum = data.publishNum;
      break;
    }
    case "4": {
      currentData.value = data.fail;
      count.sum = data.failNum;
      break;
    }
  }
};

const passArticle = async (id: string) => {
  let result = await Api.checking_article.passAticle(id);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "审核通过",
    });
  } else {
    ElMessage({
      type: "error",
      message: "操作失败",
    });
  }
  // 重新获取数据
  getAllData();
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
    null,
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
const failArticle = async (id: string) => {
  let result = await Api.checking_article.failAticle(id);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "操作成功",
    });
  } else {
    ElMessage({
      type: "error",
      message: "操作失败",
    });
  }

  // 重新获取数据
  getAllData();
};
onMounted(() => {
  getAllData();
  emitter.on("refreshCheckData", (currentPage) => {
    page.value = (currentPage as number) - 1;
    handleSelect(activeIndex.value);
  });
});

onUnmounted(() => {
  emitter.off("refreshCheckData");
});
</script>

<style lang="scss" scoped></style>
