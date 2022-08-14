<template>
  <div class="rankContainer">
    <div class="head">
      <i></i>
      <h3>头条热榜</h3>
      <span @click="refreshHot()">
        <el-icon>
          <i-ep-Refresh />
        </el-icon>
        换一换</span
      >
    </div>
    <div class="hotNews">
      <ul>
        <li
          v-for="(hot, index) in data.hotNews"
          :key="hot.newsId"
          @click="goDetail(hot.id)"
        >
          <span v-if="index == 0"
            ><el-icon> <i-ep-Flag /> </el-icon
          ></span>
          <span v-else>{{ page * 10 + index }}</span>
          {{ hot.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import Api from "../../Api";

export default {
  setup() {
    const router = useRouter();
    let data = reactive({
      hotNews: [],
    });

    let toggle = ref(false);
    let page = ref(0);

    async function refreshHot() {
      if (!toggle.value) {
        page.value = 0;
      } else {
        page.value = 1;
      }

      toggle.value = !toggle.value;
      const result = await Api.article.getArticle(
        "/get_hotRank",
        null,
        page.value,
        10
      );
      if (result.code === 200) {
        data.hotNews = result.data;
      } else {
        ElMessage({
          message: result.message,
          type: "warning",
        });
      }
    }

    function goDetail(newsId: string) {
      router.push(`/detail?articleId=${newsId}`);
    }

    onMounted(() => {
      refreshHot();
    });

    return {
      data,
      refreshHot,
      goDetail,
      page,
    };
  },
};

function refreshHot() {
  throw new Error("Function not implemented.");
}
</script>

<style lang="scss" scoped>
.rankContainer {
  .head {
    margin-bottom: 10px;
    display: flex;
    position: relative;

    > i {
      margin-right: 15px;
      display: block;
      width: 20px;
      height: 20px;
      background: url("./images/hot.png");
      background-size: 100%;
    }

    span {
      position: absolute;
      right: 0;
      top: 0;
      color: #337ecc;
      cursor: pointer;
    }
  }

  .hotNews {
    ul > li {
      padding: 10px 10px;
      color: #666;
      cursor: pointer;

      span {
        margin-right: 5px;
      }

      &:nth-child(1) {
        color: #b983ff;

        span {
          font-size: 19px;
          font-weight: 700;
          margin-right: -1px;
        }
      }
      &:nth-child(2) {
        color: #94b3fd;
      }
      &:nth-child(3) {
        color: #94daff;
      }
    }
  }
}
</style>
