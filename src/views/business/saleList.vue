<template>
  <div style="height:100%;">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/accountManage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>销售订单</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card">
      <p class="title">
        <span>销售订单</span>
        <el-button size="mini" @click="addOrder">添加订单</el-button>
        <el-button size="mini" @click="goBack">返回</el-button>
      </p>
      <!-- 列表 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        height="600px"
        :row-style="{height:'20px'}"
        :cell-style="{padding:'0px'}"
      >
        <el-table-column label="销售订单列表">
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
            <el-input placeholder="请输入内容" size="mini" v-model="searchInfo.keyword" class="keywords"
              @keyup.enter.native="search">
              <el-button slot="append" @click="search">搜索</el-button>
            </el-input>
          </template>
          <el-table-column prop="id" label="订单id"></el-table-column>
          <el-table-column prop="order_no" label="订单号" width="180px"></el-table-column>
          <el-table-column prop="order_name" label="订单名称" width="200px"></el-table-column>
          <el-table-column prop="purchase" label="采购订单号" width="180px"></el-table-column>
          <el-table-column prop="customer" label="客户姓名" width="180px"></el-table-column>
          <el-table-column prop="supplier" label="供应商姓名" width="250px"></el-table-column>
          <el-table-column prop="salesman" label="业务员"></el-table-column>
          <el-table-column prop="contract_date" label="合同日期"></el-table-column>
          <el-table-column prop="contract_amount" label="合同金额"></el-table-column>
          <el-table-column prop="contract_no" label="合同编号" width="180px"></el-table-column>
          <el-table-column prop="deposit" label="定金"></el-table-column>
          <el-table-column prop="balance" label="尾款"></el-table-column>
          <!-- 1存在发票   0没有发票 -->
          <el-table-column prop="tax_state" label="发票">{{this.tableData.tax_state==1?'存在发票':'没有发票'}}</el-table-column>
          <el-table-column prop="tax_count" label="发票数量"></el-table-column>
          <el-table-column prop="mark" label="费用"></el-table-column>
          <el-table-column prop="note" label="备注" min-width="140px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="add_time" label="添加时间" width="180px"></el-table-column>
          <el-table-column prop="operator" label="操作人"></el-table-column>
          <!-- 1已确认 0未确认 -->
          <el-table-column prop="confirm" label="确认">{{this.tableData.confirm==1?'已确认':'未确认'}}</el-table-column>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100px">
          <template slot-scope="scope">
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
export default {
  inject:['reload'],
  data() {
    return {
      page: 1, //页数
      limit: 10, //每页条数
      tableData: [],
      currentPage1: 1,
      total: 100,
      rangeDate: "",
      searchInfo: {
        start_time: "",
        end_time: "",
        keyword: ""
      },
      user_id : localStorage.getItem("user_id"),
      merchant_id : "1",
    };
  },
  created() {
    let data = this.$route.params.sale_orderNo;
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
        user_id : this.user_id,
        token: this.postToken(),
        page: this.page,
        limit: this.limit
      };
      let data = Object.assign(obj, this.searchInfo);
      this.$axios.post(url.saleList, data).then(res => {
        if (res.data.status == 1) {
          loading.close();
          if (res.data.count != 0) {
            this.total = res.data.count;
            this.tableData = res.data.data;
          } else if (res.data.data.length == 0) {
            this.tableData = [];
            this.$message.error("未查询到相关内容");
          }
        }
      });
    },
    //搜索
    search() {
      this.getList();
    },
    //返回上一页
    goBack() {
      this.$router.go(-1);
    },
    editBusiness(row) {
      this.$router.push({
        path: "/editSaleList",
        query: {
          sale_id: row.id
        }
      });
    },
    //删除
    delBusiness(row) {
      let data = {
        time: Math.floor(new Date().getTime() / 1000),
        merchant_id: this.merchant_id,
        user_id : this.user_id,
        token: this.postToken(),
        sale_id: row.id
      };
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.post(url.delSale, data).then(res => {
            if (res.data.status == 1) {
              this.$message.success(res.data.msg);
               this.reload()
            }
          });
        })
        .catch(() => {
          return false;
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
    //添加订单
    addOrder() {
      this.$router.push("/addOrderList");
    },
    //生成token
    postToken() {
      let time = Math.floor(new Date().getTime() / 1000);
      let merchant_id = this.user_id;
      let user_id = this.user_id;
      var token = this.$md5(merchant_id + time + user_id);
      return token;
    }
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
  width: 20%;
}
</style>
