<template>
  <div style="padding: 24px">
    <el-upload
      action="string"
      ref="upload"
      :show-file-list="false"
      :file-list="fileList"
      list-type="picture-card"
      :before-upload="uploadBefore"
      :http-request="httpRequest"
    >
      <i class="el-icon-upload"></i>
    </el-upload>
  </div>
</template>
<script>
import request from '@/utils/request'
import { uploadImg, succ } from "@/api/upload";
// import { logger } from 'node_modules/runjs/lib/common';
export default {
  name: "picUpload",
  data() {
    return {
      fileList: [],
      ossObj: {},
      addressOos: "",
    };
  },
  mounted() {},
  methods: {
    httpRequest(file) {
      // 获取签名
      
      uploadImg().then((res) => {
        var data = res.data;
  
        var ossData = new FormData();
        console.log(data.dir);
        ossData.append("name", file.file.name);
        //key就代表文件层级和阿里云上的文件名
        let filename = file.file.name;
        let picName = this.random_string(10) + this.get_suffix(filename);
        let keyValue = data.key + "/" + picName;
        ossData.append("key", keyValue);
        ossData.append("policy", data.policy);
        ossData.append("OSSAccessKeyId", data.accessId);
        ossData.append("success_action_status", 200);
        ossData.append("signature", data.signature);
        ossData.append("file", file.file, file.file.name);
        succ(data,ossData).then(res=>{
          console.log(res);
        })
      });
    },
    // 获取文件后缀
    get_suffix(filename) {
      let pos = filename.lastIndexOf(".");
      let suffix = "";
      if (pos != -1) {
        suffix = filename.substring(pos);
      }
      return suffix;
    },
    random_string(len) {
      len = len || 32;
      var chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
      var maxPos = chars.length;
      var pwd = "";
      for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    },
    uploadBefore(file) {
      //上传文件之前校验图片格式和大小
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif" ||
        file.type === "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG、JPEG、PNG、GIF 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过2MB!");
        return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>