<template>
  <ManageSlot :count="count">
    <template v-slot:title>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="/get_myArticleComment">我的文章评论</el-menu-item>
        <el-menu-item index="/get_myComment">我发表的评论</el-menu-item>
      </el-menu>
    </template>
    <template v-slot:content>
      <CommentItem
        v-for="item of data"
        :key="item.id"
        :comment="item"
        @del="deleteComment"
      />
    </template>
  </ManageSlot>
</template>

<script lang="ts" setup>
// 可以不import
import ManageSlot from "../../components/Management/ManageSlot.vue";
import CommentItem from "../../components/Management/CommentItem.vue";
import Api from "../../Api";
import { Ref } from "vue";
import emitter from "../../utils/mitt";
import { ElMessage } from "element-plus";

interface Comment {
  id: string;
  createTime: string;
  articleId: string;
  userId: string;
  content: string;
  targetId: string;
  likeNum: number;
  userName: string;
  avatarUrl: string;
  targetName: string;
}

let data: Ref<Comment[]> = ref([]);
let activeIndex = ref("/get_myArticleComment");
let page = ref(0);
let size = ref(4);
let count = reactive({
  sum: 0,
});

async function handleSelect(path: string) {
  activeIndex.value = path;
  const result = await Api.comment.getComment(
    activeIndex.value,
    JSON.parse(localStorage.getItem("user_info") || "{}").userId,
    page.value,
    size.value
  );

  if (result.code === 200) {
    data.value = result.data[0];
    count.sum = result.data[1];
  } else {
    ElMessage({
      message: result.message,
      type: "warning",
    });
  }
}

const deleteComment = async (commentId: string) => {
  let result = await Api.comment.delComment(commentId);
  ElMessage({
    message: result.data ? "删除成功" : "删除失败",
    type: result.data ? "success" : "warning",
  });
  handleSelect(activeIndex.value);
};
onMounted(() => {
  handleSelect(activeIndex.value);
  emitter.on("refreshCommentData", (currentPage) => {
    page.value = (currentPage as number) - 1;
    handleSelect(activeIndex.value);
  });
});

onUnmounted(() => {
  emitter.off("refreshCommentData");
});
</script>

<style lang="scss" scoped></style>
