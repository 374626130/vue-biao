<template>
  <div>
    <el-dialog
      title="添加规格参数"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <!-- 显示规格类目 -->
      <Leimu @getName="getName" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="(dialogVisible = false), (isDisabled = true)"
          >取 消</el-button
        >
        <el-button type="primary" @click="rightList" :disabled="isDisabled"
          >确定并添加分组</el-button
        >
      </span>
      <!-- 二级弹框 -->
      <el-dialog
        width="45%"
        title="商品规格参数配置"
        :visible.sync="innerVisible"
        append-to-body
      >
        <p>当前选中的商品：{{ treeData.label }}</p>
        <el-button @click="addDomain">新增规格列表</el-button>
        <hr />
        <!-- 底部按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('dynamicValidateForm')"
            >确定</el-button
          >
          <el-button @click="resetForm">重置</el-button>
        </span>
        <!-- 动态增减框 -->
        <el-form
          :model="dynamicValidateForm"
          ref="dynamicValidateForm"
          label-width="100px"
          class="demo-dynamic"
        >
          <el-form-item
            v-for="(domain, index) in dynamicValidateForm.domains"
            :label="domain.title + index"
            :key="index"
            :prop="domain.title"
            :rules="{
              required: true,
              message: '域名不能为空',
              trigger: 'blur',
            }"
          >
            <el-input v-model="domain.title"></el-input>
            <el-button @click.prevent="addChild(index)">增加子组</el-button>
            <el-button @click.prevent="removeDomain(index)">删除</el-button>
            <!-- 二级增减框 -->
            <el-form-item
              v-for="(item, i) in domain.children"
              :label="item.title + i"
              :key="i"
              :prop="item.title"
              :rules="{
                required: true,
                message: '域名不能为空',
                trigger: 'blur',
              }"
            >
              <el-input v-model="item.title"></el-input>
              <el-button @click.prevent="removeChildDomain(index, i)"
                >删除</el-button
              >
            </el-form-item>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import Leimu from "../second/Leimu.vue";
export default {
  components: {
    Leimu,
  },
  data() {
    return {
      dialogVisible: false, //一级弹框
      innerVisible: false, //二级弹框
      isDisabled: true, //默认不可点击
      treeData: {}, //tree 数据
      //   动态增减框
      dynamicValidateForm: {
        domains: [],
      },
    };
  },
  methods: {
    //弹框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          this.isDisabled = true;
        })
        .catch((_) => {});
    },
    rightList() {
      // this.dialogVisible = false;
      this.innerVisible = true;
    },
    //接收到类目发来的name
    getName(val) {
      this.treeData = val;
      console.log("ssssssss", val);
      if (val.name) {
        this.isDisabled = false;
      }
    },
    //动态增减框
    //提交事件
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.dynamicValidateForm.domains);
          // 参数：itemCatId,content,specsName
          this.$api
            .getAddG({
              itemCatId: this.treeData.cid,
              content: JSON.stringify(this.dynamicValidateForm.domains),
              specsName: this.treeData.label,
            })
            .then((res) => {
              console.log(res.data);
              if (res.data.status === 200) {
                //添加成功 隐藏弹框 更新规格列表
                (this.dialogVisible = false), //一级弹框
                  (this.innerVisible = false); //二级弹框
                //清空数据
                this.dynamicValidateForm.domains = [];
                //设置为不可点击
                this.isDisabled = true;
                //更新视图
                this.$parent.http(1);
              } else {
                console.log("添加失败");
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置
    resetForm() {
      this.dynamicValidateForm.domains = [];
      //设置为不可点击
      this.isDisabled = true;
    },
    // 增加子组
    addChild(index) {
      this.dynamicValidateForm.domains[index].children.push({
        value: "",
        title: "",
      });
    },
    // 删除子组
    removeDomain(index) {
      this.dynamicValidateForm.domains.splice(index, 1);
    },
    //删除子组件
    removeChildDomain(index, i) {
      this.dynamicValidateForm.domains[index].children.splice(i, 1);
    },
    // 新增列表--增加大的说明的配置
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: "",
        title: "",
        children: [],
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-input {
  width: 65%;
  margin-right: 10px;
  margin-left: 35px;
  margin-top: 5px;
}
</style>