<template>
  <div class="commentContainer" @click="clickScreen($event)">
    <div class="commentContent" :ref="(el) => (child = el)" id="child">
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
          @keyup.enter="addComment"
          ref="textInput"
        />
        <el-button
          type="primary"
          plain
          style="float: right; margin-top: 3px"
          @click="addComment"
          >发表</el-button
        >

        <CommentItem
          v-for="c of data.comments"
          :comment="c"
          :key="c.id"
          @getLike="getLike"
          @replyComment="replyComment"
        ></CommentItem>

        <div v-if="!data.commentNum" class="noComment_tips">
          暂时没有评论，快来抢占沙发吧
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import Api from "../../Api";
interface Comment {
  id: string;
  createTime: string;
  authorId: string;
  userId: string;
  content: string;
  likeNum: number;
}

interface CommentInfo {
  commentNum: number;
  comments: Comment[];
}

const $myemit = defineEmits(["close", "refresh"]);
const props = defineProps(["articleId"]);
const router = useRoute();

let textarea = ref("");
let prefixLen = ref(0);
let target = ref("");
const child = ref();
const textInput = ref();

// 模拟数据
let data: CommentInfo = reactive({
  commentNum: 0,
  comments: [],
});

async function getComment() {
  const result = await Api.comment.getComment("/get_comment", props.articleId);

  if (result.code === 200) {
    data.commentNum = result.data[1];
    data.comments = result.data[0];
  } else {
    ElMessage({
      message: result.message,
      type: "warning",
    });
  }

  //同步父页数据
  $myemit("refresh");
}

async function addComment() {
  let content = textarea.value.slice(prefixLen.value);

  if (content != "") {
    let userId = JSON.parse(localStorage.getItem("user_info") || "{}").userId;
    let articleId = router.query.articleId as string;
    let targetId = target.value.length ? target.value : null;
    let result = await Api.comment.addComment(
      userId,
      articleId,
      content,
      targetId
    );
    if (result.code == 200) {
      // 刷新数据
      getComment();
      //清空文本框
      textarea.value = "";
    }
  }
}

async function getLike(commentId: string, isAdd: number) {
  let result = await Api.comment.getLike(commentId, isAdd);
  if (result.code == 200) {
    // 刷新数据
    getComment();
  }
}

function clickScreen(e: MouseEvent) {
  // 获取评论框在父元素中的位置
  let y = child.value.offsetTop;
  let x = child.value.offsetLeft;

  // 判断点击是否发生在评论框之外
  if (e.pageX < x && e.pageY > y) {
    close();
  }
}

function replyComment(targetId: string, targetName: string) {
  let prefix = "@" + targetName + "：";
  textarea.value = prefix;
  prefixLen.value = prefix.length;
  target.value = targetId;

  //滚动到顶部
  document.getElementById("child")!.scrollTo(0, 0);
  textInput.value.focus();
}
function close() {
  $myemit("close");
}

onMounted(() => {
  getComment();
});
</script>

<style lang="scss" scoped>
.commentContainer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.05);
  z-index: 1998;

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

  .noComment_tips {
    margin-top: 70px;
    margin-left: 30px;
    font-size: 16px;
    color: #999;
  }
}
</style>
