<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="url"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="successUp"
      :file-list="fileList"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
    </el-upload>
  </div>
</template>

<script>
import base from "../../api/base";
export default {
  data() {
    return {
      fileList: [],
      url: base.uploadUrl,
    };
  },
  methods: {
    //上传成功的函数
    successUp(response, file) {
      console.log(response, file);
      // 上传成功提示框
      this.$message({
        message: "恭喜你图片上传成功！",
        type: "success",
      });
      let getImgUrl=base.host+'/'+response.url.slice(7)
      console.log(getImgUrl);
      this.$emit('getImgUrl',getImgUrl)
      //清空列表
      this.fileList = [];
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>

<style>
</style>