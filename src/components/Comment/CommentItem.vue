<template>
  <div class="commentItem">
    <div><el-avatar :src="comment.userAvatar" /></div>
    <div>
      <span>{{ comment.userCount }}</span>
      <span>{{ comment.content }}</span>
      <div>
        <span>回复</span>
        <span>{{ comment.time }}</span>
      </div>
    </div>
    <div :class="isLike ? 'active' : ''">
      <span>{{ comment.likeNum }}</span
      ><span @click="getLike"
        ><el-icon><i-ep-Apple /></el-icon
      ></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(["comment"]);
const $myemit = defineEmits(["getLike"]);
let isLike = ref(false);

function getLike() {
  isLike.value = !isLike.value;
  $myemit("getLike", props.comment.id, Number(isLike.value));
}
</script>

<style lang="scss" scoped>
.commentItem {
  margin-top: 50px;
  display: flex;

  > div:nth-child(1) {
    width: 17%;
  }
  > div:nth-child(2) {
    flex: 1;
    display: flex;
    flex-direction: column;

    > span {
      margin-bottom: 8px;

      &:nth-child(1) {
        font-size: 14px;
      }
    }

    > div {
      margin-top: 8px;
      font-size: 12px;
      color: #999;
    }
  }
  > div:nth-child(3) {
    width: 20%;
    span:nth-child(1) {
      margin-right: 6px;
    }
    span:nth-child(2) {
      cursor: pointer;
    }
  }
}

.active {
  color: #409eff;
}
</style>
