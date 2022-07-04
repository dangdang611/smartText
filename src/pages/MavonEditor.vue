<template>
  <div>
    <mavon-editor v-model="value" @save="save" @imgAdd="addImg" />
  </div>
</template>

<script lang="ts">
import axios from "axios";
export default {
  setup() {
    function save(value: string, render: string) {
      console.log(value);
      console.log(render);
    }

    function addImg(pos: string, file: string) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("image", file);
      axios({
        url: "server url",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((url) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        $vm.$img2Url(pos, url);
      });
    }

    return {
      save,
      addImg,
    };
  },
};
</script>

<style lang="scss" scoped></style>
