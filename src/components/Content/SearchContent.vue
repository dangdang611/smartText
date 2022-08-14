<template>
  <div class="container">
    <div class="content">
      <NewsList
        :NewMessage="searchResult.NewMessage"
        :VideoMessage="searchResult.VideoMessage"
      ></NewsList>
      <PageDevice :count="count"></PageDevice>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Api from "../../Api";
import emitter from "../../utils/mitt";
let page = ref(1);
let size = ref(3);
let count = reactive({
  num: 1,
});
const props = defineProps(["keyword"]);

let searchResult = reactive({
  NewMessage: [],
  VideoMessage: [],
});

watch(props.keyword, () => {
  toSearch();
});

const toSearch = async () => {
  // 搜索
  const result = await Api.article.searchArticle(
    props.keyword.value,
    page.value,
    size.value
  );

  if (result.code === 200) {
    searchResult.NewMessage = result.data;
  } else {
    ElMessage({
      message: result.message,
      type: "warning",
    });
  }
};

onMounted(() => {
  emitter.on("refreshHomeData", (currentPage) => {
    page.value = currentPage as number;
    toSearch();
  });
});

onUnmounted(() => {
  emitter.off("refreshHomeData");
});
</script>

<style lang="scss" scoped>
.container {
  overflow: hidden;
  width: 100%;
  background-color: #f5f6f7;

  .content {
    width: 60%;
    margin: 10px auto;
    border-radius: 10px;
    padding: 10px 20px;
    background: #fff;
    overflow: hidden;
  }
}
</style>
