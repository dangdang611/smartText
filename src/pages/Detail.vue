<template>
  <div class="detailContainer">
    <div class="detailContent">
      <h2>{{ data.info.title }}</h2>
      <div class="infoMessage">
        <span
          class="infoTag"
          v-for="(tag, index) in data.info.tag"
          :key="index"
          >{{ tag }}</span
        >
        <span>{{ data.info.time }}</span
        ><span>{{ data.info.author }}</span>
      </div>
      <div class="paragrah">
        <mavon-editor
          class="md"
          v-model="data.info.newsContext"
          :editable="false"
          :toolbarsFlag="false"
          :shortCut="false"
          :subfield="false"
          defaultOpen="preview"
        ></mavon-editor>
      </div>
    </div>
  </div>
  <div class="tools">
    <ul>
      <li @click="isLike = !isLike" :class="isLike ? 'like' : ''">
        <el-icon>
          <i-ep-Apple />
        </el-icon>
        <span>{{ data.info.likeNum }}</span>
        <el-divider />
      </li>
      <li @click="isComment = !isComment">
        <el-icon>
          <i-ep-ChatDotRound />
        </el-icon>
        <span>{{ data.info.collectNum }}</span>
        <el-divider />
      </li>
      <li @click="isCollect = !isCollect" :class="isCollect ? 'collect' : ''">
        <el-icon>
          <i-ep-Star />
        </el-icon>
        <span v-show="!isCollect">收藏</span>
        <span v-show="isCollect">已收藏</span>
        <el-divider />
      </li>
      <li>
        <el-icon @click="shareThis">
          <i-ep-Share />
        </el-icon>
        <span>分享</span>
      </li>
    </ul>
  </div>

  <transition name="fade">
    <Comment v-show="isComment" @close="closeComment" :newsId="path"></Comment>
  </transition>

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

<script lang="ts">
import { useRoute } from "vue-router";
import Api from "../Api";
import Comment from "../components/Comment/Comment.vue";
import router from "../routers";

export default {
  setup() {
    let isLike = ref(false);
    let isComment = ref(false);
    let isCollect = ref(false);

    const route = useRoute();
    let path = route.query.newsId!.toString();

    // 通过请求服务器获取数据，死数据替代
    let data = reactive({
      info: {},
    });

    function shareThis() {}
    function closeComment() {
      isComment.value = false;
    }
    async function getDetail() {
      const result = await Api.article.getDetail(path);

      if (result.code === "200") {
        data.info = result.data;
        console.log(data.info);
      } else {
        ElMessage({
          message: result.message,
          type: "warning",
        });
      }
    }
    onMounted(() => {
      getDetail();
    });

    return {
      data,
      path,
      isLike,
      isComment,
      isCollect,
      shareThis,
      closeComment,
    };
  },
};
</script>

<style lang="scss" scoped>
.detailContainer {
  overflow: hidden;
  background-color: whitesmoke;

  .detailContent {
    margin: 0 auto;
    margin-top: 75px;
    padding: 20px 30px;
    width: 60%;
    border-radius: 15px;
    background-color: #fff;

    h2 {
      text-align: center;
    }

    .infoMessage {
      margin-top: 20px;
      text-align: center;

      span {
        margin-left: 20px;
        color: #999;

        &.infoTag {
          padding: 2px;
          color: #409eff;
          background: rgb(217, 236, 255);
          border-radius: 5px;
        }
      }
    }

    .paragrah {
      margin-top: 20px;
    }
  }
}
.tools {
  position: fixed;
  top: 50%;
  // 可视区的一半
  right: 50%;
  // 版心的一半
  margin-right: 31%;
  z-index: 9999;

  ul > li {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60px;
    font-size: 24px;
    cursor: pointer;

    span {
      margin-top: 15px;
      font-size: 16px;
    }

    :deep(.el-divider--horizontal) {
      margin: 10px 0;
    }
  }

  .like {
    color: #409eff;
  }

  .collect {
    color: #ffc740;
  }
}
</style>
