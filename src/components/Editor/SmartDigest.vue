<template>
  <div class="container">
    <div class="header">
      <h3>智能摘要生成</h3>
      <span @click="close">
        <el-icon>
          <i-ep-close></i-ep-close>
        </el-icon>
      </span>
    </div>

    <div class="content">
      <h4>请选择您的要求，我们将智能为您生成摘要</h4>
      <el-form-item label="字数限制：">
        <el-radio-group v-model="limitNum" size="large">
          <!-- <el-radio label="1" border>0-5字</el-radio> -->
          <el-radio label="2" border>5-10字</el-radio>
          <el-radio label="3" border>11-15字</el-radio>
          <el-radio label="4" border>16-20字</el-radio>
          <el-radio label="4" border>21-30字</el-radio>
          <el-radio label="5" border>不限</el-radio>
        </el-radio-group>

        <el-button type="primary" @click="createDigest">生成</el-button>
      </el-form-item>

      <el-form-item label="智能摘要：">
        <el-input
          v-model="smartDigest"
          :rows="6"
          type="textarea"
          placeholder="请输入您的摘要"
          clearable
          maxlength="100"
          show-word-limit
        />
        <div class="btn">
          <el-button type="primary" plain @click="createDigest"
            >换一换</el-button
          >
          <el-button type="primary" @click="onSubmit">确认</el-button>
        </div>
      </el-form-item>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { keys, values } from "lodash";
import Api from "../../Api";

let $myemit = defineEmits(["close", "sendDigest"]);
let props = defineProps(["data"]);

const limitNum = ref("1");

let smartDigest = ref("");
let wordsArray = [{ 5: 10 }, { 11: 15 }, { 16: 20 }, { 21: 30 }, { 0: 0 }];

function close() {
  $myemit("close");
}

async function createDigest() {
  let min = Number(keys(wordsArray[Number(limitNum.value)])[0]);
  let max = Number(values(wordsArray[Number(limitNum.value)])[0]);

  const result = await Api.ai.getSmartTitle(props.data, min, max);

  if (result.code === "200") {
    smartDigest.value = result.data.digests;
  } else {
    ElMessage({
      message: result.message,
      type: "warning",
    });
  }
}

function onSubmit() {
  close();
  $myemit("sendDigest", smartDigest.value);
}

onMounted(() => {
  createDigest();
});
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  top: 50%;
  right: 55%;
  transform: translate(50%, -50%);
  width: 650px;
  height: auto;
  border-top: 2px solid #409eff;
  background-color: #fff;
  z-index: 2007;

  .header {
    padding: 10px 10px 10px 20px;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #ddd;

    h3 {
      font-weight: normal;
    }

    span {
      font-size: 20px;
      cursor: pointer;
    }
  }
  .content {
    padding: 10px 20px;
    overflow: hidden;

    h4 {
      font-weight: normal;
      margin-bottom: 10px;
    }
    :deep(.el-radio) {
      margin-right: 5px;
      margin-bottom: 8px;
    }

    :deep(.el-radio__inner) {
      display: none;
    }

    .btn {
      text-align: right;
      :deep(.el-button) {
        margin-top: 10px;
        padding: 6px 15px;
      }
    }
  }
}
</style>
