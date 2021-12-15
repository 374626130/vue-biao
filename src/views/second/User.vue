<template>
  <div>
    <el-button @click="see">查看合同</el-button>
    <!-- <el-button @click="bill">查看发票</el-button> -->
    <Mypdf ref="mypdf" />
    <MyBill />
  </div>
</template>

<script>
import Mypdf from "./Mypdf.vue";
import MyBill from "./Bill.vue";
export default {
  components: {
    Mypdf,
    MyBill,
  },
  methods: {
    see() {
      this.$refs.mypdf.dialogVisible = true;
    },
    bill() {},
  },
};
</script>

<style>
</style>