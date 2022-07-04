<template>
  <div class="itemContainer" @click="goDetail(message.newsId)">
    <div class="left">
      <h3>{{ message.title }}</h3>
      <span>{{ message.author }}</span>
      <span>{{ message.commentNum }} 评论</span>
      <span>{{ message.time }}</span>
      <el-icon style="vertical-align: middle" class="close">
        <i-ep-close />
      </el-icon>
    </div>
    <div class="right">
      <img :src="message.coverPic" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";

export default {
  props: ["message"],
  setup() {
    const router = useRouter();

    function goDetail(id: string) {
      router.push(`/detail?newsId=${id}`);
    }

    return {
      goDetail,
    };
  },
};
</script>

<style lang="scss" scoped>
.itemContainer {
  display: flex;
  margin-bottom: 20px;
  cursor: pointer;

  &:hover {
    color: #409eff;
  }
  .left {
    position: relative;
    flex: 1;
    h3 {
      margin-bottom: 40px;
      font-weight: normal;
    }

    span {
      margin-right: 20px;
      font-size: 14px;
      line-height: 20px;
      color: #999;
    }

    .close {
      display: inline-block;
      width: 20px;
      height: 20px;
      text-align: center;
      margin: 0;
      position: absolute;
      bottom: 0;
      right: 10px;
      cursor: pointer;
      color: #999;

      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }

  .right {
    width: 30%;
    height: 110px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
