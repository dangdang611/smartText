import { createApp } from "vue";
import App from "./App.vue";
import router from "./routers";

//mavon-editor全局注册
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";

import Login from "./components/Login/Login.vue";
import Register from "./components/Register/Register.vue";
import api from "./Api";

const app = createApp(App);

// 注册全局组件
app.component("Login");
app.component("Register");

app.use(router);
app.use(mavonEditor);

app.config.globalProperties.router = router;
app.config.globalProperties.api = api;
app.mount("#app");
