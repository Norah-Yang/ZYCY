<template>
  <div style="height:100%">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/accountManage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>公告列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card">
      <p class="title">
        <span>公告列表</span>
        <el-button size="mini" @click="addOrder">添加新公告</el-button>
      </p>
      <!-- 列表 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        height="600"
        :row-style="{height:'20px'}"
        :cell-style="{padding:'0px'}"
      >
        <el-table-column label="">
          <template slot="header" slot-scope="scope">
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
              placeholder="客户名称/手机号"
              size="mini"
              v-model="searchInfo.keyword"
              class="keywords"
              @keyup.enter.native="search"
            >
              <el-button slot="append" @click="search">搜索</el-button>
            </el-input>
          </template>
          <el-table-column prop="id" label="公告ID" width="80px"></el-table-column>
          <el-table-column prop="title" label="公告标题" width="150px"></el-table-column>
          <el-table-column prop="amount" label="费用" width="100px"></el-table-column>
          <el-table-column prop="name" label="缴费者" width="130px"></el-table-column>
          <el-table-column prop="phone" label="手机号" width="150px"></el-table-column>
          <el-table-column prop="city" label="地址" width="160px"></el-table-column>
          <el-table-column prop="note" label="备注" min-width="140px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="add_time" label="添加时间" width="250px"></el-table-column>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="140">
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
import url from "@/api/api.js";
export default {
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
      user_id : localStorage.getItem("user_id"),
      merchant_id : "1",
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
        user_id:this.user_id,
        token: this.postToken(),
        page: this.page,
        limit: this.limit
      };
      let data = Object.assign(obj, this.searchInfo);
      await this.$axios.post(url.notice, data).then(res => {
        if (res.data.status == 1) {
          loading.close();
          this.total = res.data.count;
          if (this.total > 0) {
            this.tableData = res.data.data;
          } else if (this.total == 0) {
            this.tableData = [];
            this.$message.error("未查询到相关结果");
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
      //   console.log(row);
        //   this.$router.push({
        //     path: "/editCustomer",
        //     query: {
        //       customer_id: row.id
        //     }
        //   });
    },
    //删除业务
    delBusiness(row) {
        //   let data = {
        //     time: Math.floor(new Date().getTime() / 1000),
            // merchant_id: this.merchant_id,
            //   user_id:this.user_id,
        //     token: this.postToken(),
        //     customer_id: row.id
        //   };
        //   this.$confirm("确定删除吗？", "提示", {
        //     confirmButtonText: "确定",
        //     cancelButtonText: "取消",
        //     type: "warning"
        //   })
        //     .then(() => {
        //       this.$axios.post(url.delCustomer, data).then(res => {
        //         if (res.data.status == 1) {
        //           this.$message.success(res.data.msg);
        //           window.location.reload();
        //         }
        //       });
        //     })
        //     .catch(() => {
        //       return false;
        // });
    },
    //添加公告
    addOrder() {
      this.$router.push("/addNotice");
    },
    //生成token
    postToken() {
      let time = Math.floor(new Date().getTime() / 1000);
      let merchant_id = this.merchant_id;
      let user_id = this.user_id;
      let token = this.$md5(merchant_id + time + user_id);
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
  width: 35%;
}
</style>
