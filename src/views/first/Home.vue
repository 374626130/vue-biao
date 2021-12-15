<template>
  <div class="Home">
    <!-- 导航栏 -->
    <div class="myMenu"><Mymenu :isCollapse="isCollapse" /></div>
    <!-- 内容区域 -->
    <div class="content" :class="{ active: isCollapse }">
      <Content @changeCollapse="changeCollapse" :isCollapse="isCollapse" />
    </div>
  </div>
</template>

<script>
import Mymenu from "../second/Mymenu.vue";
import Content from "../second/Content.vue";
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  components: {
    Mymenu,
    Content,
  },
  methods: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style lang="less" scoped>
.Home {
  .myMenu {
    // width: 200px;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: #1b3554;
  }
  .content {
    margin-left: 200px;
  }
  .active {
    margin-left: 64px;
  }
}
</style>