<template>
  <div id="main">
    <!-- <h1>王编译</h1> -->
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  props: ["wang"],
  data() {
    return {
      editor: "",
    };
  },
  mounted() {
    //创建wang实例
    this.editor = new E("#main");
    // 取消自动 focus
    this.editor.config.focus = false;
    // 设置编辑区域高度为 500px
    this.editor.config.height = 150;
    // 配置菜单栏，删减菜单，调整顺序
    this.editor.config.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
      "strikeThrough",
      "indent",
      "lineHeight",
      "justify",
      "quote",
      "emoticon",
      "image",
      "video",
      "table",
      "code",
      "splitLine",
      "undo",
      "redo",
    ];
    // 配置 onchange 回调函数
    this.editor.config.onchange = (newHtml) => {
      //   console.log("change 之后最新的 html", newHtml);
      //把获取富文本的数据发送到addGoods页面中
      this.$emit("getWang", newHtml);
    };
    // 配置触发 onchange 的时间频率，默认为 200ms
    this.editor.config.onchangeTimeout = 500; // 修改为 500ms
    // if(this.wang){
    //   console.log(this.wang);
    //   this.editor.disable();
    //   // return
    // }

    // console.log(this.wang);
    this.editor.create();
  },
};
</script>

<style lang="less" scoped>
</style>