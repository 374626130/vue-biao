<template>
  <div class="login">
    <div class="login-box">
      <h2>登录</h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="username">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <span class="tips">{{ info }}</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import jwt from "jwt-decode";
import { mapMutations } from "vuex";
export default {
  data() {
    var username = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        if (this.ruleForm.username !== "") {
          this.$refs.ruleForm.validateField("username");
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: username, trigger: "blur" }],
        username: [{ validator: validatePass, trigger: "blur" }],
      },
      info: "",
    };
  },
  methods: {
    ...mapMutations("LoginModule", ["setUser"]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("校验通过", this.ruleForm);
          let { username, password } = this.ruleForm;
          //请求登录接口
          this.$api
            .getLogin({
              username,
              password,
            })
            .then((res) => {
              console.log("5555", res.data);
              if (res.data.status === 200) {
                console.log(jwt(res.data.data).username);
                //存储admin
                let obj = {
                  username: jwt(res.data.data).username,
                  token: res.data.data,
                };
                this.setUser(obj);
                //本地存储
                localStorage.setItem("username", JSON.stringify(obj));
                //跳转到首页
                this.$router.push("/");
              } else {
                //账号或者密码错误
                this.info = "账号或者密码错误";
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  .login-box {
    width: 500px;
    height: 300px;
    background-color: rgb(225, 225, 228);
    margin: 0 auto;
    margin-top: 200px;
    box-sizing: border-box;
    padding-right: 100px;
    padding-top: 30px;
    padding-left: 20px;

    h2 {
      text-align: center;
      height: 60px;
    }
  }
  .tips {
    color: red;
    margin-left: 18px;
  }
}
</style>