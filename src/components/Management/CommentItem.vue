<template>
  <div class="commentContainer">
    <div class="left">
      <el-avatar :src="comment.userAvatar" />
    </div>
    <div class="right">
      <div class="commentTitle">
        <span>{{ comment.userCount }}</span>
        <span>评论了你的文章</span>
        <span @click="goDetail(comment.newsId)">{{ comment.title }}</span>
      </div>
      <div class="commentContent">
        <el-icon>
          <i-ep-Position />
        </el-icon>
        {{ comment.content }}
      </div>
      <div class="commentFooter">
        <span>{{ comment.time }}</span>
        <span> <a href="#"> 回复 </a><a href="#">删除</a> </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

defineProps(["comment"]);
const router = useRouter();

const goDetail = (newsId: string) => {
  router.push(`/detail?newsId=${newsId}`);
};
</script>

<style lang="scss" scoped>
.commentContainer {
  display: flex;
  padding: 20px 50px;
  .left {
    width: 5%;
  }
  .right {
    flex: 1;
    .commentTitle {
      display: flex;
      align-items: center;

      > span:nth-of-type(2) {
        color: #999;
        margin-left: 15px;
      }
      > span:nth-of-type(3) {
        color: #409eff;
        margin-left: 15px;
        cursor: pointer;
      }
    }
    .commentContent {
      margin: 15px 0;
      font-size: 16px;
    }
    .commentFooter {
      color: #999;
      display: flex;
      justify-content: space-between;

      a {
        color: #999;
        text-decoration: none;
        font-size: 14px;
        margin-right: 10px;
      }
    }
  }
}
</style>
