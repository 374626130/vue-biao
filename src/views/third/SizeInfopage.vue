<template>
  <div class="page">
    <el-pagination
      background
      layout="total, prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="pageChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: ["total", "pageSize"],
  data() {
    return {};
  },
  methods: {
    pageChange(page) {
      // console.log(page);
      this.$emit("getPage", page);
    },
  },
};
</script>
<style lang="less" scoped>
.page {
  .el-pagination {
    text-align: center;
    margin-top: 30px;
  }
}
</style>