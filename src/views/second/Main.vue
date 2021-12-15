<template>
  <div>
    <h1>首页</h1>
    <div id="main" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // date: [],
    };
  },
  methods: {
    picture(x, arr) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main"));

      // 指定图表的配置项和数据
      var option = {
        xAxis: {
          data: x,
        },
        yAxis: {},
        series: arr,
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
  mounted() {
    var arr = [];
    this.$api.getSellTotal().then((res) => {
      // console.log(res.data.info.date);
      let x = res.data.info.date;
      let arr1 = res.data.info.xResult;
      for (let i = 0; i < arr1.length; i++) {
        // console.log(arr1[i]);
        let obj = {};
        obj.type = "line";
        obj.stack = arr1[i].xName;
        let arr2 = arr1[i].data;
        let arr3 = [];
        for (let j = 1; j < arr2.length; j++) {
          arr3.push(arr2[j].num);
        }
        obj.data = arr3;
        arr.push(obj);
      }
      this.picture(x, arr);
    });

    //延迟dom加载 --------侦听器速度快
    // this.$nextTick(() => {
    //   console.log(this.data);
    // });
  },
};
</script>

<style>
</style>