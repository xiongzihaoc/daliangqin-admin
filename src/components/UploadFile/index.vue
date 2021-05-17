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
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview">
      <i slot="default"
        class="el-icon-plus"></i>
      <div slot="tip"
        class="el-upload__tip">
      </div>
    </el-upload>
    <!-- <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="fileList[0].url" alt="" />
    </el-dialog> -->
  </div>
</template>
<script>
import { uploadImg } from "@/api/upload";
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
        endPoint: "",
        bucketName: "daliangqing-c-user",
      },
      dialogVisible: false,
    };
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
    handlePreview(file) {
      this.dialogVisible = true;
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
      return new Promise((resolve, reject) => {
        // 前后端提交post异步请求获取签名信息
        uploadImg()
          .then((res) => {
            var response = res.data;
            _self.dataObj.policy = response.policy;
            _self.dataObj.signature = response.signature;
            _self.dataObj.ossaccessKeyId = response.accessId;
            _self.dataObj.key = response.key + this.getUUID() + "${filename}";
            _self.dataObj.dir = response.key;
            _self.dataObj.endPoint = response.endPoint;
            console.log(_self.dataObj);
            resolve(true);
          })
          .catch((err) => {
            reject(false);
          });
      });
    },
    handleUploadSuccess(response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
      this.showFileList = true;
      this.fileList.pop();
      this.fileList.push({
        name: file.name,
        url:
          this.dataObj.endPoint +
          "/" +
          this.dataObj.key.replace("${filename}", file.name),
      });
      this.emitInput(this.fileList[0].url);
    },
  },
};
</script>
