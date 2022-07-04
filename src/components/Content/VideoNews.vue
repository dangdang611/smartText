<template>
  <div class="videoContainer">
    <div class="stage">
      <video
        muted
        class="video"
        :src="message.videoPath"
        type="video/mp4"
        poster="images/false.png"
        autoplay
        loop
      >
        <p>你的浏览器不支持video标签.</p>
      </video>
    </div>
    <div class="message">
      <h3>{{ message.title }}</h3>
      <span>{{ message.author }}</span>
      <span>{{ message.commentNum }} 评论</span>
      <span>{{ message.time }}</span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ["message"],
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.videoContainer {
  display: flex;
  margin-bottom: 20px;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    color: #409eff;
  }

  .stage {
    width: 50%;
    height: 122px;
    video {
      width: 100%;
    }
  }
  .message {
    flex: 1;

    h3 {
      margin-left: 20px;
      margin-bottom: 55px;
      font-weight: normal;
    }

    span {
      margin-left: 20px;
      font-size: 14px;
      line-height: 20px;
      color: #999;
    }
  }
}
</style>
