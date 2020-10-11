<template>
  <div class="account">
    <p class="title">
      <span>后台首页</span>
    </p>
    <div class="main">
      <table>
        <tr>
          <td style="width:150px">当前文件路径</td>
          <td>{{this.info.catalog}}</td>
        </tr>
        <tr>
          <td>软件运行环境</td>
          <td>{{this.info.sofware}}</td>
        </tr>
        <tr>
          <td>系统环境</td>
          <td>{{this.info.win}}</td>
        </tr>
        <tr>
          <td>版本号</td>
          <td>{{this.info.edition}}</td>
        </tr>
      </table>
      <div id="yearChart"></div>
      <div id="monthChart"></div>
      <div id="dayChart"></div>
    </div>

  </div>
</template>

<script>
import url from "../api/api.js";
import echarts from "echarts";
export default {
  data() {
    return {
      info: [],
      user_id: localStorage.getItem("user_id"),
      merchant_id: "1"
    };
  },
  created() {
    this.getInfo();
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    getInfo() {
      let data = {
        time: Math.floor(new Date().getTime() / 1000),
        merchant_id: this.merchant_id,
        user_id: this.user_id,
        token: this.postToken()
      };
      this.$axios.post(url.index, data).then(res => {
        this.info = res.data.data;
      });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let yearChart = echarts.init(document.getElementById("yearChart"),'light');
      let monthChart = echarts.init(document.getElementById("monthChart"));
      let dayChart = echarts.init(document.getElementById("dayChart"),'light');
      // 绘制图表k
      yearChart.setOption({
        title: {
          text: "年交易量/收入额"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["交易量", "收入额"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["2020","2019","2018","2020","2019","2018"]
        },
        yAxis: {
          // type: "value"
        },
        series: [
          {
            name: "交易量",
            type: "line",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "收入额",
            type: "line",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
        ]
      });
      monthChart.setOption({
        title: {
          text: "月交易量/收入额"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["交易量", "收入额"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sept","Oct","Nov","Dec"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "交易量",
            type: "line",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "收入额",
            type: "line",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
        ]
      });
      dayChart.setOption({
        title: {
          text: "日交易量/收入额"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["交易量", "收入额"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["1", "2", "3", "4", "5", "6", "7","8","9","10","11", "12", "13", "14", "15", "16", "17","18","19","20","21", "22", "23", "24", "25", "26", "27","28","29","30","31"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "交易量",
            type: "line",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "收入额",
            type: "line",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
        ]
      });
    },
    //生成token
    postToken() {
      let time = Math.floor(new Date().getTime() / 1000);
      let merchant_id = this.merchant_id;
      let user_id = this.user_id;
      var token = this.$md5(merchant_id + time + user_id);
      return token;
    }
  }
};
</script>
<style lang="scss" scoped>
.account {
  height: 100%;
  overflow: auto;
  background-color: #fff;
}
.title {
  line-height: 50px;
  text-indent: 20px;
  margin: 0;
  border-bottom: 1px solid #e9eef3;
  span {
    margin-right: 20px;
  }
}
#yearChart {
  width: 80%;
  height: 250px;
  margin-top: 50px;
}
#monthChart {
  width: 80%;
  height: 250px;
  margin-top: 30px;
}
#dayChart {
  width: 80%;
  height: 250px;
  margin-top: 30px;
}
.main {
  height: 100%;
  background-color: #fff;
  padding-top: 30px;
}
table {
  margin: auto;
  width: 95%;
  font-family: verdana, arial, sans-serif;
  font-size: 12px;
  color: #333333;
  border-width: 1px;
  border-color: #666666;
  border-collapse: collapse;
  th {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #bbbbbb;
    background-color: #dedede;
  }
  td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #bbbbbb;
    background-color: #ffffff;
  }
}
</style>

