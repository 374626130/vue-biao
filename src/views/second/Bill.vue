<template>
  <div class="Bill">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>发票</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="download"
              >下载发票</el-button
            >
          </div>
          <img :src="imgUrl" alt="" ref="img1" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>发票</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="download2"
              >下载本地发票</el-button
            >
          </div>
          <img class="img1" :src="imgUrl" alt="" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import img from "../../../public/01.jpg";
export default {
  data() {
    return {
      imgUrl: img,
    };
  },
  methods: {
    download() {
      //新窗口打开
      let url = this.$refs.img1;
      window.location.href = url.src;
    },
    download2() {
      var alink = document.createElement("a");
      alink.href = this.imgUrl;
      console.log(this.imgUrl);
      alink.download = "pic"; //图片名
      alink.click();
    },
  },
};
</script>

<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
img {
  width: 100%;
  height: 100%;
}
</style>