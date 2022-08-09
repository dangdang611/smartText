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
          placeholder=""
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
          <li v-for="top in topSearch" :key="top.id">
            {{ top.title }}
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
const router = useRouter();
const state = ref("");

interface LinkItem {
  value: string;
  newsId: string;
}
interface topItem {
  title: string;
  id: string;
}

let timer: NodeJS.Timeout;
let topSearch = ref<topItem[]>([]);
async function refreshTop() {
  let result = await Api.article.getArticle("/get_hotRank", null, 0, 3);
  if (result.code == 200) {
    topSearch.value = result.data;
  }
}

const links = ref<LinkItem[]>([]);

const loadAll = async (keyword: string) => {
  const result = await Api.search.autoComplete(keyword);
  if (result.code === "200") {
    links.value = result.data.searchResult;
  } else {
    ElMessage({
      message: result.message,
      type: "warning",
    });
  }
};

let timeout: NodeJS.Timeout;
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  const results = queryString
    ? links.value.filter(createFilter(queryString))
    : links.value;

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    cb(results);
  }, 1000 * Math.random());
};

const createFilter = (queryString: string) => {
  return (restaurant: LinkItem) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    );
  };
};

const handleSelect = () => {
  // 去搜索
  emitter.emit("toSearch", state.value);
};

watch(state, () => {
  loadAll(state.value);
});

onMounted(() => {
  refreshTop();
  timer = setInterval(() => {
    refreshTop();
  }, 60 * 10000);
  loadAll(state.value);
});

onUnmounted(() => {
  // 清除定时器
  clearInterval(timeout);
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
