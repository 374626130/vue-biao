<template>
  <div>
    <el-tree :props="props" :load="loadNode" lazy  @node-click='nodeClick'> </el-tree>
  </div>
</template>
<script>
export default {
  data() {
    return {
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
    };
  },
  methods: {
          /**
       * 点击tree获取数据
       */
    nodeClick(data,node){
        console.log(data);
        //传递数据给父组件
        this.$emit("getName", data);
    },
    loadNode(node, resolve) {
      //resolve  成功的返回数据结果
      // console.log(node);
      if (node.level === 0) {
        this.$api.getCategory().then((res) => {
          //   console.log(res.data);
          return resolve(res.data.result);
        });
      }
      if (node.level >= 1) {
        this.$api
          .getCategory({
            id: node.data.cid,
          })
          .then((res) => {
            //   console.log(res.data);
            if (res.data.status == 200) {
              return resolve(res.data.result);
            } else {
              return resolve([]);
            }
          });
      }
    },
  },
};
</script>

<style>
</style>