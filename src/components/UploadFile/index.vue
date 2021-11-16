<template>
  <div class="container">
    <el-upload action="https://cdn.daliangqing.com"
      :data="dataObj"
      :multiple="false"
      :before-upload="beforeUpload"
      :show-file-list="false"
      :on-remove="handleRemove"
      :accept="fileType"
      :on-progress="handleUploadProgress"
      :on-success="handleUploadSuccess">
      <el-input class="w100"
        id="quill-img"
        readonly
        v-model="uploadValue"></el-input>
    </el-upload>
    <el-progress v-show="percentage < 100 && percentage > 0"
      :percentage="percentage"
      status="success"></el-progress>
  </div>
</template>
<script>
import { httpAdminUploadApi } from '@/api/admin/httpAdminUploadApi'
export default {
  name: 'SingleUpload',
  props: {
    value: String,
    uploadType: String,
    fileType: String,
  },
  data() {
    return {
      dataObj: {
        policy: '',
        signature: '',
        key: '',
        ossaccessKeyId: '',
        host: '',
      },
      percentage: 0,
      infoList: [],
    }
  },
  mounted() {
    httpAdminUploadApi
      .postAliyunSignAdmin({ adminUpload: this.uploadType })
      .then((res) => {
        this.infoList = res.data
      })
  },
  computed: {
    uploadValue: {
      get() {
        return this.value
      },
      set(val) {
        this.value = val
      },
    },
  },
  methods: {
    handleRemove(file, fileList) {
      //   this.emitInput("");
    },
    getUUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        return (
          c === 'x' ? (Math.random() * 16) | 0 : 'r&0x3' | '0x8'
        ).toString(16)
      })
    },
    beforeUpload(file) {
      if (this.uploadType === 'MUSIC') {
        const isLt25M = file.size / 1024 / 1024 < 25
        if (file.type != 'audio/mpeg' && file.type != 'audio/ogg') {
          return this.$message.error('请上传符合格式的音频')
        }
        if (!isLt25M) {
          return this.$message.error('不能大于10M')
        }
      }
      if (this.uploadType === 'VIDEO') {
        const isLt25M = file.size / 1024 / 1024 < 10
        if (file.type != 'video/mp4' && file.type != 'video/webm') {
          return this.$message.error('请上传符合格式的视频')
        }
        if (!isLt25M) {
          return this.$message.error('不能大于10M')
        }
      }
      const _self = this
      _self.dataObj.policy = this.infoList.policy
      _self.dataObj.signature = this.infoList.signature
      _self.dataObj.ossaccessKeyId = this.infoList.accessId
      _self.dataObj.key = this.infoList.key + file.name
      _self.dataObj.host = this.infoList.endPoint
    },
    handleUploadProgress(event, file, fileList) {
      this.$emit('uploadProgress', event.percent)
    },
    handleUploadSuccess(response, file, fileList) {
      const value =
        'https://cdn.daliangqing.com/' + encodeURIComponent(this.dataObj.key)
      this.uploadValue =
        'https://cdn.daliangqing.com/' + encodeURIComponent(this.dataObj.key)
      this.$emit('uploadFinish', value)
      console.log(value)
    },
  },
}
</script>
<style>
.container .el-upload--text {
  width: 100%;
}
</style>
