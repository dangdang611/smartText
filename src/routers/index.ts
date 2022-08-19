import { ElMessage } from "element-plus";
import Cookies from "js-cookie";
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

router.beforeEach(async (to, from) => {
  const isAuthenticated = Cookies.get("smartToken") ? true : false;
  const path = to.path.toString();
  if (
    !isAuthenticated &&
    (path.includes("editorManage") || path == "/editorPage")
  ) {
    ElMessage({
      type: "warning",
      message: "你还未登录",
    });
    return false;
  }
});
export default router;
