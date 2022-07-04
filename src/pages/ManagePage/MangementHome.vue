<template>
  <div class="left">
    <div class="items">
      <div>
        <img
          src="https://mapapi.qq.com/web/lbs/console/v/images/todo_order.f979f04.png"
          alt=""
        />
        <h4>今日新增粉丝</h4>
        <h3>
          {{ viewData.fansAddNums[viewData.fansAddNums.length - 1] }}
        </h3>
        <h6>总粉丝数：{{ viewData.fansNums }}</h6>
      </div>
      <div>
        <img
          src="	https://mapapi.qq.com/web/lbs/console/v/images/todo_ticket.fee2f74.png"
          alt=""
        />
        <h4>今日新增点赞</h4>
        <h3>
          {{ viewData.likeAddNums[viewData.likeAddNums.length - 1] }}
        </h3>
        <h6>总点赞数：{{ viewData.likeNums }}</h6>
      </div>
      <div>
        <img
          src="https://mapapi.qq.com/web/lbs/console/v/images/todo_monitor.dd6ad34.png"
          alt=""
        />
        <h4>今日创作文章数</h4>
        <h3>
          {{ viewData.articleAddNums[viewData.articleAddNums.length - 1] }}
        </h3>
        <h6>总文章数：{{ viewData.articleNums }}</h6>
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
      <ul>
        <li>开发者：<span>用户18613932106</span></li>
        <li>开发等级：<span>LV1</span></li>
        <li>发布文章总数：<span>113</span></li>
        <li>被收藏总数：<span>43</span></li>
        <li>被评论总数：<span>110</span></li>
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
</template>

<script lang="ts" setup>
import { log } from "console";
import * as echarts from "echarts";
import Api from "../../Api";
let viewData = reactive({
  articleAddNums: [12, 19, 21, 1, 3, 23, 12],
  articleNums: 100,
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
    新增文章: 55.1,
  },
  {
    product: "3/30",
    新增粉丝: 86.4,
    新增点赞: 65.2,
    新增文章: 82.5,
  },
  {
    product: "3/31",
    新增粉丝: 72.4,
    新增点赞: 53.9,
    新增文章: 39.1,
  },
  {
    product: "4/1",
    新增粉丝: 71.4,
    新增点赞: 56,
    新增文章: 30,
  },
  {
    product: "4/2",
    新增粉丝: 22.4,
    新增点赞: 51.9,
    新增文章: 49.1,
  },
  {
    product: "4/3",
    新增粉丝: 45.4,
    新增点赞: 51.9,
    新增文章: 49.1,
  },
  {
    product: "4/4",
    新增粉丝: 43.3,
    新增点赞: 85.8,
    新增文章: 93.7,
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
      dimensions: ["product", "新增粉丝", "新增点赞", "新增文章"],
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

onMounted(async () => {
  const result = await Api.manage.getHomeData(localStorage.getItem("count")!);
  if (result.code === "200") {
    // 获取并更新七天的数据
    for (const key in result.data) {
      viewData[key] = result.data[key];
    }

    // 处理数据格式
    for (let i = 0; i < 7; i++) {
      sourceData.value[i] = {
        product: "6/" + (1 + i),
        新增粉丝: viewData.fansAddNums[i],
        新增点赞: viewData.likeAddNums[i],
        新增文章: viewData.articleAddNums[i],
      };
    }
  } else {
    ElMessage({
      type: "warning",
      message: "连接服务器失败",
    });
  }

  drawLine();
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
  background-color: whitesmoke !important;

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

    ul li {
      padding: 8px 0;
    }
  }
  .userMessage {
    height: 40%;
    margin-bottom: 15px;
  }

  .otherMessage {
    flex: 1;
    ul li {
      font-size: 14px;

      span {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
