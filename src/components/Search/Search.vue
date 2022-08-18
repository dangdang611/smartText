<template>
  <div class="container">
    <div class="playBox">
      <video
        src="https://lf3-static.bytednsdoc.com/obj/eden-cn/upqlnvhj/pc_background_bird.mp4"
        preload="auto"
        autoplay
        loop
        muted
      ></video>
    </div>
    <div class="searchBox">
      <div class="description"></div>
      <div class="search">
        <!-- <el-input v-model="input"></el-input> -->
        <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          :trigger-on-focus="false"
          placeholder="请输入资讯标题"
          value-key="title"
          @select="handleSelect"
        />
        <el-button type="primary" @click="handleSelect">
          <el-icon style="vertical-align: middle">
            <i-ep-search />
          </el-icon>
        </el-button>
      </div>
      <div class="hot">
        <i></i>
        今日热搜：
        <ul>
          <li v-for="top in topSearch" :key="top.id" @click="goDetail(top.id)">
            {{ top.title.slice(0, 10) + "..." }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Api from "../../Api";
import { ref } from "vue";
import { useRouter } from "vue-router";
import emitter from "../../utils/mitt";
import { ElMessage } from "element-plus";
const state = ref("");

interface SearchItem {
  title: string;
  id: string;
}

const router = useRouter();

let timer: NodeJS.Timeout;
let topSearch = ref<SearchItem[]>([]);
async function refreshTop() {
  let result = await Api.article.getArticle("/get_hotRank", null, 0, 3);
  if (result.code == 200) {
    topSearch.value = result.data;
  }
}

const restaurants = ref<SearchItem[]>([]);

const loadAll = async (keyword: string) => {
  const result = await Api.article.autoComplete(keyword);
  if (result.code === 200) {
    restaurants.value = result.data;
  } else {
    ElMessage({
      message: result.message,
      type: "warning",
    });
  }
};

const querySearchAsync = (queryString: string, cb: any) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value;

  cb(results);
};

const createFilter = (queryString: string) => {
  return (restaurant: SearchItem) => {
    return (
      restaurant.title.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    );
  };
};

const handleSelect = () => {
  // 去搜索
  emitter.emit("toSearch", state.value);
};

function goDetail(newsId: string) {
  router.push(`/detail?articleId=${newsId}`);
}

watch(state, () => {
  loadAll(state.value);
});

onMounted(() => {
  loadAll(state.value);
  refreshTop();

  timer = setInterval(() => {
    refreshTop();
  }, 60 * 10000);
});

onUnmounted(() => {
  // 清除定时器
  clearInterval(timer);
});
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;

  .playBox {
    position: relative;
    top: 0;

    video {
      width: 100%;
    }
  }
  .searchBox {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 46.875rem;
    height: 18.75rem;
    text-align: center;
    color: #ffff;

    .description {
      margin: 0 auto;
      width: 500px;
      height: 100px;
      background: url("./images/未标题-1.png") no-repeat;
      background-size: 100%;
    }

    .search {
      display: flex;

      :deep .el-autocomplete {
        width: 100%;
      }
      :deep .el-input {
        height: 48px;
      }

      :deep .el-input__wrapper {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      :deep .el-button {
        width: 100px;
        height: 48px;
        font-size: 28px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }

    .hot {
      margin-top: 10px;
      display: flex;
      i {
        margin-right: 5px;
        display: block;
        width: 20px;
        height: 20px;
        background: url("./images/hot.png");
        background-size: 100%;
      }

      ul {
        display: flex;
        li {
          padding: 0 10px;
          cursor: pointer;
        }
        li:hover {
          color: #409eff;
        }
      }
    }
  }

  //  媒体查询
  @media screen and (max-width: 1400px) {
    .searchBox {
      width: 750px;
      .description {
        width: 500px;
      }
    }
  }
  @media screen and (max-width: 800px) {
    .searchBox {
      width: 550px;
      .description {
        width: 300px;
      }
    }
  }
  @media screen and (max-width: 500px) {
    .searchBox {
      width: 350px;
      .description {
        width: 100px;
      }
    }
  }
}
</style>
