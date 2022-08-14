import Vue from "vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("../pages/Home.vue"),
    meta: {
      isInitHeader: true,
    },
  },
  {
    path: "/detail",
    component: () => import("../pages/Detail.vue"),
    meta: {
      isInitHeader: false,
    },
  },
  {
    path: "/mavonEditor",
    component: () => import("../pages/MavonEditor.vue"),
    meta: {
      isInitHeader: false,
    },
  },
  {
    path: "/editorManage",
    component: () => import("../pages/EditorManage.vue"),
    redirect: "/editorManage/home",
    children: [
      {
        path: "home",
        component: () => import("../pages/ManagePage/MangementHome.vue"),
      },
      {
        path: "productionManage",
        component: () => import("../pages/ManagePage/ProductionManage.vue"),
      },
      {
        path: "commentManage",
        component: () => import("../pages/ManagePage/CommentManage.vue"),
      },
      {
        path: "checkArticle",
        component: () => import("../pages/ManagePage/CheckArticle.vue"),
      },
    ],
    meta: {
      isEditorHeader: true,
    },
  },
  {
    path: "/editorPage",
    component: () => import("../pages/EditorPage.vue"),
    meta: {
      isEditorHeader: true,
    },
  },
  {
    path: "/publishSuccess",
    name: "publishSuccess",
    component: () => import("../pages/Publish.vue"),
    meta: {
      isEditorHeader: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
