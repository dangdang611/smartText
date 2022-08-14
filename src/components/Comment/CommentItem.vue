<template>
  <div class="commentItem">
    <div><el-avatar :src="comment.avatarUrl" /></div>
    <div>
      <span>{{ comment.userName }}</span>
      <div class="content">
        <span id="targetComment" v-if="comment.targetName">
          <span>回复</span>
          <span>{{ comment.targetName }}</span
          >:
        </span>
        <span>{{ comment.content }}</span>
      </div>
      <div class="bottom">
        <span @click="replyComment(comment.userId, comment.userName)"
          >回复</span
        >
        <span>{{ comment.createTime.slice(0, 10) }}</span>
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
const $myemit = defineEmits(["getLike", "replyComment"]);
let isLike = ref(false);

function getLike() {
  isLike.value = !isLike.value;
  $myemit("getLike", props.comment.id, Number(isLike.value));
}

function replyComment(targetId: string, targetName: string) {
  $myemit("replyComment", targetId, targetName);
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
      color: #7aaee4;
    }

    .content #targetComment {
      > span:nth-child(1) {
        margin-right: 3px;
        font-size: 14px;
      }
      > span:nth-child(2) {
        color: #7aaee4;
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      font-size: 12px;
      color: #999;

      > span:nth-child(1) {
        cursor: pointer;
      }
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
