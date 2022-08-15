<template>
  <div class="publishContainer">
    <div class="publishContent">
      <div class="head">
        <h3>发布文章</h3>
        <el-icon style="vertical-align: middle" class="close" @click="close">
          <i-ep-close />
        </el-icon>
      </div>
      <div class="content">
        <el-form
          :model="form"
          label-width="100px"
          ref="ruleFormRef"
          :rules="rules"
        >
          <el-form-item label="编辑标题" prop="title">
            <el-input
              v-model="form.title"
              placeholder="请编辑您的标题"
              required
            />
            <el-button type="primary" plain @click="isSmartTitle = true"
              >生成标题</el-button
            ></el-form-item
          >
          <el-form-item label="分类">
            <el-radio-group v-model="tag1" size="large">
              <el-radio label="社会" border>社会</el-radio>
              <el-radio label="娱乐" border>娱乐</el-radio>
              <el-radio label="体育" border>体育</el-radio>
              <el-radio label="经济" border>经济</el-radio>
              <el-radio label="教育" border>教育</el-radio>
              <el-radio label="文学" border>文学</el-radio>
              <el-radio label="育儿" border>育儿</el-radio>
              <el-radio label="其他" border>其他</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="添加标签" prop="tag">
            <el-select v-model="form.tag" placeholder="添加您的标签">
              <el-option label="科技" value="科技" />
              <el-option label="时尚" value="时尚" />
              <el-option label="美食" value="美食" />
              <el-option label="国际" value="国际" />
              <el-option label="军事" value="军事" />
              <el-option label="游戏" value="游戏" />
              <el-option label="旅游" value="旅游" />
              <el-option label="历史" value="历史" />
            </el-select>
          </el-form-item>
          <el-form-item label="文章封面" prop="coverPic">
            <el-upload
              action="#"
              list-type="picture-card"
              :auto-upload="true"
              :limit="1"
              :http-request="uploadFile"
              :file-list="fileList"
              ref="upload"
            >
              <el-icon><i-ep-Plus /></el-icon>
              <template #file="{ file }">
                <div>
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    alt=""
                  />
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <el-icon><zoom-in /></el-icon>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(file)"
                    >
                      <el-icon><Download /></el-icon>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <el-icon><Delete /></el-icon>
                    </span>
                  </span>
                </div>
              </template>
            </el-upload>

            <el-dialog v-model="dialogVisible">
              <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
          </el-form-item>
          <el-form-item label="收录专栏">
            <el-select v-model="form.specialColumn" placeholder="选择专栏">
              <el-option label="科技" value="科技" />
              <el-option label="时尚" value="时尚" />
              <el-option label="美食" value="美食" />
              <el-option label="国际" value="国际" />
              <el-option label="军事" value="军事" />
              <el-option label="游戏" value="游戏" />
              <el-option label="旅游" value="旅游" />
              <el-option label="历史" value="历史" />
            </el-select>
          </el-form-item>
          <el-form-item label="编辑摘要" prop="digest">
            <el-input
              v-model="form.digest"
              :rows="4"
              type="textarea"
              placeholder="请输入您的摘要"
              clearable
              maxlength="100"
              show-word-limit
            />
          </el-form-item>
        </el-form>
        <div class="buttons">
          <el-button type="primary" plain @click="isSmartDigest = true"
            >生成摘要</el-button
          >
          <el-button type="primary" plain @click="resetForm(ruleFormRef)"
            >取消</el-button
          >
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >确认发布</el-button
          >
        </div>
      </div>
    </div>

    <transition name="fade">
      <SmartTitle
        v-show="isSmartTitle"
        @close="closeSmartTitle"
        @sendTitle="receiveTitle"
        :data="props.data.mdContent"
      />
    </transition>

    <transition name="fade">
      <SmartDigest
        v-show="isSmartDigest"
        @close="closeSmartDigest"
        @sendDigest="receiveDigest"
        :data="props.data.mdContent"
      />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { Delete, Download, ZoomIn } from "@element-plus/icons-vue";
import { FormInstance, FormRules, UploadFile, ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import Api from "../../Api";

const router = useRouter();
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);
const ruleFormRef = ref<FormInstance>();

const $myemit = defineEmits(["close"]);
const props = defineProps(["data"]);

let isSmartTitle = ref(false);
let isSmartDigest = ref(false);

const fileList = ref([]);
let tag1 = ref("");

let form = reactive({
  title: "",
  tag: [""],
  coverPic: "",
  specialColumn: "",
  digest: "",
  content: "",
  mdContent: "",
  time: "",
  authorId: "",
  authorName: "",
});

const rules = reactive<FormRules>({
  title: { required: true, message: "标题不能为空", trigger: "blur" },
  coverPic: { required: true, message: "请上传一张封面", trigger: "blur" },
  digest: { required: true, message: "摘要不能为空", trigger: "blur" },
  tag: { required: true, message: "请选择一个标签", trigger: "blur" },
});

watch(props.data, () => {
  ({
    title: form.title,
    content: form.content,
    mdContent: form.mdContent,
  } = props.data);
});

function close() {
  $myemit("close");
}
function closeSmartTitle() {
  isSmartTitle.value = false;
}

function closeSmartDigest() {
  isSmartDigest.value = false;
}

function receiveTitle(title: string) {
  form.title = title;
}

function receiveDigest(digest: string) {
  form.digest = digest;
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  close();
};

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  if (form.content == "") {
    ElMessage({
      message: "内容不能为空！",
      type: "error",
    });
    return;
  }
  formEl.validate(async (valid) => {
    if (valid) {
      // 处理数据
      if (tag1.value) form.tag = [form.tag as unknown as string, tag1.value];
      let user = JSON.parse(localStorage.getItem("user_info") || "{}");
      form.authorId = user.userId;
      form.authorName = user.userName;

      const result = await Api.checking_article.publishArticle(form);
      const articleId = result.data.id;

      if (result.code === 200) {
        close();
        resetForm(formEl);
        router.replace({
          name: "publishSuccess",
          params: { articleId },
        });
      } else {
        ElMessage({
          message: "发表失败，请重新检查内容",
          type: "warning",
        });
      }
    } else {
      return false;
    }
  });
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
    form.coverPic = result.data;
  } else {
    ElMessage({
      message: "上传失败",
      type: "warning",
    });
  }
};

const handleRemove = (file: UploadFile) => {
  const newFileList = fileList.value.filter((f: UploadFile) => {
    if (f.name !== file.name) return f;
  });
  fileList.value = newFileList;
};

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
};

const handleDownload = (file: UploadFile) => {
  console.log(file);
};
</script>

<style lang="scss" scoped>
.publishContainer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.05);
  z-index: 1998;

  .publishContent {
    position: absolute;
    top: 70px;
    right: 0;
    width: 32%;
    height: 100%;
    z-index: 2005;
    background: #fff;
    border-radius: 5px;

    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      border-top: 2px solid #409eff;
      border-bottom: 1px solid #eee;

      i {
        cursor: pointer;
      }
    }

    .content {
      padding: 8px 0;
      padding-right: 20px;

      :deep(.el-radio) {
        margin: 0 5px 8px 0;
      }

      :deep(.el-input) {
        width: 76%;
      }

      :deep(.el-radio__inner) {
        display: none;
      }
    }
  }

  .buttons {
    float: right;
  }
  .view {
    margin: 20px 100px;
    border: 1px solid #eee;
    border-radius: 5px;
    overflow: hidden;

    .itemMessage {
      position: relative;
      padding: 20px 60px 20px 30px;
      h3 {
        color: #409eff;
        margin-bottom: 20px;
      }

      .itemWeight {
        position: relative;

        .other {
          display: flex;
          position: absolute;
          top: 0px;
          right: 250px;

          .input {
            width: 50%;
          }

          span {
            position: relative;
            left: 10px;
            width: 3%;
          }
        }
      }
    }

    .sendPerson,
    .receivePerson {
      position: relative;
      padding: 20px 60px 20px 30px;
      h3 {
        color: #409eff;
        margin-bottom: 20px;
      }

      .tools {
        position: absolute;
        top: 20px;
        right: 80px;
        font-size: 12px;
        color: #409eff;

        span {
          cursor: pointer;
        }

        span:nth-of-type(1) {
          margin-right: 20px;
        }
        span::before {
          font-size: 20px;
        }
      }

      ul {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li {
          width: 40%;
        }
      }
    }

    .placeOrder {
      margin: 10px 0;
      display: flex;
      flex-direction: column;
      align-items: center;

      .agreement {
        margin-bottom: 10px;
      }
      .agreement :deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
        color: #bbbb;
      }

      a {
        color: #409eff;
      }
    }
  }
}
</style>
