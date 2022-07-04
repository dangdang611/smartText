<template>
  <ManageSlot :count="count">
    <template v-slot:title>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">我的文章评论</el-menu-item>
        <el-menu-item index="2">我发表的评论</el-menu-item>
      </el-menu>
    </template>
    <template v-slot:content>
      <CommentItem v-for="item of data" :key="item.commentId" :comment="item" />
    </template>
  </ManageSlot>
</template>

<script lang="ts" setup>
// 可以不import
import ManageSlot from "../../components/Management/ManageSlot.vue";
import CommentItem from "../../components/Management/CommentItem.vue";
import Api from "../../Api";

let data = ref([
  {
    commentId: "001",
    userCount: "18613932106",
    content: "说得好",
    time: "2022年12月12日",
    likeNum: "45",
    title: "22222",
    newsId: "00001",
    userAvatar: "http://dymmyimage.com/300X600",
  },
]);
let activeIndex = ref("1");
let page = ref(1);
let size = ref(4);
let count = reactive({
  num: 0,
});

async function handleSelect(type: string) {
  const result = await Api.manage.getCommeData(
    localStorage.getItem("count")!,
    Number(type),
    page.value,
    size.value
  );

  if (result.code === "200") {
    data.value = result.data.comments;
    count.num = result.data.total;
  } else {
    ElMessage({
      message: result.message,
      type: "warning",
    });
  }
}
onMounted(() => {
  handleSelect(activeIndex.value);
});
</script>

<style lang="scss" scoped></style>
