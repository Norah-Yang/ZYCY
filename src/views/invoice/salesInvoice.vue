<template>
  <div style="height:100%">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/accountManage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>销售发票</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <p class="title">
        <span>销售发票</span>
        <el-button size="mini" @click="addOrder">添加发票</el-button>
        <!-- @click="addOrder"-->
      </p>
      <!-- 列表 -->
      <el-table :data="tableData" style="width: 100%"
        height="600">
        <el-table-column label>
          <template slot="header">
            搜索：
            <el-date-picker
              v-model="rangeDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="mini"
              value-format="yyyy-MM-dd"
            ></el-date-picker>关键字：
            <el-input placeholder="订单号" size="mini" v-model="keyword" class="keywords">
              <el-button slot="append" @click="search">搜索</el-button>
            </el-input>
          </template>
          <el-table-column prop="id" label="ID" width="80px" align="center"></el-table-column>
          <el-table-column prop="cate" label="分类" width="100px" align="center"></el-table-column>
          <el-table-column prop="type" label="类型" width="100px" align="center"></el-table-column>
          <el-table-column prop="name" label="发票名称" width="150px" align="center"></el-table-column>
          <el-table-column prop="taxpayer" label="纳说人识别号" width="150px" align="center"></el-table-column>
          <el-table-column prop="bank" label="开户行" width="150px" align="center"></el-table-column>
          <el-table-column prop="account" label="账号" width="150px" align="center"></el-table-column>
          <el-table-column prop="add_time" label="添加时间" width="160px" align="center"></el-table-column>
          <el-table-column prop="operator" label="操作人" width="100px" align="center"></el-table-column>
          <el-table-column prop="amount" label="发票金额" width="100px" align="center"></el-table-column>
          <el-table-column prop="note" label="备注" width="180px" align="center"></el-table-column>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200" align="center">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="small" @click="editInvoice(scope.row)">详情</el-button> -->
            <el-button type="text" size="small" @click="detailsInvoice(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="delInvoice(scope.row)">删除</el-button>
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
    </el-card>
    <!-- 修改 -->
    <el-dialog title="修改发票信息" :visible="dialogTableVisible" :show-close="false">
      <el-form :model="gridData">
        <el-form-item label="分类：" label-width="110px">
          <!-- <el-input v-model="gridData.cate"></el-input> -->
          <el-select v-model="gridData.cate" placeholder="请选择">
            <el-option
              v-for="item in kind"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发票类型：" label-width="110px">
          <!-- <el-input v-model="gridData.type"></el-input> -->
          <el-select v-model="gridData.type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发票名称：" label-width="110px">
          <el-input v-model="gridData.name"></el-input>
        </el-form-item>
        <el-form-item label="纳税人识别号：" label-width="110px">
          <el-input v-model="gridData.taxpayer"></el-input>
        </el-form-item>
        <el-form-item label="开户行：" label-width="110px">
          <el-input v-model="gridData.bank"></el-input>
        </el-form-item>
        <el-form-item label="账号：" label-width="110px">
          <el-input v-model="gridData.account"></el-input>
        </el-form-item>
        <el-form-item label="发票金额：" label-width="110px">
          <el-input v-model="gridData.amount"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="110px">
          <el-input v-model="gridData.note" type="textarea" :rows="4" class="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="gridClose">取 消</el-button>
        <el-button type="primary" @click="gridCancel">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import url from "../../api/api.js";
export default {
  data() {
    return {
      page: 1, //页数
      limit: 10, //每页条数
      tableData: [],
      keyword: "",
      searchInfo: {
        start_time: "",
        end_time: "",
      },
      rangeDate: "",
      currentPage1: 1,
      total: 100,
      dialogTableVisible: false, //发票详情页是否显示
      gridData: {}, //发票详情
      options: [
        { value: 1, label: "专业发票" },
        { value: 2, label: "电子发票" },
        { value: 3, label: "机动车统一销售发票" },
      ],
      kind: [
        { value: 1, label: "销售" },
        { value: 2, label: "采购" },
      ],
      tax_id: "", //发票id
      merchant_id: "1",
      user_id: localStorage.getItem("user_id"),
      sale_sum:0,
      purchase_id:0,
    };
  },
  // 页面加载
  created() {
    this.listInvoice();
    // this.getType()
  },
  methods: {
    //   获取发票列表 invoiceList
    listInvoice() {
      // console.log(this.rangeDate);
      let data = {
        time: Math.floor(new Date().getTime() / 1000),
        token: this.postToken(),
        merchant_id: this.merchant_id,
        user_id: this.user_id,
        page: this.page,
        limit: this.limit,
        keyword: this.keyword,
      };
      this.$axios.post(url.invoiceList, data).then((res) => {
        if (res.data.status == 1) {
          this.total = res.data.count;
          this.tableData = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 点击搜索按钮
    search() {
      let data = {
        time: Math.floor(new Date().getTime() / 1000),
        token: this.postToken(),
        merchant_id: this.merchant_id,
        user_id: this.user_id,
        page: this.page,
        limit: this.limit,
        keyword: this.keyword,
      };
      let obj = Object.assign(data, this.searchInfo);
      this.$axios.post(url.invoiceList, data).then((res) => {
        if (res.data.status == 1) {
          this.total = res.data.count;
          this.tableData = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 添加发票
    addOrder() {
      if(this.sale_sum > this.purchase_sum){
        this.$router.push({
          path: "/addInvoice",
          query: {
            //   type: 1,
          },
        });
      }else{
        this.$confirm('当前进项大于销项，是否继续添加发票？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal	:false,
        }).then(() => {
          this.$router.push({
            path: "/addInvoice",
            query: {
              //   type: 1,
            },
          });
        });
      }
    },
    // 点击修改
    detailsInvoice(row) {
      this.$router.push({
        path: "/editinvoice",
        query: {
          tax_id: row.id,
        },
      });
    },
    // 修改点击确定
    gridCancel() {
      let data = {
        time: Math.floor(new Date().getTime() / 1000),
        token: this.postToken(),
        merchant_id: this.shoopId,
      };
      let gridData = {
        tax_id: this.gridData.id,
        type: this.gridData.type,
        name: this.gridData.name,
        taxpayer: this.gridData.taxpayer,
        bank: this.gridData.bank,
        account: this.gridData.account,
        cate: this.gridData.cate,
        note: this.gridData.note,
        sale_id: this.gridData.sale_id,
        purchase_id: this.gridData.purchase_id,
        user_id: localStorage.getItem("user_id"),
        amount: this.gridData.amount,
      };
      let obj = Object.assign(data, gridData);
      this.$axios.post(url.modifyInvoice, obj).then((res) => {
        if (res.data.status == 1) {
          this.dialogTableVisible = false;
          this.gridData = {};
          this.listInvoice();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //修改点击取消
    gridClose() {
      this.dialogTableVisible = false;
      this.gridData = {};
    },
    // 点击删除
    delInvoice(row) {
      let data = {
        time: Math.floor(new Date().getTime() / 1000),
        merchant_id: this.merchant_id,
        user_id: this.user_id,
        token: this.postToken(),
        tax_id: row.id,
      };
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios.post(url.deleteInvcice, data).then((res) => {
            if (res.data.status == 1) {
              this.$message.success(res.data.msg);
              this.listInvoice();
            }
          });
        })
        .catch(() => {
          return false;
        });
    },
    // 分页
    handleSizeChange(val) {
      this.limit = val;
      this.listInvoice();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.listInvoice();
    },
    //生成token
    postToken() {
      let time = Math.floor(new Date().getTime() / 1000);
      let merchant_id = this.merchant_id;
      let user_id = this.user_id;
      var token = this.$md5(merchant_id + time + user_id);
      return token;
    },
  },
  watch: {
    rangeDate: function (newVal, oldVal) {
      if (newVal !== null) {
        this.searchInfo.start_time = newVal[0];
        this.searchInfo.end_time = newVal[1];
      } else {
        this.searchInfo.start_time = null;
        this.searchInfo.end_time = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  line-height: 2;
}

.el-form {
  .el-input {
    width: 50%;
  }
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
.el-table {
  text-align: center;
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
