<template>
  <div>
    <div class="contanier">
      <div class="formbg">
        <div class="content">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleFormRef"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="账号" prop="count">
              <el-input
                type="text"
                v-model.trim="ruleForm.count"
                placeholder="请输入您的账号（六位数）"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input
                type="password"
                v-model.trim="ruleForm.pass"
                placeholder="请输入您的密码（六位数）"
                clearable
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm(ruleFormRef)"
                >登录</el-button
              >
              <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </el-form-item>
            <span class="toGis" @click="toGis">去注册</span>
          </el-form>
        </div>
        <el-icon class="close" @click="close">
          <i-ep-Close />
        </el-icon>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ElMessage, FormInstance } from "element-plus";
import Api from "../../Api";
import Cookies from "js-cookie";
import emitter from "../../utils/mitt";
import { use } from "echarts";

// import { defineEmits } from "vue";
//  使用defineEmits创建名称，接受一个数组
let $myemit = defineEmits(["closeLogin", "openRegister"]);

const ruleFormRef = ref<FormInstance>();

let ruleForm = reactive({
  count: "",
  pass: "",
});

const rules = reactive({
  count: [
    { required: true, message: "账号不能为空！", trigger: "blur" },
    { min: 11, max: 11, message: "账号输入有误！", trigger: "blur" },
  ],
  pass: [{ required: true, message: "请输入密码！", trigger: "blur" }],
});

function close() {
  $myemit("closeLogin");
}

function toGis() {
  close();
  $myemit("openRegister");
}

function submitForm(formName: FormInstance | undefined) {
  if (!formName) return;
  formName.validate(async (valid) => {
    if (valid) {
      // 处理登录业务
      let user = {
        userCount: ruleForm.count,
        userPassword: ruleForm.pass,
      };

      let result = await Api.user.login(user);

      if (result.code == 200) {
        ElMessage({
          message: "登录成功",
          type: "success",
        });

        // 保存用户信息
        let user_info = {
          userId: result.data.userId,
          userCount: result.data.userCount,
          userAvatar: result.data.userAvatar,
          userName: result.data.userName,
        };

        localStorage.setItem("user_info", JSON.stringify(user_info));

        // 创建一个有效时间为1天的cookie来存储token
        Cookies.set("smartToken", result.data.accessToken, { expires: 1 });

        // 刷新Header
        emitter.emit("refreshHeader", "./images/logo2.png");

        // 关闭Login组件
        close();
        // 清空表单
        resetForm(formName);
      } else {
        ElMessage({
          message: result.msg,
          type: "warning",
        });
      }
    } else {
      ElMessage({
        message: "请正确输入账号密码!",
        type: "warning",
      });
      return false;
    }
  });
}

function resetForm(formName: FormInstance | undefined) {
  if (!formName) return;
  formName.resetFields();
}
</script>

<style scoped lang="scss">
.contanier {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 2000;
}
.formbg {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  width: 550px;
  height: 260px;
  margin: 200px auto;
  /* border: 1px solid (0, 0%, 100%, 0.1); */
  border: 1px solid #53a8ff;
  border-top: 2px solid #53a8ff;
  border-radius: 15px;
  background-color: rgb(255 255 255 / 90%);
}
.content {
  width: 500px;
  height: 160px;

  :deep(.el-input__wrapper) {
    padding: 6px 10px;
  }
}

.close {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #66666629;
  text-align: center;
  line-height: 20px;
  position: absolute;
  top: 5px;
  right: 6px;
  cursor: pointer;
}

.el-form {
  position: relative;
}

.toGis {
  position: absolute;
  right: 0;
  bottom: 0;
}

.toGis:hover {
  text-decoration: underline;
  color: #272626;
  cursor: pointer;
}
/* 深层穿透 */
.demo-ruleForm :deep(.el-form-item__label) {
  color: #131313;
  font-weight: 700;
}
</style>

<style>
/* 修改全局样式
.el-form-item__label {
  color: #131313;
  font-weight: 700;
} */
</style>
