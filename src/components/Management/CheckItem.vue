<template>
  <div class="ItemContainer">
    <div class="title">
      <h3 @click="look(item.id)">{{ item.title }}</h3>
      <span>{{ item.time }}</span>
    </div>
    <div class="tag">
      <span v-for="(t, index) of tag" :key="index">{{ t }}</span>
    </div>
    <div class="message">
      <div class="left">
        <span>浏览量 {{ item.showNum }}</span>
        <span>点赞 {{ item.likeNum }}</span>
        <span>评论 {{ item.commentNum }}</span>
      </div>
      <div class="right">
        <span @click="pass(item.id)">通过</span
        ><span @click="fail(item.id)">不通过</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
});

const $myemit = defineEmits(["look", "pass", "fail"]);
const look = (id: string) => {
  $myemit("look", id);
};
const pass = (id: string) => {
  $myemit("pass", id);
};
const fail = (id: string) => {
  $myemit("fail", id);
};

const tag = computed(() => {
  return props.item.tag.split(",");
});
</script>

<style lang="scss" scoped>
.ItemContainer {
  padding: 15px 30px;
  border-bottom: 1px dotted #999;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3 {
      margin-bottom: 15px;
      font-weight: normal;
      cursor: pointer;
      color: #409eff;
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
      color: #999;
      text-decoration: none;
      font-size: 14px;
      margin-right: 10px;
    }
  }
}
</style>
