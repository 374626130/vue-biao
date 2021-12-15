<template>
  <div class="store">
    <!-- 搜索区域 -->
    <div class="header">
      <el-input
        v-model="input"
        placeholder="请输入内容"
        @change="changeIpt"
      ></el-input>
      <el-button type="primary">查询</el-button>
      <el-button type="primary" @click="addGoods">添加</el-button>
      <el-button type="primary" @click="addList">添加表单</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="50"> </el-table-column>
        <el-table-column
          prop="cid"
          label="商品ID"
          width="100"
          sortable
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="title"
          label="商品名称"
          width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="price"
          label="商品价格"
          width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="num"
          label="商品数量"
          width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="category"
          label="商品类目"
          width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="image" label="规格图片" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="sellPoint"
          label="商品卖点"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="descs" label="商品描述" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button
              type="info"
              size="mini"
              @click="see(scope.$index, scope.row)"
              >查看</el-button
            >
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页区域 -->
    <div class="page">
      <page
        :total="total"
        :pageSize="pageSize"
        @changePage="changePage"
        :currentPage1="currentPage1"
      />
    </div>
    <!-- 添加弹框 -->
    <AddGoods
      ref="myAddGoods"
      :dialogVisible="dialogVisible"
      :rowObj="rowObj"
      :wang="wang"
      @getDia="getDia"
    />
  </div>
</template>
<script>
import page from "./page.vue";
import AddGoods from "./addGoods.vue";
export default {
  components: {
    page,
    AddGoods,
  },
  data() {
    return {
      input: "",
      tableData: [],
      total: 100,
      pageSize: 10,
      type: 1,
      list: [],
      dialogVisible: false,
      currentPage1: 1,
      rowObj: {},
      wang: false,
    };
  },
  methods: {
    //查看
    see(index, row) {
      //将表单设置为只读模式
      this.$refs.myAddGoods.forbidden = true;
      //将wangEditor只读
      // 禁用
      // editor.disable();
      this.wang = true;
      //显示弹框
      this.dialogVisible = true;
      console.log(row);
      this.rowObj = { ...row };
    },
    //编辑
    handleEdit(index, row) {
      this.wang = false;
      //将表单去除只读模式
      this.$refs.myAddGoods.forbidden = false;
      //显示弹框
      this.dialogVisible = true;
      //修改弹框标题
      this.$refs.myAddGoods.titles = "编辑商品";
      this.rowObj = { ...row };
      //操作dom元素方法
      // this.$refs.myAddGoods.ruleForm = row;
      //  //将图片路径传给表单
      //  this.$refs.myAddGoods.nowImgUrl = row.image;

      // console.log(this.$refs.myAddGoods.ruleForm);
    },
    // 删除事件
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //删除接口
          this.$api.getDelGoods({ id: row.id }).then((res) => {
            // console.log(res.data);
            if (res.data.status === 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
          });
          this.Http(1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //分页数改变时触发事件
    changePage(num) {
      if (this.type == 1) {
        this.Http(num);
        this.currentPage1 = num;
      } else {
        this.tableData = this.list.slice((num - 1) * 3, num * 3);
        this.currentPage1 = num;
      }
    },
    //请求商品数据
    Http(page) {
      this.$api.getGoods({ page: page }).then((res) => {
        if (res.status == 200) {
          // console.log(res);
          this.tableData = res.data.data;
          //获取数据总条数 和 每页显示个数
          this.total = res.data.total;
          this.pageSize = res.data.pageSize;
        } else {
          console.error("获取数据失败");
        }
      });
    },

    //搜索框事件
    changeIpt(val) {
      if (!val) {
        //请求商品第一页数据
        this.Http(1);
        this.type = 1;
        this.currentPage1 = 1;
        return;
      }
      console.log(val); 
      //请求搜索到的数据
      this.$api.getVal({ search: val }).then((res) => {
        this.currentPage1 = 1;
        // console.log(res.data);
        if (res.data.status == 200) {
          this.type = 2;
          this.list = res.data.result;
          //假设需要分页 前端可以自己处理分页
          //拿到搜索的数据总数
          this.total = res.data.result.length;
          //设定为一页3条数据
          this.pageSize = 3;
          this.tableData = res.data.result.slice(0, 3);
        } else {
          this.tableData = [];
          this.total = 0;
          this.pageSize = 1;
        }
      });
    },
    // 增添商品 --弹框
    addGoods() {
      this.wang = false;
      //将表单去除只读模式
      this.$refs.myAddGoods.forbidden = false;
      this.dialogVisible = !this.dialogVisible;
      //修改弹框标题
      this.$refs.myAddGoods.titles = "添加商品";
    },
    getDia() {
      this.dialogVisible = false;
    },
    addList() {
      this.$router.push("/addGoodsList");
    },
  },
  created() {
    //请求商品第一页数据
    this.$api.getGoods({ page: 1 }).then((res) => {
      if (res.status == 200) {
        // console.log(res);
        this.tableData = res.data.data;
        //获取数据总条数 和 每页显示个数
        this.total = res.data.total;
        this.pageSize = res.data.pageSize;
      } else {
        console.error("获取数据失败");
      }
    });
  },
};
</script>

<style lang="less" scoped>
.store {
  margin: 20px;
  .header {
    display: flex;
    .el-button {
      margin-left: 10px;
    }
  }
  .page {
    width: 500px;
    margin: 0 auto;
    margin-top: 40px;
  }
}
</style>