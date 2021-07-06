<template>
  <div>
    <el-upload action="https://cdn.daliangqing.com"
      :data="dataObj"
      :multiple="false"
      :before-upload="beforeUpload"
      :show-file-list="false"
      :on-remove="handleRemove"
      :on-progress="handleUploadProgress"
      :on-success="handleUploadSuccess">
      <img v-if="imageUrl"
        :src="imageUrl"
        class="avatar">
      <i v-else
        style="border:1px dashed #ccc;border-radius:10px;"
        class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>
<script>
import { httpAdminUploadApi } from "@/api/admin/httpAdminUploadApi";
export default {
  name: "SingleUpload",
  props: {
    value: String,
    uploadType: String,
  },
  data() {
    return {
      dataObj: {
        policy: "",
        signature: "",
        key: "",
        ossaccessKeyId: "",
        host: "",
      },
      infoList: [],
    };
  },
  mounted() {
    httpAdminUploadApi
      .postAliyunSignAdmin({ adminUpload: this.uploadType })
      .then((res) => {
        this.infoList = res.data;
      });
  },
  computed: {
    imageUrl() {
      return this.value;
    },
    imageName() {
      if (this.value != null && this.value !== "") {
        return this.value.substr(this.value.lastIndexOf("/") + 1);
      } else {
        return null;
      }
    },
  },
  methods: {
    handleRemove(file, fileList) {
      //   this.emitInput("");
    },
    getUUID() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        return (
          c === "x" ? (Math.random() * 16) | 0 : "r&0x3" | "0x8"
        ).toString(16);
      });
    },
    beforeUpload(file) {
      const _self = this;
      _self.dataObj.policy = this.infoList.policy;
      _self.dataObj.signature = this.infoList.signature;
      _self.dataObj.ossaccessKeyId = this.infoList.accessId;
      _self.dataObj.key = this.infoList.key + file.name;
      _self.dataObj.host = this.infoList.endPoint;
    },
    handleUploadProgress(event,file,fileList) {
      this.$emit("uploadProgress", event.percent);
    },
    handleUploadSuccess(response, file, fileList) {
      let value = "https://cdn.daliangqing.com/" + this.dataObj.key;
      this.$emit("uploadFinish", value);
    },
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 64px;
  height: 64px;
  line-height: 64px;
  text-align: center;
}
.avatar {
  width: 64px;
  height: 64px;
  display: block;
}
</style>
