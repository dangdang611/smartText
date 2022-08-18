<template>
  <div class="left">
    <div class="items">
      <div>
        <img :src="bgimg[0]" alt="" />
        <h4>今日新增粉丝</h4>
        <h3>
          {{ viewData.fansAddNums[viewData.fansAddNums.length - 1] }}
        </h3>
        <h6>总粉丝数：{{ viewData.fansNums }}</h6>
      </div>
      <div>
        <img :src="bgimg[1]" alt="" />
        <h4>今日新增点赞</h4>
        <h3>
          {{ viewData.likeAddNums[viewData.likeAddNums.length - 1] }}
        </h3>
        <h6>总点赞数：{{ viewData.likeNums }}</h6>
      </div>
      <div>
        <img :src="bgimg[2]" alt="" />
        <h4>今日新增浏览量</h4>
        <h3>
          {{ viewData.showAddNums[viewData.showAddNums.length - 1] }}
        </h3>
        <h6>总浏览量：{{ viewData.showNums }}</h6>
      </div>
    </div>
    <div id="myChart"></div>
  </div>
  <div class="right">
    <div class="userMessage">
      <h4>
        <el-icon>
          <i-ep-UserFilled />
        </el-icon>
        创作者信息
      </h4>
      <div class="top">
        <el-avatar size="large" :src="userInfo.userAvatar"> user </el-avatar>
        <span class="name">{{ userInfo.userName }}</span>
        <el-button type="primary" text bg @click="editInfo">编辑</el-button>
      </div>
      <el-divider content-position="left">个人成就</el-divider>
      <ul class="bottom">
        <li>
          <el-icon><i-ep-Histogram /></el-icon>创作
          <span> {{ userInfo.writeNum }}</span>
        </li>
        <li>
          <el-icon><i-ep-User /></el-icon>粉丝
          <span>{{ userInfo.fansNum }}</span>
        </li>
        <li>
          <el-icon><i-ep-View /></el-icon>展示
          <span>{{ userInfo.showNum }}</span>
        </li>
      </ul>
    </div>
    <div class="otherMessage">
      <h4>
        <el-icon>
          <i-ep-Comment />
        </el-icon>
        平台公告
      </h4>
      <ul>
        <li>重要提醒！！！平台审核力度加强，请注意！<span>2022-04-05</span></li>
        <li>重要提醒！！！平台审核力度加强，请注意！<span>2022-04-05</span></li>
        <li>重要提醒！！！平台审核力度加强，请注意！<span>2022-04-05</span></li>
        <li>重要提醒！！！平台审核力度加强，请注意！<span>2022-04-05</span></li>
        <li>
          重要提醒！！！平台审核力度加强，请注意！ <span>2022-04-05</span>
        </li>
      </ul>
    </div>
  </div>

  <el-dialog v-model="dialogVisible" title="Tips" width="30%" draggable>
    <div class="edit">
      <el-upload
        class="avatar-uploader"
        :http-request="uploadFile"
        :on-remove="handleRemove"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><i-ep-Plus /></el-icon>
      </el-upload>
      <el-input
        v-model="userName"
        placeholder="昵称"
        maxlength="10"
        show-word-limit
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editSubmit">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {
  ElMessage,
  ElMessageBox,
  UploadProps,
  UploadUserFile,
} from "element-plus";
import * as echarts from "echarts";
import Api from "../../Api";
import emitter from "../../utils/mitt";
import { WeeksDate } from "../../utils/WeeksDate";

let userInfo = reactive({
  userAvatar: "",
  userName: "",
  userId: "",
  userCount: "",
  writeNum: "",
  fansNum: "",
  showNum: "",
});
let bgimg = [
  "https://mapapi.qq.com/web/lbs/console/v/images/todo_order.f979f04.png",
  "	https://mapapi.qq.com/web/lbs/console/v/images/todo_ticket.fee2f74.png",
  "https://mapapi.qq.com/web/lbs/console/v/images/todo_monitor.dd6ad34.png",
];
let userName = ref("");
const imageUrl = ref("");
let dialogVisible = ref(false);

let viewData = reactive({
  showAddNums: [12, 19, 21, 1, 3, 23, 12],
  showNums: 100,
  fansAddNums: [1, 2, 3, 5, 2, 3, 4],
  fansNums: 4,
  likeAddNums: [1, 2, 3, 1, 2, 1, 5],
  likeNums: 10,
});

let sourceData = ref([
  {
    product: "3/29",
    新增粉丝: 83.1,
    新增点赞: 73.4,
    新增浏览量: 55.1,
  },
  {
    product: "3/30",
    新增粉丝: 86.4,
    新增点赞: 65.2,
    新增浏览量: 82.5,
  },
  {
    product: "3/31",
    新增粉丝: 72.4,
    新增点赞: 53.9,
    新增浏览量: 39.1,
  },
  {
    product: "4/1",
    新增粉丝: 71.4,
    新增点赞: 56,
    新增浏览量: 30,
  },
  {
    product: "4/2",
    新增粉丝: 22.4,
    新增点赞: 51.9,
    新增浏览量: 49.1,
  },
  {
    product: "4/3",
    新增粉丝: 45.4,
    新增点赞: 51.9,
    新增浏览量: 49.1,
  },
  {
    product: "4/4",
    新增粉丝: 43.3,
    新增点赞: 85.8,
    新增浏览量: 93.7,
  },
]);

function drawLine() {
  let option = {
    title: {
      text: "近七天数据趋势图",
      textStyle: {
        color: "#409EFF",
        fontWeight: "normal",
      },
      bottom: 0,
      left: "42%",
    },
    // 调色盘。
    color: ["#5daaff", "#a18aff", "#ff937f"],

    legend: {},
    tooltip: {},
    dataset: {
      // 用 dimensions 指定了维度的顺序。直角坐标系中，如果 X 轴 type 为 category，
      // 默认把第一个维度映射到 X 轴上，后面维度映射到 Y 轴上。
      // 如果不指定 dimensions，也可以通过指定 series.encode
      // 完成映射
      dimensions: ["product", "新增粉丝", "新增点赞", "新增浏览量"],
      source: sourceData.value,
    },
    xAxis: {
      type: "category",
      name: "日期",
      axisLine: {
        symbol: ["none", "arrow"],
        lineStyle: {
          type: "solid",
          color: "#666",
        },
      },
    },
    yAxis: {
      name: "数量",
      axisLine: {
        symbol: ["none", "arrow"],
        lineStyle: {
          type: "solid",
          color: "#666",
        },
      },
    },
    series: [
      {
        type: "line",
        label: {
          show: false,
          position: "bottom",
          textStyle: {
            fontSize: 16,
          },
        },
        emphasis: {
          label: {
            show: true,
          },
        },
      },
      {
        type: "line",
        label: {
          show: false,
          position: "bottom",
          textStyle: {
            fontSize: 16,
          },
        },
        emphasis: {
          label: {
            show: true,
          },
        },
      },
      {
        type: "line",
        label: {
          show: false,
          position: "bottom",
          textStyle: {
            fontSize: 16,
          },
        },
        emphasis: {
          label: {
            show: true,
          },
        },
      },
    ],
  };

  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById("myChart")!);
  // 绘制图表
  myChart.setOption(option);
}
const getUserData = async () => {
  //取出用户有关数据
  let data = JSON.parse(localStorage.getItem("user_info") || "{}");
  ({
    userAvatar: userInfo.userAvatar,
    userName: userInfo.userName,
    userId: userInfo.userId,
    userCount: userInfo.userCount,
  } = data);

  userName.value = data.userName;
  imageUrl.value = data.userAvatar;

  //获取用户相关的统计数据
  let result = await Api.user.getUserCount(userInfo.userId);
  console.log(result);
  if (result.code === 200) {
    ({
      fansNum: userInfo.fansNum,
      writeNum: userInfo.writeNum,
      showNum: userInfo.showNum,
    } = result.data);
  } else {
    ElMessage({
      message: result.message,
      type: "warning",
    });
  }
};

const getDrawData = async () => {
  const result = await Api.user.getUserWeekData(userInfo.userId);
  if (result.code === 200) {
    // 获取并更新七天的数据
    for (const key in result.data) {
      ({
        showAddNums: viewData.showAddNums,
        showNums: viewData.showNums,
        fansAddNums: viewData.fansAddNums,
        fansNums: viewData.fansNums,
        likeAddNums: viewData.likeAddNums,
        likeNums: viewData.likeNums,
      } = result.data);
    }

    // 处理数据格式
    for (let i = 0; i < 7; i++) {
      sourceData.value[i] = {
        product: new WeeksDate()
          .getPreDays(7 - i)
          .toString()
          .slice(6, 10),
        新增粉丝: viewData.fansAddNums[i],
        新增点赞: viewData.likeAddNums[i],
        新增浏览量: viewData.showAddNums[i],
      };
    }
  } else {
    ElMessage({
      type: "warning",
      message: "连接服务器失败",
    });
  }
  drawLine();
};

const editInfo = () => {
  dialogVisible.value = true;
};

const editSubmit = async () => {
  if (userName.value.length < 1 || userName.value.length > 10) {
    ElMessage({
      type: "error",
      message: "昵称不能为空",
    });
    return;
  }
  dialogVisible.value = false;

  let user = {
    userName: userName.value,
    userAvatar: imageUrl.value,
  };
  let result = await Api.user.updated(user);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "修改成功",
    });
    // 刷新数据
    let userData = JSON.parse(localStorage.getItem("user_info") || "{}");
    userData = { ...userData, ...user };
    localStorage.setItem("user_info", JSON.stringify(userData));
    emitter.emit("refreshHeader");
    getUserData();
  } else {
    ElMessage({
      type: "error",
      message: "修改失败，请重试",
    });
  }
};
const uploadFile = async (params: { file: any }) => {
  const _file = params.file;
  const isLt2M = _file.size / 1024 / 1024 < 2;

  // 通过 FormData 对象上传文件
  var formData = new FormData();
  formData.append("pic", _file);

  if (!isLt2M) {
    ElMessage({
      message: "请上传2M以下的图片",
      type: "warning",
    });
    return false;
  }

  // 发起请求
  let result = await Api.resource.uploadPic(formData);
  if (result.status == 200) {
    // 将后端返回的url保存
    imageUrl.value = result.data;
  } else {
    ElMessage({
      message: "上传失败",
      type: "warning",
    });
  }
};

const handleRemove = () => {
  imageUrl.value = "";
};

onMounted(async () => {
  getUserData();
  getDrawData();
});
</script>

<style lang="scss" scoped>
.left {
  padding: 20px 30px;
  padding-left: 0;
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;

  .items {
    display: flex;
    justify-content: space-around;

    div {
      position: relative;
      flex: 1;
      height: 120px;
      padding: 20px;
      margin-left: 20px;
      border-radius: 15px;
      color: #ffff;

      h3 {
        margin: 10px 0;
      }

      img {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 37%;
        max-width: 140px;
      }
    }

    div:nth-child(1) {
      box-shadow: 0 12px 24px 0 rgb(112 183 255 / 50%);
      background-image: linear-gradient(294deg, #5daaff, #3293ff);
    }

    div:nth-child(2) {
      box-shadow: 0 12px 24px 0 rgb(154 139 255 / 50%);
      background-image: linear-gradient(294deg, #a18aff, #a864ff);
    }
    div:nth-child(3) {
      box-shadow: 0 12px 24px 0 rgb(255 152 132 / 50%);
      background-image: linear-gradient(293deg, #ff937f, #ff5957);
    }
  }
  #myChart {
    flex: 1;
    margin-top: 20px;
    width: 100%;

    :deep(div > canvas) {
      top: 20px !important;
    }
  }
}

.right {
  width: 22%;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  background-color: #f5f6f7 !important;

  > div {
    padding: 20px;
    background-color: #fff;
  }

  .userMessage,
  .otherMessage {
    h4 {
      padding-bottom: 10px;
      border-bottom: 1px solid #409eff;
      i {
        color: #3293ff;
      }
    }
  }
  .userMessage {
    height: 40%;
    margin-bottom: 15px;

    .top {
      display: flex;
      margin: 10px 0px;
      align-items: center;

      .name {
        margin-left: 10px;
        margin-right: 15px;
        font-size: 16px;
        font-weight: 700;
      }
    }
    .bottom {
      font-size: 16px;
      i {
        color: #3293ff;
        margin-right: 10px;
      }
      li {
        padding: 3px 0;

        > span {
          color: #5daaff;
          font-size: 17px;
          font-weight: 700;
        }
      }

      li:nth-child(1) {
        padding: 0;
      }
    }
  }

  .otherMessage {
    flex: 1;
    ul li {
      font-size: 14px;
      padding: 8px 0;

      span {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}

.edit {
  overflow: hidden;

  :deep(.avatar-uploader) {
    margin-bottom: 10px;
    text-align: center;
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }

  :deep(.avatar-uploader .el-upload) {
    border: 1px dashed #bbb;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  :deep(.avatar-uploader .el-upload:hover) {
    border-color: #409eff !important;
  }

  :deep(.el-upload-list) {
    display: none;
  }
  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
}
</style>
