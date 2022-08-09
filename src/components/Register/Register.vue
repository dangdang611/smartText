<template>
  <div>
    <div class="container">
      <div class="formbg">
        <div class="content">
          <el-form
            :model="ruleForm2"
            status-icon
            :rules="rules"
            ref="ruleFormRef"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="手机号" prop="tel">
              <el-input
                type="text"
                v-model.trim="ruleForm2.tel"
                placeholder="请输入您的手机号"
                clearableautocomplete="new-password"
              ></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="pass">
              <el-input
                type="password"
                v-model.trim="ruleForm2.pass"
                clearable
                placeholder="请输入您的密码"
                show-password
                autocomplete="new-password"
              ></el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="checkPass">
              <el-input
                type="password"
                v-model.trim="ruleForm2.checkPass"
                clearable
                placeholder="请再次输入您的密码"
                show-password
                autocomplete="new-password"
              ></el-input>
            </el-form-item>

            <el-form-item label="验证码" prop="code">
              <el-input
                type="text"
                v-model.trim="ruleForm2.code"
                placeholder="请输入验证码"
                :class="code"
                clearable
              ></el-input>
              <el-button
                @click.prevent="sendSend"
                :class="btn"
                ref="sendc"
                :disabled="!isSend"
                >{{
                  isSending ? sendCodeTime + " ’s后获取" : "点击发送验证码"
                }}</el-button
              >
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm(ruleFormRef)"
                >注册</el-button
              >
              <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </el-form-item>
            <span class="toLog" @click="toLog">已有账号</span>
          </el-form>
        </div>
        <span class="close" @click="close">
          <el-icon> <i-ep-Close /> </el-icon
        ></span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ElMessage, ElMessageBox, FormInstance } from "element-plus";
import Api from "../../Api";
// import { defineEmits } from "vue";

//  使用defineEmits创建名称，接受一个数组
let $myemit = defineEmits(["closeRegister", "openLogin"]);

const ruleFormRef = ref<FormInstance>();

var checkTel = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("手机号不能为空！"));
  } else {
    //校验手机号，号段主要有(不包括上网卡)：130~139、150~153，155~159，180~189、170~173、176~178。14号段为上网卡专属号段
    let regs =
      /^((13[0-9])|(17[0-3,6-8])|(15[^4,\\D])|(18[0-9])|(19[8-9]))\d{8}$/;
    if (value.length != 11 || !regs.test(value)) {
      return callback([new Error("手机号输入不合法！")]);
    } else {
      isSend.value = true;
      callback();
    }
  }
};

var validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (ruleForm2.checkPass !== "") {
      ruleFormRef.value?.validateField("checkPass", () => null);
    }
    callback();
  }
};
var validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== ruleForm2.pass) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};

let ruleForm2 = reactive({
  tel: "",
  pass: "",
  checkPass: "",
  code: "",
});

const rules = reactive({
  tel: [{ validator: checkTel, required: true, trigger: "blur" }],
  pass: [{ validator: validatePass, required: true, trigger: "blur" }],
  checkPass: [{ validator: validatePass2, required: true, trigger: "blur" }],
  code: [{ required: true, message: "请输入验证码！", trigger: "blur" }],
});

let code = "code";
let btn = "btn";
let sendCodeTime = ref(20);
let isSend = ref(false); //目前是否可以发送，默认不可以
let isSending = ref(false); //目前是否处于冷静状态

function toLog() {
  close();
  $myemit("openLogin");
}

function close() {
  $myemit("closeRegister");
}

function submitForm(formName: FormInstance | undefined) {
  if (!formName) return;
  formName.validate(async (valid) => {
    if (valid) {
      let user = {
        phone: ruleForm2.tel,
        password: ruleForm2.pass,
        code: ruleForm2.code,
      };
      let result = await Api.user.register({ ...user });
      console.log(result);
      if (result.code == 200) {
        ElMessage({
          message: "注册成功",
          type: "success",
        });
        // 关闭Register组件
        close();
        // 清空表单
        resetForm(formName);

        // 是否直接去登录
        ElMessageBox.confirm("现在去登录吗？", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "info",
        }).then(() => {
          toLog();
        });
      } else {
        ElMessage({
          message: result.msg,
          type: "warning",
        });
      }
    } else {
      ElMessage({
        message: "输入有误，请重新核对!",
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

async function sendSend() {
  // 发送一条验证码
  let user = {
    userCount: ruleForm2.tel,
    userPassword: ruleForm2.pass,
  };
  let result = await Api.user.getCode(user);
  console.log(result);

  ElMessage({
    type: result.code === "200" ? "success" : "warning",
    message: result.message,
  });
  if (isSend.value && !isSending.value) {
    isSend.value = false;
    isSending.value = true;

    var timer = setInterval(() => {
      if (sendCodeTime.value == 0) {
        clearInterval(timer);
        sendCodeTime.value = 20;
        isSend.value = true;
        isSending.value = false;
      } else {
        sendCodeTime.value--;
      }
    }, 1000);
  }
}
</script>

<style scoped lang="scss">
.container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 100;
}
.formbg {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  width: 550px;
  height: 350px;
  margin: 150px auto;
  /* border: 1px solid (0, 0%, 100%, 0.1); */
  border: 1px solid #53a8ff;
  border-top: 2px solid #53a8ff;
  border-radius: 15px;
  background-color: rgb(255 255 255 / 90%);
}
.content {
  width: 500px;
  height: 280px;

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
.toLog {
  position: absolute;
  right: 0;
  bottom: 0;
  font-weight: normal;
}

.toLog:hover {
  text-decoration: underline;
  color: #272626;
  cursor: pointer;
}

.code {
  width: 50%;
}
.btn {
  margin-left: 10px;
}

/* 深层穿透 */
.demo-ruleForm >>> .el-form-item__label {
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
