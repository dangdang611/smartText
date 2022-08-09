<template>
  <div class="container">
    <div class="leftContent">
      <div class="recommend">
        <el-menu
          default-active="/get_attentionArticle"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="/get_attentionArticle">关注</el-menu-item>
          <el-menu-item index="/get_likeArticle">猜你喜欢</el-menu-item>
          <el-menu-item index="/get_hotArticle">热点</el-menu-item>
          <el-menu-item index="/get_newArticle">最新</el-menu-item>
          <el-menu-item index="/get_otherArticle">更多</el-menu-item>
        </el-menu>
      </div>
      <div class="content">
        <NewsList
          :NewMessage="recommendContent.NewMessage"
          :VideoMessage="recommendContent.VideoMessage"
        ></NewsList>
      </div>
      <PageDevice :count="count"></PageDevice>
    </div>
    <div class="rightContent">
      <div class="userFuction">
        <UserFunction></UserFunction>
      </div>
      <div class="hotNews">
        <RankHotNews></RankHotNews>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import Api from "../../Api";
import emitter from "../../utils/mitt";

let page = ref(0);
let size = ref(4);
let count = reactive({
  num: 0,
});
let currentPath = ref("/get_attentionArticle");
const userId = JSON.parse(localStorage.getItem("user_info") || "{}").userId;

let recommendContent = reactive({
  NewMessage: [],
  VideoMessage: [],
});

async function handleSelect(indexPath: string) {
  currentPath.value = indexPath;
  const result = await Api.article.getArticle(
    indexPath,
    userId,
    page.value,
    size.value
  );

  if (result.code === 200) {
    recommendContent.NewMessage = result.data;
    // recommendContent.VideoMessage = result.data.videoMessage;
    // count.num = result.data.total;
  } else {
    ElMessage({
      message: result.message,
      type: "warning",
    });
  }
}

onMounted(() => {
  handleSelect(currentPath.value);

  emitter.on("refreshHomeData", (currentPage) => {
    page.value = currentPage as number;

    handleSelect(currentPath.value);
  });
});

onUnmounted(() => {
  emitter.off("refreshHomeData");
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  max-width: 100%;
  background: whitesmoke;

  .leftContent,
  .rightContent {
    margin-top: 10px;
    width: 650px;
    // height: 920px;
    border: 1px solid #eee;
    border-radius: 10px;
    overflow: hidden;
  }

  .leftContent {
    padding-bottom: 20px;
    background: #fff;
    .recommend {
      :deep .el-menu {
        padding-left: 30px;
      }

      :deep .el-menu-item {
        font-size: 17px;
        padding: 0 30px;
      }
    }

    .content {
      padding: 0px 30px;
      padding-top: 15px;
    }
  }

  .rightContent {
    display: flex;
    flex-direction: column;
    width: 320px;
    margin-left: 10px;

    .userFuction {
      margin-bottom: 10px;
      padding: 20px;
      width: 100%;
      height: 250px;
      background: #fff;
    }

    .hotNews {
      padding: 10px 20px;
      width: 100%;
      flex: 1;
      background: #fff;
    }
  }
}
</style>
