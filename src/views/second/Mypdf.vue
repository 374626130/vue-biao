<template>
  <div>
    <el-dialog title="合同内容" :visible.sync="dialogVisible" width="60%">
      <el-button @click="add">page++</el-button>
      <el-button @click="jian">page-- </el-button>

      <hr />

      <!--  @num-pages="pageCount = $event"--获取总页码
        @page-loaded="currentPage = $event"--当前页码

        methods:{

            打印
            print()
        }

         -->
      {{ currentPage }} / {{ pageCount }}
      <el-button @click="print">打印 </el-button>

      <pdf
        src="./sxt.pdf"
        @num-pages="pageCount = $event"
        @page-loaded="currentPage = $event"
        :page="currentPage"
        ref="myP"
      />

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>

import pdf from "vue-pdf";
export default {
  components: {
    pdf,
  },

  data() {
    return {
      dialogVisible: false,
      num: 1,
      currentPage: 1,
      pageCount: "",
    };
  },
  methods: {
    add() {
      if (this.currentPage >= this.pageCount) {
        this.currentPage = this.pageCount;
        return;
      }
      this.currentPage++;
      console.log(this.pageCount);
    },
    jian() {
      if (this.currentPage <= 0) {
        this.currentPage = 0;
        return;
      }
      this.currentPage--;
    },
    //打印
    print() {
      this.$refs.myP.print();
    },
  },
};
</script>

<style>
</style>