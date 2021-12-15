<template>
  <div>
    <el-pagination
      background
      layout="total, prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="changePage"
      :current-page="currentPage1"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data(){
    return{
     
    }
  },
    props:['pageSize','total','currentPage1'],
    methods:{
        changePage(num){
        this.$emit('changePage',num)
        // this.currentPage1=1
        }
    }
}
</script>

<style>
</style>