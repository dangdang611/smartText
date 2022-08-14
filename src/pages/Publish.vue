<template>
  <div class="publishContainer">
    <h3>发布成功，正在审核中......</h3>
    <div class="pic"></div>
    <div class="btns">
      <el-button type="primary" plain round @click="goDetail"
        >查看文章</el-button
      >
      <el-button round @click="goEdit">重新编辑</el-button>
      <el-button round @click="writeAgain">在写一篇</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

let articleId = ref("");

onMounted(() => {
  articleId.value = route.params.articleId + "";

  if (articleId.value == "undefined") {
    articleId.value = localStorage.getItem("preArticleId") || "";
  } else {
    // 保存在浏览器防止下次使用
    localStorage.setItem("preArticleId", articleId.value + "");
  }
});

const goDetail = () => {
  router.push(`/detail?articleId=${articleId.value}`);
};

const goEdit = () => {
  router.push({
    path: "/editorPage",
    query: { articleId: articleId.value },
  });
};

const writeAgain = () => {
  router.push(`/editorPage`);
};
</script>

<style scoped lang="scss">
.publishContainer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 150px auto;
  width: 800px;
  height: 400px;
  border-radius: 5px;
  background: #ffff;

  h3 {
    margin-bottom: 20px;
    font-weight: normal;
    color: #333;
  }
  .pic {
    width: 200px;
    height: 200px;
    background: #000;
    background: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202005%2F11%2F20200511225530_UAzyf.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662954562&t=a87e023e4833bec3d8b78b1207ca665c");
    background-size: 100% 100%;
  }

  .btns {
    margin-top: 20px;
  }
}
</style>
