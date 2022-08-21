<template>
  <div class="userContainer">
    <h3>我的数据</h3>
    <div class="show">
      <ul>
        <li>
          <span style="color: #b983ff">{{ data.likeNum }}</span>
          <span>获赞</span>
        </li>
        <li>
          <span style="color: #94b3fd">{{ data.fansNum }}</span>
          <span>粉丝</span>
        </li>
        <li>
          <span style="color: #94daff">{{ data.attentionNum }}</span>
          <span>关注</span>
        </li>
      </ul>
    </div>
    <div class="func">
      <div @click="goEditor">
        <el-icon style="vertical-align: middle">
          <i-ep-EditPen />
        </el-icon>
        <span>去创作</span>
      </div>

      <div @click="goManage">
        <el-icon style="vertical-align: middle"> <i-ep-Avatar /> </el-icon
        ><span>个人中心</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import Api from "../../Api";

export default {
  setup() {
    let data = reactive({
      likeNum: 0,
      fansNum: 0,
      attentionNum: 0,
    });

    const router = useRouter();

    function goEditor() {
      router.push("/editorPage");
    }

    function goManage() {
      router.push("/editorManage");
    }

    async function getCountUser() {
      const result = await Api.user.getUserCount(
        JSON.parse(localStorage.getItem("user_info") || "{}").userId
      );
      if (result.code === 200) {
        ({
          likeNum: data.likeNum,
          fansNum: data.fansNum,
          attentionNum: data.attentionNum,
        } = result.data);
      }
    }

    onMounted(() => {
      getCountUser();
    });

    return {
      data,
      goEditor,
      goManage,
    };
  },
};
</script>

<style lang="scss" scoped>
.userContainer {
  height: 100%;
  display: flex;
  flex-direction: column;

  h3 {
    padding-bottom: 10px;
    border-bottom: 2px solid #409eff;
  }

  .show {
    margin: 10px 0;
    ul {
      display: flex;
      justify-content: space-around;

      li {
        display: block;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 15px 28px;
        border-radius: 10px;
        background: rgb(64 158 255 / 5%);

        span:nth-child(1) {
          margin-bottom: 10px;
          font-weight: 700;
        }
      }
    }
  }

  .func {
    flex: 1;
    display: flex;
    border-radius: 10px;
    background: rgb(64 158 255 / 5%);

    div {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      color: #409eff;
      cursor: pointer;

      span {
        margin-top: 10px;
        font-size: 14px;
      }
    }
  }
}
</style>
