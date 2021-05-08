<template>
  <div style="padding: 24px">
    <el-upload
      class="upload-demo"
      drag
      :action="addressOos"
      :on-progress="onProgress"
      :on-change="onChange"
      :on-success="onSuccess"
      :on-error="onError"
      multiple
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>
<script>
import { uploadImg } from "@/api/upload";
export default {
  name: "picUpload",
  data() {
    return {
      ossObj: {},
      addressOos:"",
    };
  },
  mounted() {
    // 获取签名
    uploadImg().then((res) => {
      console.log(res);
      // this.ossObj = res.data.aliYunUploadSignResult;
      // console.log(this.ossObj);
      // this.addressOos = this.ossObj
    });
  },
  methods: {
    onProgress(file, fileList){
      console.log(file);
      console.log(fileList);
    },
    onChange(response, file, fileList){
      console.log(response);
      console.log(file);
      // console.log(fileList);
    },    
    onSuccess(response, file, fileList){
      console.log(response);
      console.log(file);
      console.log(fileList);
    },  
    onError(err, file, fileList){
      console.log(err);
      console.log(file);
      console.log(fileList);

    },
  },
};
</script>

<style lang="scss" scoped>
</style>