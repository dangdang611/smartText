<template>
  <div class="pageContainer">
    <div class="pageContent">
      <div class="titleContent">
        <el-input v-model="data.title" placeholder="请输入文章标题..." />
        <el-button type="primary" plain>保存</el-button>
        <el-button type="primary" @click="publish">发布</el-button>
      </div>
      <el-divider />
      <mavon-editor
        v-model="data.mdContent"
        @change="change"
        @imgAdd="addImg"
        ref="editor"
      />
      <div class="bottomTips">
        <div class="left">
          <span>字数：{{ wordsNum }}</span> <span>行数：{{ colNum }}</span>
        </div>
        <div class="right" @click="goTop"><span>回到顶部</span></div>
      </div>
    </div>
  </div>
  <transition name="fade">
    <ConfirmPublish
      v-show="isPublish"
      @close="closePublish"
      :data="data"
    ></ConfirmPublish>
  </transition>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import Api from "../Api";
import ConfirmPublish from "../components/Editor/ConfirmPublish.vue";

const { ctx } = getCurrentInstance();
const route = useRoute();

let data = reactive({
  title: "",
  content: "",
  coverPic: "",
  mdContent: "",
});

let isPublish = ref(false);
let wordsNum = computed(() => {
  return data.content.length || 0;
});

function searchStrIndexOf(str: string, target: string) {
  let index = str.indexOf(target);
  let sum = 0;
  while (index > -1) {
    index = str.indexOf(target, index + 1);
    sum++;
  }
  return sum;
}

let colNum = computed(() => {
  return searchStrIndexOf(data.content, "\n");
});

function closePublish() {
  isPublish.value = false;
}

function change(value: string, render: string) {
  data.content = render;
}

function publish() {
  isPublish.value = true;
}

function goTop() {
  console.log("回到顶部");
}

async function addImg(pos: string, $file: string) {
  //新建form表单类型的数据
  let formData = new FormData();
  //将我们上传的图片地址$file加进表单里面，命名为“file”（参数名字与后端相匹配）
  formData.append("pic", $file);
  let result = await Api.resource.uploadPic(formData);
  if (result.status == 200) {
    ctx.$refs.editor.$img2Url(pos, result.data);
  } else {
    ElMessage({
      message: "上传失败",
      type: "warning",
    });
  }
}

onMounted(async () => {
  let articleId = route.query.articleId as string;

  if (articleId) {
    //查询已发布的文章
    let result = await Api.article.getDetail(articleId);

    //查询失败，查询审核中的文章
    if (result.data == null) {
      result = await Api.checking_article.getDetail(articleId);

      //查询再次失败，查询审核失败的文章
      if (result.data == null) {
        result = await Api.fail_article.getDetail(articleId);
      }
    }

    //最终查询成功
    if (result.data != null) {
      ({
        title: data.title,
        content: data.content,
        coverPic: data.coverPic,
        mdContent: data.mdContent,
      } = result.data);
    } else {
      ElMessage({
        message: "查询失败",
        type: "warning",
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.pageContainer {
  overflow: hidden;
  background: #f5f6f7;
  .pageContent {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-top: 70px;
    padding: 0px 30px;
    width: 100%;
    height: 640px;
    background-color: #fff;

    .titleContent {
      display: flex;
      align-items: center;
      height: 10%;

      :deep(.el-input__inner) {
        height: 50px;
        padding-left: 20px;
        font-size: 24px;
      }

      :deep(.el-input__wrapper) {
        box-shadow: none;
      }
    }

    :deep(.el-divider--horizontal) {
      margin: 10px 0;
    }
    .v-note-wrapper {
      flex: 1;
    }

    .bottomTips {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #333;

      .left {
        > span:nth-child(2) {
          margin-left: 10px;
        }
      }

      .right {
        cursor: pointer;
      }
    }
  }
}
</style>
