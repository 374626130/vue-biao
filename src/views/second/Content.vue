<template>
  <div class="Content">
    <div class="header">
      <div class="header-left">
        <i
          v-if="isCollapse"
          class="iconfont icon-indent"
          @click="changemenu"
        ></i>
        <i v-else class="iconfont icon-right-indent" @click="changemenu"></i>
      </div>
      <div class="login">
        <el-dropdown style="color: #fff" @command="clickLang">
          <span class="el-dropdown-link">
            多语言<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="user">
          <!--登录 -->
          欢迎：{{ userInfo.username }}
          <i class="el-icon-switch-button" @click="del"></i>
        </div>
      </div>
    </div>
    <!-- 路由出口 -->
    <router-view />
  </div>
</template>

<script>
import { mapState,mapMutations } from "vuex";
export default {
  props: ["isCollapse"],
  computed: {
    ...mapState("LoginModule", ["userInfo"]),
  },
  methods: {
    ...mapMutations("LoginModule", ["clearUser"]),
    changemenu() {
      //修改父组件数据 伸缩
      this.$emit("changeCollapse");
    },
    clickLang(command) {
      // console.log(this);
      this.$i18n.locale = command;
    },
    del(){
      //清除数据vuex
      this.clearUser()
      //清空本地数据
      localStorage.removeItem('user')
      //返回登陆页面
      this.$router.push('/login')

    }
  },
};
</script>

<style lang="less" scoped>
.Content {
  .header {
    height: 60px;
    background-color: rgb(30, 120, 191);
    .header-left {
      width: 100px;
      float: left;
      line-height: 60px;
      .iconfont {
        font-size: 30px;
        display: inline-block;
        color: #fff;
      }
    }
  }
  .login {
    // width: 260px;
    display: flex;
    height: 100%;
    // background-color: saddlebrown;
    float: right;
    margin-right: 20px;
    line-height: 60px;
    .el-dropdown {
      margin-right: 30px;
    }
  }
  .user {
    font-size: 17px;
    margin-right: 30px;
    i {
      font-size: 20px;
    }
  }
}
</style>