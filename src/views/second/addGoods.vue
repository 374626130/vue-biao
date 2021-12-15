<template>
  <div>
    <el-dialog
      :title="titles"
      :visible.sync="dialogVisible"
      width="60%"
      height="500px"
      :before-close="handleClose"
    >
      <!-- 1：内弹框 类目选择 -->
      <el-dialog
        width="30%"
        title="内层 Dialog"
        :visible.sync="innerVisible"
        append-to-body
      >
        <Tree @getName="getName" />
        <!-- 弹出框脚部 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="showTree">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 2：内弹框 ---图片上传 -->
      <el-dialog
        width="40%"
        title="内层 Dialog"
        :visible.sync="upload"
        append-to-body
      >
        <UpImg @getImgUrl="getImgUrl" />
        <!-- 弹出框脚部 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="upload = false">取 消</el-button>
          <el-button type="primary" @click="tijiao">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :disabled="forbidden"
      >
        <el-form-item label="类目选择" prop="category">
          <el-button type="primary" @click="innerVisible = true"
            >类目选择</el-button
          >
          <span class="Sname">{{ NowName }}</span>
        </el-form-item>
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
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
        <el-form-item label="商品卖点" prop="sellPoint">
          <el-input v-model="ruleForm.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="活动形式">
          <Wang ref="myEditor" @getWang="getWang" :wang="wang" />
        </el-form-item>
        <hr />
        <el-form-item label="图片上传" prop="image">
          <el-button type="primary" @click="upload = true">图片上传</el-button>
        </el-form-item>
        <div class="Img"><img :src="nowImgUrl" alt="" /></div>
        <hr />
        <!-- 规格参数的配置 -->
        <el-form-item label="规格参数的配置" v-if="isShow">
          <!-- /////////////////////// -->
          <el-form
            ref="dynamicValidateForm"
            label-width="100px"
            class="demo-dynamic"
          >
            <el-form-item
              v-for="(domain, index) in groups"
              :label="domain.title"
              :key="index"
              :prop="domain.value"
            >
              <el-input v-model="domain.value"></el-input>
              <!-- 二级增减框 -->
              <el-form-item
                v-for="(item, i) in domain.children"
                :label="item.title"
                :key="i"
                :prop="item.value"
              >
                <el-input v-model="item.value"></el-input>
              </el-form-item>
            </el-form-item>
          </el-form>
        </el-form-item>
      </el-form>
      <!-- 弹出框脚部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Tree from "./Leimu.vue";
import UpImg from "./upImg.vue";
import Wang from "./wangEditor.vue";
export default {
  props: ["dialogVisible", "rowObj", "wang"],
  components: {
    Tree,
    UpImg,
    Wang,
  },
  data() {
    return {
      ruleForm: {
        //表单容器-对象
        id: "",
        title: "", //商品名称
        price: "",
        num: "",
        sellPoint: "",
        image: "",
        descs: "",
        cid: "", //类目的id
        category: "", //商品类目
        date1: "", //商品时间
        date2: "", //商品时间
      },
      groups: [], //存储请求到的数据
      isShow: false, //规格配置参数书否显示
      forbidden: false,
      titles: "添加商品",
      innerVisible: false,
      upload: false,
      ImgUrl: "",
      nowImgUrl: "",
      Name: "",
      NowName: "",
      desc: "",
      // cid: "",

      rules: {},
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          //关闭弹框
          this.$emit("getDia");

          //  // 参数： title cid  category sellPoint price num descs paramsInfo image
          let {
            title,
            cid,
            category,
            sellPoint,
            price,
            num,
            descs,
            image,
            id,
          } = this.ruleForm;

          //判断当前按钮类型
          if (this.titles == "添加商品") {
            this.$api
              .getAddGoods({
                title,
                cid,
                category,
                sellPoint,
                price,
                num,
                descs,
                image,
                paramsInfo: JSON.stringify(this.groups),
              })
              .then((res) => {
                // console.log(res.data);
                if (res.data.status === 200) {
                  //成功
                  this.$parent.Http(1);
                  this.$message({
                    message: "恭喜你，修改商品成功",
                    type: "success",
                  });
                  //清空表单
                  this.clearForm();
                }
              });
          } else {
            // console.log("编辑商品");
            this.$api
              .getXiuGoods({
                title,
                cid,
                category,
                sellPoint,
                price,
                num,
                descs,
                image,
                id,
              })
              .then((res) => {
                console.log(res.data);
              });
            this.$parent.Http(1);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      this.groups = [];
      this.isShow = false;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onSubmit() {
      console.log("submit!");
    },
    cancel() {
      //清空表单
      this.clearForm();
      this.$emit("getDia");
    },
    confirm() {
      this.$emit("getDia");
    },
    handleClose() {
      this.$confirm("确认关闭？")
        .then((_) => {
          //清空表单
          this.clearForm();
          this.$emit("getDia");
        })
        .catch((_) => {});
    },
    getName(val) {
      this.Name = val.name;
      this.ruleForm.cid = val.cid;
      console.log("teeeeeeeeeeeeeeeeeeeee", val);
    },
    showTree() {
      this.innerVisible = false;
      //显示
      this.NowName = this.Name;
      //将选择的类目传给表单
      this.ruleForm.category = this.Name;
      this.$api
        .getcategory({
          cid: this.ruleForm.cid,
        })
        .then((res) => {
          console.log("显示规格参数", res.data);
          if (res.data.status === 200) {
            this.isShow = true;
            //存储规格参数 的数据
            let result = res.data.result[res.data.result.length - 1];
            console.log(result.paramData);
            this.groups = JSON.parse(result.paramData);
          } else {
            this.isShow = false;
          }
        });
      //点击确定 显示规格参数配置
      // this.isShow = true;
    },
    getImgUrl(val) {
      console.log(val);
      this.ImgUrl = val;
    },
    tijiao() {
      this.upload = false;
      this.nowImgUrl = this.ImgUrl;
      //将图片路径传给表单
      this.ruleForm.image = this.ImgUrl;
    },
    //王发送的数据
    getWang(val) {
      // console.log(val);
      this.ruleForm.descs = val;
    },
    /**
     * 清空表单数据列表
     */
    clearForm() {
      // this.dialogVisible = false; //1.关闭弹框
      // 清空表单  1 使用element里面的重置表单  2 自己手动初始化goodsForm
      // this.$refs.ruleForm.resetFields();
      this.ruleForm = {
        title: "", //商品名称
        price: "",
        num: "",
        sellPoint: "",
        image: "",
        descs: "",
        cid: "", //类目的id
        category: "", //商品类目
        date1: "", //商品时间
        date2: "", //商品时间
      };
      //单独-清空编辑器内容--editor.txt.clear()
      this.$refs.myEditor.editor.txt.clear();
      this.nowImgUrl = "";
    },
  },
  // 侦听器--来检测编辑传过来的数据然后做出相应操作 注意：当连续点击同一个商品编辑时侦听器认为没有改变不会触发--所以重复操作无法应  则{...obj}
  watch: {
    rowObj(val) {
      console.log(val);
      this.NowName = val.category;
      //将传递过来的数据传给表单
      this.ruleForm = val;
      //显示图片
      this.nowImgUrl = val.image;
      //延迟dom加载 --------侦听器速度快
      this.$nextTick(() => {
        console.log("this.$refs.myEditor", this.$refs.myEditor);
        this.$refs.myEditor.editor.txt.html(val.descs);
      });
      //显示商品参数
      this.isShow = true;
      this.groups=JSON.parse(val.paramsInfo)
    },
  },
};
</script>

<style lang="less" scoped>
.Sname {
  margin: 10px;
}
.Img {
  position: relative;
  top: -50px;
  left: 220px;
}
.Img img {
  width: 200px;
  height: 200px;
  margin-left: 50px;
}
</style>