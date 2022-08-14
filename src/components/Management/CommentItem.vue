<template>
  <div class="commentContainer">
    <div class="left">
      <el-avatar :src="comment.avatarUrl" />
    </div>
    <div class="right">
      <div class="commentTitle">
        <span>{{ comment.userName }}</span>
        <span>评论了你的文章</span>
        <span @click="goDetail(comment.articleId)">{{
          comment.articleName
        }}</span>
      </div>
      <div class="commentContent">
        <el-icon>
          <i-ep-Position />
        </el-icon>
        {{ comment.content }}
      </div>
      <div class="commentFooter">
        <span>{{ comment.createTime.slice(0, 10) }}</span>
        <span @click="del(comment.id)">删除</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

defineProps(["comment"]);
const emits = defineEmits(["del"]);
const router = useRouter();

const goDetail = (articleId: string) => {
  router.push(`/detail?articleId=${articleId}`);
};

const del = (commentId: string) => {
  emits("del", commentId);
};
</script>

<style lang="scss" scoped>
.commentContainer {
  display: flex;
  padding: 20px 30px;
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

      span:nth-child(2) {
        color: #999;
        text-decoration: none;
        font-size: 14px;
        margin-right: 10px;
      }
    }
  }
}
</style>
