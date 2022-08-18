<template>
  <div class="detailContainer">
    <div class="detailContent">
      <h2>{{ data.info.title }}</h2>
      <div class="infoMessage">
        <span
          class="infoTag"
          v-for="(tag, index) in data.info.tag"
          :key="index"
          >{{ tag }}</span
        >
        <span>{{ data.info.createTime.slice(0, 10) }}</span
        ><span>{{ data.info.authorName }}</span>
      </div>
      <div class="paragrah">
        <mavon-editor
          class="md"
          v-model="data.info.content"
          :editable="false"
          :toolbarsFlag="false"
          :shortCut="false"
          :subfield="false"
          defaultOpen="preview"
        ></mavon-editor>
      </div>
    </div>
  </div>
  <div class="tools">
    <ul>
      <li @click="getLike()" :class="isLike ? 'like' : ''">
        <el-icon>
          <i-ep-Apple />
        </el-icon>
        <span>{{ data.info.likeNum }}</span>
        <el-divider />
      </li>
      <li @click="isComment = !isComment">
        <el-icon>
          <i-ep-ChatDotRound />
        </el-icon>
        <span>{{ data.info.commentNum }}</span>
        <el-divider />
      </li>
      <li @click="isCollect = !isCollect" :class="isCollect ? 'collect' : ''">
        <el-icon>
          <i-ep-Star />
        </el-icon>
        <span v-show="!isCollect">收藏</span>
        <span v-show="isCollect">已收藏</span>
        <el-divider />
      </li>
      <li>
        <el-icon @click="shareThis">
          <i-ep-Share />
        </el-icon>
        <span>分享</span>
      </li>
    </ul>
  </div>
  <div class="userMessage">
    <el-avatar class="head" size="large" :src="data.author.avatarUrl" />
    <span>{{ data.author.userName }}</span>
    <el-button
      v-show="!isAttention"
      type="primary"
      round
      plain
      @click="attention"
      >关注</el-button
    >
    <el-button v-show="isAttention" type="primary" round @click="attention"
      >已关注</el-button
    >
  </div>

  <transition name="fade">
    <Comment
      v-show="isComment"
      @close="closeComment"
      :articleId="path"
      @refresh="getDetail"
    ></Comment>
  </transition>

  <el-backtop :bottom="100">
    <div
      style="
        height: 100%;
        width: 100%;
        background-color: var(--el-bg-color-overlay);
        box-shadow: var(--el-box-shadow-lighter);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      "
    >
      <el-icon>
        <i-ep-Top></i-ep-Top>
      </el-icon>
    </div>
  </el-backtop>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import Api from "../Api";

interface Info {
  title: string;
  createTime: string;
  authorId: string;
  authorName: string;
  content: string;
  tag: string[];
  likeNum: number;
  commentNum: number;
}
interface Author {
  id: string;
  avatarUrl: string;
  userName: string;
}

interface ArticleInfo {
  info: Info;
  author: Author;
}

let isLike = ref(false);
let isComment = ref(false);
let isCollect = ref(false);
let isAttention = ref(false);

const route = useRoute();
let path = route.query.articleId as string;

// 通过请求服务器获取数据，死数据替代
let data: ArticleInfo = reactive({
  info: {
    title: "",
    createTime: "",
    authorId: "",
    authorName: "",
    content: "",
    tag: [""],
    likeNum: 0,
    commentNum: 0,
  },
  author: {
    id: "",
    avatarUrl: "",
    userName: "",
  },
});

function shareThis() {}
function closeComment() {
  isComment.value = false;
}
async function getDetail() {
  //查询已发布的文章
  let result = await Api.article.getDetail(path);

  //查询失败，查询审核中的文章
  if (result.data == null) {
    result = await Api.checking_article.getDetail(path);

    //查询再次失败，查询审核失败的文章
    if (result.data == null) {
      result = await Api.fail_article.getDetail(path);
    }
  }

  //最终查询成功
  if (result.data != null) {
    data.info = result.data;
    data.info.tag = result.data.tag.split(",");
  } else {
    ElMessage({
      message: "查询失败",
      type: "warning",
    });
  }

  //获取作者信息
  getAuthorInfo();
}

async function getAuthorInfo() {
  let result = await Api.user.getUserData(data.info.authorId);
  if (result.code == 200) {
    data.author = result.data;
  }

  let attentionUsers = (
    await Api.attention.getAttention(
      JSON.parse(localStorage.getItem("user_info") || "{}").userId
    )
  ).data;

  if (attentionUsers.includes(data.info.authorId)) isAttention.value = true;
  else isAttention.value = false;
}

async function getLike() {
  isLike.value = !isLike.value;
  let result = await Api.article.getLike(
    path,
    JSON.parse(localStorage.getItem("user_info") || "{}").userId,
    Number(isLike.value)
  );
  if (result.code == 200) {
    // 刷新数据,获取文章信息
    getDetail();
  }
}

async function attention() {
  if (isAttention.value) {
    let result = await Api.attention.delAttention(
      JSON.parse(localStorage.getItem("user_info") || "{}").userId,
      data.author.id
    );

    ElMessage({
      type: result.data ? "success" : "error",
      message: result.data ? "取消关注" : "取消关注失败",
    });
  } else {
    let result = await Api.attention.setAttention(
      JSON.parse(localStorage.getItem("user_info") || "{}").userId,
      data.author.id
    );

    ElMessage({
      type: result.code == 200 ? "success" : "error",
      message: result.code == 200 ? "关注成功" : "关注失败",
    });
  }

  //刷新页面
  getDetail();
}

async function getLikeStatus() {
  //获取文章点赞状态
  let res = await Api.like.isLike(
    JSON.parse(localStorage.getItem("user_info") || "{}").userId,
    path
  );
  isLike.value = res.data;
}
onMounted(() => {
  //获取文章详细信息
  getDetail();
  getLikeStatus();
  Api.article.addShowNum(path);
});
</script>

<style lang="scss" scoped>
.detailContainer {
  overflow: hidden;
  background-color: #f5f6f7;

  .detailContent {
    margin: 0 auto;
    margin-top: 75px;
    padding: 20px 30px;
    width: 60%;
    border-radius: 15px;
    background-color: #fff;

    h2 {
      text-align: center;
    }

    .infoMessage {
      margin-top: 20px;
      text-align: center;

      span {
        margin-left: 20px;
        color: #999;

        &.infoTag {
          padding: 2px;
          color: #409eff;
          background: rgb(217, 236, 255);
          border-radius: 5px;
        }
      }
    }

    .paragrah {
      margin-top: 20px;

      .v-note-wrapper {
        min-height: 505px;
      }
    }
  }
}
.tools {
  position: fixed;
  top: 50%;
  // 可视区的一半
  right: 50%;
  // 版心的一半
  margin-right: 31%;
  z-index: 9999;

  ul > li {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60px;
    font-size: 24px;
    cursor: pointer;

    span {
      margin-top: 15px;
      font-size: 16px;
    }

    :deep(.el-divider--horizontal) {
      margin: 10px 0;
    }
  }

  .like {
    color: #409eff;
  }

  .collect {
    color: #ffc740;
  }
}
.userMessage {
  position: fixed;
  top: 12%;
  left: 50%;
  margin-left: 31%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 200px;
  border-radius: 5px;

  > span {
    margin: 10px 0;
  }
}
</style>
