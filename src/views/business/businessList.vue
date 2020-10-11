<template>
  <div style="height:100%">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/accountManage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>业务列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card">
      <p class="title">
        <span>业务列表</span>
        <el-button size="mini" @click="addOrder" type="primary">添加订单</el-button>
        <el-button size="mini" @click="exportData">导出Excel</el-button>
      </p>
      <!-- 列表 -->
      <el-table :data="tableData" style="width: 100%" height="600"
        :row-style="{height:'20px'}"
        :cell-style="{padding:'0px'}">
        <el-table-column label="">
          <template slot="header" slot-scope="scope">订单搜索：
            <el-date-picker
              v-model="rangeDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="mini"
              value-format="yyyy-MM-dd"
            ></el-date-picker>关键字：
            <el-input
              placeholder="客户名称/订单名称"
              size="mini"
              v-model="searchInfo.keyword"
              class="keywords"
              @keyup.enter.native="search"
            >
              <el-button slot="append" @click="search">搜索</el-button>
            </el-input>
          </template>
          <el-table-column label="业务">
          <el-table-column prop="id" label="业务序号" width="80px"></el-table-column>
          <el-table-column prop="state_name" label="业务状态" width=""></el-table-column>
          <el-table-column prop="add_time" label="签订日期" width="200px"></el-table-column>
          <el-table-column prop="salesman" label="业务员" width="120px"></el-table-column>
          <!-- <el-table-column prop="note" label="备注" min-width="140px" :show-overflow-tooltip="true"></el-table-column> -->
          <!-- <el-table-column prop="sale_orderNo" label="销售订单号" width="140px">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                v-if="scope.row.sale_orderNo==null"
                @click="addSale(scope.row)"
              >添加</el-button>
              <el-button type="text" size="small" v-else @click="searchSale(scope.row)">{{scope.row.sale_orderNo}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="purchase_orderNo" label="采购订单号" width="140px">
          </el-table-column>-->
          <el-table-column prop="" label="预计毛利" width="160px"></el-table-column>
          <el-table-column prop="" label="实际毛利" width="80px"></el-table-column>
          <el-table-column prop="" label="税费" width="80px"></el-table-column>
          <el-table-column prop="" label="净利润" width="80px"></el-table-column>
          <el-table-column prop="amount" label="金额" width="120px"></el-table-column>
        </el-table-column>
        <el-table-column label="销售订单">
          <el-table-column label="">
            <el-table-column prop="sale_order_num" label="订单序号" ></el-table-column>
            <el-table-column prop="" label="订单名称" ></el-table-column>
          </el-table-column>
          <el-table-column label="销售">
            <el-table-column prop="" label="应收总额" ></el-table-column>
            <el-table-column prop="" label="已收总额" ></el-table-column>
            <el-table-column prop="" label="应收余额" ></el-table-column>
            <el-table-column prop="" label="应收垫款" ></el-table-column>
            <el-table-column prop="" label="退款" ></el-table-column>
          </el-table-column>
          <el-table-column label="其他">
            <el-table-column prop="" label="发票数量" ></el-table-column>
            <el-table-column prop="" label="客户" ></el-table-column>
            <el-table-column prop="" label="业务员" ></el-table-column>
            <el-table-column prop="" label="合同号" ></el-table-column>
            <el-table-column prop="" label="签订日期" ></el-table-column>
            <el-table-column prop="" label="合同数量" ></el-table-column>
            <el-table-column prop="" label="车辆类型" ></el-table-column>
            <el-table-column prop="" label="车辆名称" ></el-table-column>
          </el-table-column>
          <el-table-column label="费用">
            <el-table-column prop="" label="信息费" ></el-table-column>
            <el-table-column prop="" label="送车费" ></el-table-column>
            <el-table-column prop="" label="其他" ></el-table-column>
            <el-table-column prop="" label="加油" ></el-table-column>
            <el-table-column prop="" label="小计" ></el-table-column>
          </el-table-column>
          <el-table-column label="财务">
            <el-table-column prop="" label="是否结算" ></el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="采购订单">
          <el-table-column label="">
            <el-table-column prop="" label="订单序号" ></el-table-column>
            <el-table-column prop="" label="订单名称" ></el-table-column>
          </el-table-column>
          <el-table-column label="合格证">
            <el-table-column prop="" label="合格证费用" ></el-table-column>
            <el-table-column prop="" label="已收金额" ></el-table-column>
          </el-table-column>
          <el-table-column label="采购底盘/整车">
            <el-table-column prop="" label="采购价" ></el-table-column>
            <el-table-column prop="" label="采购" ></el-table-column>
            <el-table-column prop="" label="单价" ></el-table-column>
            <el-table-column prop="" label="费用" ></el-table-column>
            <el-table-column prop="" label="已付金额" ></el-table-column>
            <el-table-column prop="" label="应付余款" ></el-table-column>
          </el-table-column>
          <el-table-column label="采购上装/改装">
            <el-table-column prop="" label="采购价" ></el-table-column>
            <el-table-column prop="" label="费用" ></el-table-column>
            <el-table-column prop="" label="已付金额" ></el-table-column>
            <el-table-column prop="" label="应付余款" ></el-table-column>
            <el-table-column prop="" label="供应商" ></el-table-column>
          </el-table-column>
          <el-table-column label="其他">
            <el-table-column prop="" label="合同号" ></el-table-column>
            <el-table-column prop="" label="合同数量" ></el-table-column>
            <el-table-column prop="" label="发票数量" ></el-table-column>
            <el-table-column prop="" label="供应商" ></el-table-column>
            <el-table-column prop="" label="签订日期" ></el-table-column>
            <el-table-column prop="" label="车辆名称" ></el-table-column>
            <el-table-column prop="" label="车辆类型" ></el-table-column>
          </el-table-column>
          <el-table-column label="财务">
            <el-table-column prop="" label="是否结算" ></el-table-column>
          </el-table-column>
        </el-table-column>
          
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="140">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="examine(scope.row)"
              v-if="scope.row.examine==0"
            >审核</el-button>
            <el-button type="text" size="small" style="color:red" v-else>已审核</el-button>
            <el-button @click="editBusiness(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="delBusiness(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage1"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import url from "../../api/api.js";
import { saveAs } from "file-saver";
import XLSX from "xlsx";
export default {
  inject: ["reload"],
  data() {
    return {
      page: 1, //页数
      limit: 10, //每页条数
      tableData: [],
      searchInfo: {
        start_time: "",
        end_time: "",
        keyword: ""
      },
      rangeDate: "",
      currentPage1: 1,
      total: 100,
      user_id: localStorage.getItem("user_id"),
      merchant_id: "1",
      exportList:[]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.1)"
      });
      let obj = {
        time: Math.floor(new Date().getTime() / 1000),
        merchant_id: this.merchant_id,
        user_id: this.user_id,
        token: this.postToken(),
        menu: "/businessList",
        page: this.page,
        limit: this.limit
      };
      let data = Object.assign(obj, this.searchInfo);
      await this.$axios.post(url.getBusinessList, data).then(res => {
        console.log(res.data.data);
        if (res.data.status == 1) {
          loading.close();
          this.total = res.data.count;
          this.exportList = res.data.data
          if (res.data.count != 0) {
            this.tableData = res.data.data;
          } else if (res.data.count == 0) {
            this.tableData = [];
            this.$message.error("未查询到相关内容");
          }
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    handleSizeChange(val) {
      this.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    //搜索
    search() {
      this.getList();
    },
    //修改订单
    editBusiness(row) {
      this.$router.push({
        path: "/editOrderList",
        query: {
          data: row.id
        }
      });
    },
    //点击销售订单号查询
    // searchSale(row) {
    //   this.$router.push({
    //     name: "SaleList",
    //     params: {
    //       sale_orderNo: row.sale_orderNo
    //     }
    //   });
    // },
    //添加采购订单号
    addPur(row) {},
    //删除业务
    delBusiness(row) {
      let data = {
        time: Math.floor(new Date().getTime() / 1000),
        merchant_id: this.merchant_id,
        user_id: this.user_id,
        token: this.postToken(),
        business_id: row.id
      };
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.post(url.delBusiness, data).then(res => {
            if (res.data.status == 1) {
              this.$message.success(res.data.msg);
              this.reload();
            }
          });
        })
        .catch(() => {
          return false;
        });
    },
    //审核业务
    examine(row) {
      let data = {
        time: Math.floor(new Date().getTime() / 1000),
        merchant_id: this.merchant_id,
        user_id: this.user_id,
        token: this.postToken(),
        examine: 1,
        business_id: row.id
      };
      this.$axios.post(url.clickExamine, data).then(res => {
        if (res.data.status == 1) {
          this.$message.success(res.data.msg);
        }
      });
    },
    //添加业务
    addOrder() {
      this.$router.push("/addBusList");
    },
    //生成token
    postToken() {
      let time = Math.floor(new Date().getTime() / 1000);
      let merchant_id = this.merchant_id;
      let user_id = this.user_id;
      var token = this.$md5(merchant_id + time + user_id);
      return token;
    },
    //获取列表Excel
    getExcelList(){
      let data={
        time: Math.floor(new Date().getTime() / 1000),
        merchant_id: this.merchant_id,
        user_id: this.user_id,
        token: this.postToken(),
      }
      // this.$axios.post(url.getList,data).then(res=>{
      //   this.exportList = res.data.data
      // })
      return this.exportList
    },
    //导出
    exportData() {
      this.getExcelList();
      import("@/vendor/Export2Excel").then(excel => {
        const multiHeader = [
          [
            "业务",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "销售订单",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "采购订单",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ]
        ];
        const multiHeader2 = [
          [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "销售",
            "",
            "",
            "",
            "",
            "其他",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "费用",
            "",
            "",
            "",
            "",
            "财务",
            "",
            "",
            "",
            "",
            "合格证",
            "",
            "采购底盘/整车",
            "",
            "",
            "",
            "",
            "",
            "采购上装/改装",
            "",
            "",
            "",
            "",
            "其他",
            "",
            "",
            "",
            "",
            "",
            "",
            "财务",
            "",
          ]
        ];
        const tHeader = [
          "业务序号",
          "业务状态",
          "签订日期",
          "业务员",
          "预计毛利",
          "实际毛利",
          "税费",
          "净利润",
          "金额",
          "订单序号",
          "订单名称",
          "",
          "应收总额",
          "已收金额",
          "应收余额",
          "应收垫款",
          "退款",
          "发票数量",
          "客户",
          "业务员",
          "合同号",
          "签订日期",
          "合同数量",
          "车辆类型",
          "车辆名称",
          "信息费",
          "送车费",
          "其他",
          "加油",
          "小计",
          "是否结算",
          "",
          "订单序号",
          "订单名称",
          "",
          "合格证费用",
          "已收金额",
          "采购价",
          "采购",
          "单价",
          "费用",
          "已付金额",
          "应付余款",
          "采购价",
          "费用",
          "已付金额",
          "应付余款",
          "供应商",
          "合同号",
          "合同数量",
          "发票数量",
          "供应商",
          "签订日期",
          "车辆名称",
          "车辆类型",
          "是否结算",
          ""
        ];
        const filterVal = [
          "id",
          "examine",
          "add_time",
          "salesman",
          "title",
          "note",
          "salesman",
          "d1villScore",
          "d1switchScore",
          "d1roamScore",
          "d1Score",
          "d1Dyfield1",
          "compName2",
          "e2Name",
          "d2eqScore",
          "d2dataScore",
          "d2villScore",
          "d2switchScore",
          "d2roamScore",
          "d2Score",
          "d2Dyfield1",
          "compName3",
          "e3Name",
          "d3eqScore",
          "d3dataScore",
          "d3villScore",
          "d3switchScore",
          "d3roamScore",
          "d3Score",
          "d3Dyfield1",
          "compName4",
          "e4Name",
          "d4eqScore",
          "d4dataScore",
          "d4villScore",
          "d4switchScore",
          "d4roamScore",
          "d4Score",
          "d4Dyfield1",
        ]; // 表头所对应的字段，这里未填写
        // const filterVal = this.headVal;
        // let list = [];
        // if (this.tableDataExcelType == 0) {
        //   list = this.tableDataExcel;
        // } else {
        //   list = this.tableDataExcelAll;
        // }
        let list = this.exportList;
        console.log(list)
        const data = this.formatJson(filterVal, list);
        
        //进行所有表头的单元格合并，建议一行一行来，不然容易整乱
        const merges = [
          "A1:I2",
          "J1:AF1",
          "AG1:BE1",
          "J2:L2",
          "M2:Q2",
          "R2:Y2",
          "Z2:AD2",
          "AE2:AF2",
          "AG2:AI2",
          "AJ2:AK2",
          "AL2:AQ2",
          "AR2:AV2",
          "AW2:BC2",
          "BD2:BE2",
          "BD3:BE3",
          "AH3:AI3",
          "AE3:AF3",
          "K3:L3",
        ];
        excel.export_json_to_excel({
          multiHeader,//这里是第一行的表头
          multiHeader2,//这里是第二行的表头
          header: tHeader,//这里应该是算第三行的表头
          data,
          filename: `${new Date().getMonth()+1}`+'月台账表',
          merges,
        });
        // this.downloadLoading = false

      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
  },
    watch: {
      rangeDate: function(newVal, oldVal) {
        if (newVal !== null) {
          this.searchInfo.start_time = newVal[0];
          this.searchInfo.end_time = newVal[1];
        } else {
          this.searchInfo.start_time = null;
          this.searchInfo.end_time = null;
        }
      }
    }
};
</script>
<style lang="scss" scoped>
.el-breadcrumb {
  line-height: 2;
}
.el-table__header tr,
        .el-table__header th {
            padding: 0;
            height: 30px;
            line-height: 30px;
        }
        .el-table__body tr,
        .el-table__body td {
            padding: 0;
            height: 30px;
            line-height: 30px;
        }
.title {
  background-color: #fff;
  line-height: 50px;
  text-indent: 20px;
  margin: 0;
  border-bottom: 1px solid #e9eef3;
  span {
    margin-right: 20px;
  }
}
.el-pagination {
  margin-top: 50px;
}
.card {
  height: 97%;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.keywords {
  width: 35%;
}
</style>
