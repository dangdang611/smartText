<template>
  <div class="container">
    <div class="leftContent">
      <div class="recommend">
        <el-menu
          default-active="/get_attentionArticle"
          class="el-menu-demo"
          mode="horizontal"
          @select="toggle"
        >
          <el-menu-item index="/get_attentionArticle">关注</el-menu-item>
          <el-menu-item index="/get_likeArticle">猜你喜欢</el-menu-item>
          <el-menu-item index="/get_hotArticle">热点</el-menu-item>
          <el-menu-item index="/get_newArticle">最新</el-menu-item>
          <el-menu-item index="/get_otherArticle">更多</el-menu-item>
        </el-menu>
      </div>
      <div class="content">
        <NewsList :NewMessage="NewMessage"></NewsList>
        <div class="tips">
          <div class="loadTips" v-if="!NewMessage.length && isMore">
            暂时没有，去看看别的吧
          </div>
          <div class="loadTips" v-if="!isMore">不要再划啦，已经见底了~~</div>
          <div class="loadTips" v-loading="isMore && !isload"></div>
        </div>
      </div>
    </div>
    <div class="rightContent">
      <div class="userFuction">
        <UserFunction></UserFunction>
      </div>
      <div class="hotNews" :ref="(el) => (hotNews = el)">
        <RankHotNews></RankHotNews>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { Ref } from "vue";
import Api from "../../Api";
import emitter from "../../utils/mitt";
interface article {
  id: string;
  createTime: string;
  title: string;
  authorId: string;
  authorName: string;
  content: string;
  mdContent: string;
  coverPic: string;
  digest: string;
  specialColumn: string;
  tag: string;
  likeNum: number;
  showNum: number;
}

let page = ref(0);
let size = ref(4);

//滚动条是否到底部的标志
let isAchiveBottom = ref(false);
//是否还有数据可加载
let isMore = ref(true);
//是否加载成功
let isload = ref(false);

let hotNews = ref();

let currentPath = ref("/get_attentionArticle");
const userId = JSON.parse(localStorage.getItem("user_info") || "{}").userId;

let NewMessage: Ref<article[]> = ref([]);

const toggle = function (indexPath: string) {
  currentPath.value = indexPath;
  page.value = 0;
  NewMessage.value = [];
  isMore.value = true;
  getMessage();
};

async function getMessage() {
  const result = await Api.article.getArticle(
    currentPath.value,
    userId,
    page.value,
    size.value
  );

  if (result.code === 200) {
    if (!result.data.length) {
      isMore.value = false;
    } else {
      NewMessage.value = [...NewMessage.value, ...result.data];
    }
  } else {
    ElMessage({
      message: result.message,
      type: "warning",
    });
  }
}

onMounted(() => {
  getMessage();
  emitter.on("delListInfo", (id) => {
    let newList = NewMessage.value.filter((element: article) => {
      return element.id != id;
    });
    NewMessage.value = newList;
  });

  // 滚动加载
  window.onscroll = () => {
    //变量scrollTop是已经滚动上去的距离
    var scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    //变量windowHeight是可视区的高度
    var windowHeight =
      document.documentElement.clientHeight || document.body.clientHeight;

    //变量scrollHeight是滚动条的总高度
    var scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;

    //滚动条到底部的条件(距底部20px时触发加载)
    if (
      scrollTop + windowHeight >= scrollHeight - 20 &&
      !isAchiveBottom.value &&
      isMore.value
    ) {
      isAchiveBottom.value = true;
      isload.value = true; //开始加载
      //延时触发数据加载
      setTimeout(() => {
        page.value += 1;
        getMessage();
        isAchiveBottom.value = false;
        isload.value = false; //加载结束
      }, 500);
    }

    if (scrollTop >= 400) {
      emitter.emit("toggleHeader", false);

      if (scrollTop >= 700) {
        hotNews.value.className = "hotNews2";
      } else {
        hotNews.value.className = "hotNews";
      }
    } else {
      emitter.emit("toggleHeader", true);
    }
  };
});

onUnmounted(() => {
  emitter.off("delListInfo");
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  max-width: 100%;
  background: #f5f6f7;

  .leftContent,
  .rightContent {
    margin-top: 10px;
    width: 650px;
    // height: 920px;
    border: 1px solid #eee;
    border-radius: 10px;
    overflow: hidden;
  }

  .leftContent {
    padding-bottom: 20px;
    background: #fff;
    .recommend {
      :deep .el-menu {
        padding-left: 30px;
      }

      :deep .el-menu-item {
        font-size: 17px;
        padding: 0 30px;
      }
    }

    .content {
      padding: 20px 30px;
      .tips {
        margin-top: 50px;
        .loadTips {
          text-align: center;
          color: #999;
        }
      }
    }
  }

  .rightContent {
    width: 320px;
    margin-left: 10px;

    .userFuction {
      margin-bottom: 10px;
      padding: 20px 20px 15px 20px;
      width: 100%;
      height: 260px;
      background: #fff;
    }

    .hotNews {
      padding: 20px;
      width: 100%;
      background: #fff;
    }
  }

  .hotNews2 {
    position: fixed;
    top: 11%;
    padding: 20px;
    width: 320px;
    background: #fff;
  }
}
</style>
