<template>
  <div class="SizeInfo">
    <!--1： 目录 -->
    <div class="menu">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/size' }"
          >规格参数</el-breadcrumb-item
        >
        <el-breadcrumb-item>规格配置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--2： 搜索框 -->
    <div class="IPt">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="primary" @click="searchIpt">搜索</el-button>
      <el-button type="primary" @click="addList">添加</el-button>
    </div>
    <!--3： 表格 -->
    <div class="list">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="规格参数ID" width="100">
        </el-table-column>
        <el-table-column
          prop="itemCatId"
          label="类目ID"
          width="180"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="specsName"
          label="规格名称"
          width="180"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="paramData"
          label="规格参数"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="180">
          <template slot-scope="scope">
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
    <!--4： 分页 -->
    <Page :total="total" :pageSize="pageSize" @getPage="getPage" />
    <!--5； 弹框 -->
    <AddList ref="dialog" />
  </div>
</template>
  </div>
</template>

<script>
import Page from "../third/SizeInfopage.vue";
import AddList from "../third/addList.vue";
export default {
  components: {
    Page,
    AddList,
  },
  data() {
    return {
      input: "",
      tableData: [],
      total: 100,
      pageSize: 1,
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    http(page) {
      this.$api.getParams({ page }).then((res) => {
        console.log(res.data);
        if (res.data.status === 200) {
          this.tableData = res.data.data;
          //获取分页
          this.total = res.data.total;
          this.pageSize = res.data.pageSize;
        }
      });
    },
    //分页器切换页数
    getPage(page) {
      console.log(page);
      this.http(page);
    },
    //模糊查询
    searchIpt() {
      console.log(this.input);
      let val = this.input;
      this.$api.getSearch({ search: val }).then((res) => {
        console.log(res.data);
      });
    },

    //添加按钮
    addList() {
      this.$refs.dialog.dialogVisible = true;
    },
  },
  created() {
    this.http(1);
  },
};
</script>

<style lang="less" scoped>
.SizeInfo {
  padding: 20px;
  .IPt {
    margin-top: 10px;
  }
}
.el-breadcrumb {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  text-align: left;
  background-color: #fff;
}
.el-button {
  margin-left: 10px;
}
.el-input {
  width: 90%;
}
</style>