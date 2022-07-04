<template>
  <div class="commentContainer">
    <div class="commentContent">
      <div class="head">
        <h3>评论 {{ data.commentNum }}</h3>
        <el-icon style="vertical-align: middle" class="close" @click="close">
          <i-ep-close />
        </el-icon>
      </div>
      <div class="content">
        <el-input
          v-model="textarea"
          :rows="4"
          type="textarea"
          placeholder="来说点什么......"
        />
        <el-button type="primary" plain style="float: right; margin-top: 3px"
          >发表</el-button
        >
        <CommentItem
          v-for="c of data.comments"
          :comment="c"
          :key="c.commentId"
        ></CommentItem>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Api from "../../Api";
import CommentItem from "./CommentItem.vue";
export default {
  emits: ["close"],
  props: ["newsId"],
  setup(props: any, context: { emit: (arg0: string) => void }) {
    let textarea = ref("");
    // 模拟数据
    let data = reactive({
      commentNum: 0,
      comments: [],
    });

    async function getComment() {
      const result = await Api.article.getComment(props.newsId);

      if (result.code === "200") {
        data.commentNum = result.data.commentNum;
        data.comments = result.data.comments;
      } else {
        ElMessage({
          message: result.message,
          type: "warning",
        });
      }
    }
    function close() {
      context.emit("close");
    }

    onMounted(() => {
      getComment();
    });
    return {
      textarea,
      data,
      close,
      getComment,
    };
  },
};
</script>

<style lang="scss" scoped>
.commentContainer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.05);
  z-index: 2000;

  .commentContent {
    position: absolute;
    top: 70px;
    right: 0;
    width: 22%;
    height: 100%;
    z-index: 9993;
    background: #fff;
    border-radius: 5px;
    overflow: auto;

    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      border-bottom: 1px solid #eee;

      i {
        cursor: pointer;
      }
    }
    .content {
      padding: 20px;
      margin-bottom: 100px;
      :deep(.el-textarea__inner) {
        background: rgba(0, 0, 0, 0.02);
      }
    }
  }
}
</style>
