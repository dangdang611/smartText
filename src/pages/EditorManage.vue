<template>
  <div class="editorContainer">
    <div class="editorContent">
      <div class="leftContent">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          unique-opened
          router
        >
          <!-- 当el-menu开启了vue-router模式，那么默认以index的值为路径跳转，但如果index对应的el-menu-item配置了route对象，则以整个路由对象的配置为准 -->
          <!-- <el-menu-item index="1" :route="{ path: '/home' }"> -->
          <el-menu-item
            index="1"
            class="active"
            :route="{ path: '/editorManage/home' }"
          >
            <el-icon><i-ep-HomeFilled /></el-icon>
            <span class="home">主页</span>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><i-ep-edit /></el-icon>
              <span>创作</span>
            </template>
            <el-menu-item index="2-1" :route="{ path: '/editorPage' }"
              >写文章</el-menu-item
            >
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><i-ep-Coin /></el-icon>
              <span>管理</span>
            </template>
            <el-menu-item
              index="3-1"
              :route="{ path: '/editorManage/productionManage' }"
              >作品管理</el-menu-item
            >
            <el-menu-item
              index="3-2"
              :route="{ path: '/editorManage/commentManage' }"
              >评论管理</el-menu-item
            >
            <el-menu-item index="3-3">专栏管理</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <el-icon><i-ep-DataLine /></el-icon>
              <span>数据</span>
            </template>
            <el-menu-item index="4-1">作品数据</el-menu-item>
            <el-menu-item index="4-2">粉丝数据</el-menu-item>
            <el-menu-item index="4-3">收益数据</el-menu-item>
          </el-sub-menu>
          <el-menu-item
            index="5"
            :route="{ path: '/editorManage/checkArticle' }"
          >
            <el-icon><i-ep-Setting /></el-icon>
            <span class="setting">审核测试功能</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="rightContent">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { MenuItemClicked } from "element-plus";
import { NavigationFailure } from "vue-router";

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
// const handleSelect = (
//   key: string,
//   keyPath: string[],
//   item: MenuItemClicked,
//   routerResult?: Promise<void | NavigationFailure> | undefined
// ) => {
//   console.log(key, keyPath, routerResult);
// };
</script>

<style lang="scss" scoped>
.editorContainer {
  overflow: hidden;
  background: #f5f6f7;
  width: 100%;
  height: 720px;

  .editorContent {
    margin-top: 70px;
    padding: 10px 60px;
    display: flex;
    height: 90%;
    > div {
      background: #ffff;
    }

    .leftContent {
      width: 20%;

      :deep(.el-menu) {
        height: 100%;
        padding-top: 20px;
        padding-left: 6px;
      }
      :deep(.el-sub-menu__title),
      .home,
      .setting {
        font-size: 18px;
      }
      :deep(.el-menu-item) {
        font-size: 14px;
      }
    }
    .rightContent {
      flex: 1;
      display: flex;
      background: #f5f6f7;
    }
  }
}

.active {
  color: #409eff;
}
</style>
