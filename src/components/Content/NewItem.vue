<template>
  <div class="itemContainer">
    <div class="left">
      <h3 @click="goDetail(message.id)">{{ message.title }}</h3>
      <span>{{ message.authorName }}</span>
      <span>{{ message.showNum }} 浏览量</span>
      <span>{{ message.createTime.slice(0, 10) }}</span>
      <el-icon
        style="vertical-align: middle"
        class="close"
        @click="delInfo(message.id)"
      >
        <i-ep-close />
      </el-icon>
    </div>
    <div class="right">
      <img :src="message.coverPic" alt="" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import emitter from "../../utils/mitt";

const props = defineProps(["message"]);
const router = useRouter();

const delInfo = (id: string) => {
  emitter.emit("delListInfo", id);
};
function goDetail(id: string) {
  router.push(`/detail?articleId=${id}`);
}
</script>

<style lang="scss" scoped>
.itemContainer {
  display: flex;
  margin-bottom: 20px;
  cursor: pointer;
  animation: appear 0.6s;

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
