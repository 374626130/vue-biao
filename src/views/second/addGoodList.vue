<template>
  <div class="addList">
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/store' }"
          >商品管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>增加商品</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="bottom">

                <!-- 表单 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="类目选择">
          <el-button type="primary">主要按钮</el-button>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="ruleForm.category"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="ruleForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="num">
          <el-input v-model="ruleForm.num"></el-input>
        </el-form-item>
        <el-col :span="24">
          <el-form-item>
            <el-date-picker
              type="date"
              placeholder="发布时间"
              v-model="ruleForm.date1"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-form-item label="商品卖点">
          <el-input v-model="ruleForm.status"></el-input>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        category: "",
        price: "",
        num: "",
        status: "",
        delivery: false,
        type: [],
        title: "",
        desc: "",
      },
      rules: {
        price: [
          { required: true, message: "请输入商品价格", trigger: "change" },
        ],
        num: [{ required: true, message: "请输入商品数量", trigger: "change" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onSubmit() {
      console.log("submit!");
    },
    cancel() {
      this.$emit("getDia");
    },
    confirm() {},

    }
};
</script>

<style lang="less" scoped>
.addList {
  margin: 15px;
  background-color: #eee;
  .nav {
    margin-bottom: 20px;
    background-color: white;
    height: 60px;
  }
  .el-breadcrumb {
    line-height: 60px;
    font-size: 24px;
    margin-left: 10px;
  }
  .bottom{
      background-color: white;
  }
}
</style>