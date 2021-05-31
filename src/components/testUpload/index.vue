<template>
  <div>
    <el-upload action="http://daliangqing-c-user.oss-cn-hangzhou.aliyuncs.com"
      :data="dataObj"
      list-type="picture"
      :multiple="false"
      :show-file-list="showFileList"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess">
      <img v-if="imageccc"
        :src="imageccc"
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
  },
  data() {
    return {
      dataObj: {
        policy: "",
        signature: "",
        key: "",
        ossaccessKeyId: "",
        dir: "",
        host: "",
      },
      imageccc: "",
      infoList: [],
    };
  },
  created() {
    httpAdminUploadApi
      .postAliyunSignAdmin({ adminUpload: "BANNER" })
      .then((res) => {
        console.log(res.data);
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
    fileList() {
      return [
        {
          name: this.imageName,
          url: this.imageUrl,
        },
      ];
    },
    showFileList: {
      get: function () {
        return (
          this.value !== null && this.value !== "" && this.value !== undefined
        );
      },
      set: function (newValue) {},
    },
  },
  methods: {
    emitInput(val) {
      this.$emit("input", val);
    },
    handleRemove(file, fileList) {
      this.emitInput("");
    },
    getUUID() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        return (c === "x"
          ? (Math.random() * 16) | 0
          : "r&0x3" | "0x8"
        ).toString(16);
      });
    },
    beforeUpload(file) {
      const _self = this;
      _self.dataObj.policy = this.infoList.policy;
      _self.dataObj.signature = this.infoList.signature;
      _self.dataObj.ossaccessKeyId = this.infoList.accessId;
      _self.dataObj.key = this.infoList.key + this.getUUID();
      // _self.dataObj.dir = this.infoList.key;
      _self.dataObj.host = this.infoList.endPoint;
      console.log(_self.dataObj.host);
    },
    handleUploadSuccess(response, file, fileList) {
      console.log("上传成功...");
      console.log(file);
      this.imageccc =
        "http://daliangqing-c-user.oss-cn-hangzhou.aliyuncs.com/" +
        this.dataObj.key;
      console.log(this.imageccc);
      this.showFileList = true;
      this.fileList.pop();
      this.fileList.push({
        name: file.name,
        url: file.url,
      });
      this.emitInput(this.imageccc);
    },
  },
};
</script>
<style scoped>
.avatar {
  width: 100px;
  height: 100px;
}
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
