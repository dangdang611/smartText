<template>
  <!-- 插槽模板 -->
  <div class="productionManage">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
    <div class="tools">
      <PageDevice :count="props.count"></PageDevice>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(["count"]);
</script>

<style lang="scss" scoped>
.productionManage {
  position: relative;
  background: #fff;
  width: 100%;
  .title {
    margin-left: 15px;

    :deep(.el-menu-item) {
      font-size: 16px;
    }
  }
  .tools {
    position: absolute;
    right: 50%;
    bottom: 10px;
    transform: translateX(50%);
  }
}
</style>
