<template>
  <div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#1b3554"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="isCollapse"
    >
      <el-menu-item>
        <span class="tittle">易购后台管理系统</span>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="iconfont icon-shouye"></i>
        <span slot="title">{{ $t("menu.home") }}</span>
      </el-menu-item>
      <el-menu-item index="/store">
        <i class="el-icon-menu"></i>
        <span slot="title">{{ $t("menu.good") }}</span>
      </el-menu-item>


      <!-- <el-menu-item index="/size">
        <i class="el-icon-setting"></i>
        <span slot="title">{{ $t("menu.params") }}</span>
      </el-menu-item> -->

      <!-- <el-submenu index="/order"> 

      </el-submenu> -->

        <el-submenu index="/size">
        <template slot="title">
          <i class="el-icon-setting"></i>
        <span slot="title">{{ $t("menu.params") }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/size/sizeinfo">规格配置</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="/Ad">
        <i class="el-icon-document"></i>
        <span slot="title">广告分类</span>
      </el-menu-item>
      <el-submenu index="/order">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>订单列表</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/order/Listoder">订单列表</el-menu-item>
          <el-menu-item index="/order/Listback">退货管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="/user">
        <i class="iconfont icon-usercenter"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ["isCollapse"],
};
</script>

<style lang="less" scoped>
.tittle {
  text-align: center;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  border-right: none;
}
.iconfont {
  font-size: 20px;
  margin-right: 8px;
}
</style>