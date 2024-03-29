<template>
  <!-- 当前页面是首页，且初始化头部要显示 -->
  <div class="headerContainer1" v-if="$route.meta.isInitHeader && isShow">
    <div class="logo">
      <h1>
        <a href="#">智能资讯平台</a>
      </h1>
    </div>
    <div class="headList">
      <ul id="left">
        <li>关于我们</li>
        <li>反馈</li>
        <li>侵权投诉</li>
      </ul>
      <ul id="right">
        <li @click="goEditor">
          <el-icon>
            <i-ep-EditPen />
          </el-icon>
          发布作品
        </li>
        <li @click="login" v-show="!isLogin">登录</li>
        <li v-show="isLogin">
          <el-avatar class="head" :src="userInfo.userAvatar" />
          {{ userInfo.userName }}
        </li>
        <li v-show="isLogin">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <el-icon class="el-icon--right">
                <i-ep-arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="loginOut">注销</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>
      </ul>
    </div>
  </div>
  <!-- 当前页面不是首页，或者说初始化头部不显示，且不是编辑页 -->
  <div
    class="headerContainer2"
    v-if="(!$route.meta.isInitHeader || !isShow) && !$route.meta.isEditorHeader"
  >
    <div class="logo">
      <h1>
        <a href="#">智能资讯平台</a>
      </h1>
    </div>
    <div class="headList">
      <ul id="left">
        <li>关于我们</li>
        <li>反馈</li>
        <li>侵权投诉</li>
      </ul>
      <div class="search">
        <div class="search">
          <el-input v-model="keyword" @keyup.enter="goSearch"></el-input>
          <el-button type="primary" @click="goSearch">
            <el-icon style="vertical-align: middle">
              <i-ep-search />
            </el-icon>
          </el-button>
        </div>
      </div>
      <ul id="right">
        <li>
          <el-icon>
            <i-ep-EditPen />
          </el-icon>
          发布作品
        </li>
        <li @click="login" v-show="!isLogin">登录</li>
        <li v-show="isLogin">
          <el-avatar class="head" :src="userInfo.userAvatar" />
          {{ userInfo.userName }}
        </li>
        <li v-show="isLogin">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <el-icon class="el-icon--right">
                <i-ep-arrow-down />
              </el-icon>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="loginOut">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
  </div>
  <!-- 当前页是编辑页 -->
  <div class="headerContainer3" v-if="$route.meta.isEditorHeader">
    <div class="logo">
      <h1>
        <a href="#">智能资讯平台</a>
      </h1>
    </div>
    <div class="headList">
      <ul id="left">
        <li>关于我们</li>
        <li>反馈</li>
        <li>侵权投诉</li>
      </ul>
      <ul id="right">
        <li>
          <el-icon>
            <i-ep-bell />
          </el-icon>
          <el-tag
            key="01"
            type="danger"
            class="mx-1 messageTip"
            effect="dark"
            size="small"
            round
          >
            5
          </el-tag>
        </li>
        <li>
          欢迎来到智能资讯创作平台
          <el-divider direction="vertical" />
        </li>
        <li @click="login" v-show="!isLogin">登录</li>
        <li v-show="isLogin">
          <el-avatar class="head" :src="userInfo.userAvatar" />
          {{ userInfo.userName }}
        </li>
        <li v-show="isLogin">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <el-icon class="el-icon--right">
                <i-ep-arrow-down />
              </el-icon>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="loginOut">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from "element-plus";
import Api from "../../Api";
import emitter from "../../utils/mitt";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";

const $myemit = defineEmits(["openLogin"]);
const router = useRouter();

let userInfo = reactive({
  userCount: "",
  userName: "",
  userAvatar: "",
});

// 初始化
getUserInfo();

let isShow = ref(true);
let isLogin = userInfo.userCount ? ref(true) : ref(false);
let keyword = ref("");

function goSearch() {
  // 去搜索
  emitter.emit("toSearch", keyword.value);
}
// 登录
function login() {
  $myemit("openLogin");
}

// 注销
function loginOut() {
  ElMessageBox.confirm("确定要注销账号吗？", "提示", {
    confirmButtonText: "注销",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    const result = await Api.user.logout(userInfo.userCount);
    if (result.code === 200) {
      ElMessage({
        type: "success",
        message: "注销成功",
      });

      // 删除指定名称的cookie
      Cookies.remove("smartToken");

      // 清除缓存
      localStorage.removeItem("user_info");

      isLogin.value = false;

      //刷新Content
      emitter.emit("refreshContent");

      //刷新UserFunction
      emitter.emit("refreshUserFunction");
    } else {
      ElMessage({
        type: "warning",
        message: "注销失败",
      });
    }
  });
}

//获取用户信息
function getUserInfo() {
  let info = JSON.parse(localStorage.getItem("user_info") || "{}");
  userInfo.userCount = info.userCount;
  userInfo.userAvatar = info.userAvatar;
  userInfo.userName = info.userName;
}

//切换header样式
function toggleHeader(show: boolean) {
  isShow.value = show;
}

function goEditor() {
  router.push("/editorPage");
}
onMounted(() => {
  // 刷新Header数据
  emitter.on("refreshHeader", () => {
    getUserInfo();
    isLogin.value = true;
  });

  emitter.on("toggleHeader", (show) => {
    toggleHeader(show as boolean);
  });
});

onUnmounted(() => {
  emitter.off("refreshHeader");
  emitter.off("toggleHeader");
});
</script>

<style lang="scss" scoped>
// head栏样式
.headerContainer1,
.headerContainer2,
.headerContainer3 {
  padding: 15px;
  width: 100%;
  position: fixed;
  display: flex;
  animation: moveY 0.5s linear alternate;
  color: #ffff;
  z-index: 1999;
  .logo a {
    display: block;
    width: 104px;
    height: 38px;
    background: url("@/assets/images/logo.png") repeat;
    background-size: 100% 100%;
    font-size: 0;
  }

  .headList {
    margin-left: 20px;
    flex: 1;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    cursor: pointer;

    #left,
    #right {
      display: flex;
      align-items: center;

      > li {
        padding: 0 10px;
        .head {
          vertical-align: middle;
        }
      }
    }
  }
}

.headerContainer2,
.headerContainer3 {
  color: #000;
  background: #ffff;
  .logo a {
    background: url("@/assets/images/logo2.png") repeat;
    background-size: 100% 100%;
  }
}

.headerContainer2 {
  .search {
    display: flex;

    :deep(.el-input) {
      width: 300px;
      height: 32px;
    }
    :deep(.el-input__wrapper) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    :deep(.el-button) {
      width: 60px;
      height: 32px;
      font-size: 16px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
.headerContainer3 {
  :deep(.el-icon) {
    font-size: 24px;
  }

  .messageTip {
    position: relative;
    top: -17px;
    left: -5px;
  }
}
</style>
