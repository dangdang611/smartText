<template>
  <div class="ItemContainer">
    <div class="title">
      <h3>{{ item.title }}</h3>
      <span>{{ item.time }}</span>
    </div>
    <div class="tag">
      <span v-for="t of item.tag">{{ t }}</span>
    </div>
    <div class="message">
      <div class="left">
        <span>浏览量 {{ item.viewNums }}</span>
        <span>收藏 {{ item.collectNums }}</span>
        <span>点赞 {{ item.likeNums }}</span>
        <span>评论{{ item.commentNums }}</span>
      </div>
      <div class="right">
        <span @click="edit(item.newsId)">编辑</span
        ><span @click="del(item.newsId)">删除</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  item: {
    type: Object,
    default: {},
  },
});

const $myemit = defineEmits(["edit", "del"]);
const edit = (newsId: string) => {
  $myemit("edit", newsId);
};
const del = (newsId: string) => {
  $myemit("del", newsId);
};
</script>

<style lang="scss" scoped>
.ItemContainer {
  padding: 15px 20px;
  border-bottom: 1px dotted #999;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3 {
      margin-bottom: 15px;
      font-weight: normal;
    }
    > span {
      color: #999;
      font-size: 14px;
    }
  }
  .tag {
    margin-bottom: 15px;
    color: #409eff;
    span {
      margin-right: 10px;
      padding: 5px;
      background: rgb(217, 236, 255);
      border-radius: 5px;
      font-size: 14px;
    }
  }
  .message {
    display: flex;
    justify-content: space-between;

    span:nth-of-type(-n + 3) {
      margin-right: 20px;
    }

    .left {
      color: #999;
    }

    .right > span {
      cursor: pointer;
    }
  }
}
</style>
