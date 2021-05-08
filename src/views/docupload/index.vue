<template>
  <div>
    <el-form :model="admin" label-width="60px">
      <el-form-item label="头像">
        <single-upload v-model="admin.userImg" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import singleUpload from '@/components/UploadFile'
export default {
  components: {
    singleUpload
  },
  data() {
    return {
      admin: {
        userImg: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>