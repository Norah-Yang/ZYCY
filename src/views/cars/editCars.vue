<template>
    <div style="height:100%">
        <p class="title">
            <span>车辆入库信息修改</span>
            <el-button size="mini" @click="goBack">返回</el-button>
        </p>
        <el-form label-position="right" label-width="120px" :model="ruleForm" ref="ruleForm">
            <el-form-item label="车辆名称">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="车架号">
                <el-input v-model="ruleForm.frame"></el-input>
            </el-form-item>
            <el-form-item label="发动机号">
                <el-input v-model="ruleForm.engine"></el-input>
            </el-form-item>
            <el-form-item label="供应商ID">
                <el-input v-model="ruleForm.supplier_id"></el-input>
                <el-button
                    size="mini"
                    type="text"
                    style="margin-left:20px"
                    @click="getId(2)"
                >关联供应商id</el-button>
            </el-form-item>
            <el-form-item label="销售订单ID">
                <el-input v-model="ruleForm.sale_id"></el-input>
                <el-button
                    size="mini"
                    type="text"
                    style="margin-left:20px"
                    @click="getId(4)"
                >关联销售订单id</el-button>
            </el-form-item>
            <el-form-item label="采购订单ID">
                <el-input v-model="ruleForm.purchase_id"></el-input>
                <el-button
                    size="mini"
                    type="text"
                    style="margin-left:20px"
                    @click="getId(3)"
                >关联采购订单id</el-button>
            </el-form-item>
            <el-form-item label="存放点">
                <el-input v-model="ruleForm.storage"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="ruleForm.state" placeholder="请选择">
                    <el-option label="在库" :value="1"></el-option>
                    <el-option label="出库" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="入库者">
                <el-input v-model="ruleForm.warehousing"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="ruleForm.note" type="textarea" :rows="4" class="textarea"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary" @click="submit">提交</el-button>
            </el-form-item>
        </el-form>
         <!-- 供应商 -->
        <el-dialog title="" :visible.sync="supplier">
            <el-input placeholder="请输入内容" v-model="keyword" class="search" size="mini">
                <el-button slot="append" icon="el-icon-search" @click="search(2)"></el-button>
            </el-input>
            <el-table :data="supplierList">
                <el-table-column property="id" label="供应商id"></el-table-column>
                <el-table-column property="name" label="供应商姓名"></el-table-column>
                <el-table-column property="phone" label="手机号"></el-table-column>
                <el-table-column property="concat" label="联系人"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="mini"
                            @click="supplierBtn(scope.$index, scope.row)"
                        >选择</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange(2)"
                @current-change="handleCurrentChange(2)"
                :current-page="currentPage1"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </el-dialog>
        <!-- 采购订单 -->
        <el-dialog title="" :visible.sync="purchase">
            <el-input placeholder="请输入内容" v-model="keyword" class="search" size="mini">
                <el-button slot="append" icon="el-icon-search" @click="search(3)"></el-button>
            </el-input>
            <el-table :data="purchaseList">
                <el-table-column property="id" label="订单id" width="150"></el-table-column>
                <el-table-column property="order_name" label="订单名称" width="200"></el-table-column>
                <el-table-column property="customer" label="客户姓名"></el-table-column>
                <el-table-column property="supplier" label="供应商姓名"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="mini"
                            @click="purchaseBtn(scope.$index, scope.row)"
                        >选择</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange(3)"
                @current-change="handleCurrentChange(3)"
                :current-page="currentPage1"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </el-dialog>
        <!-- 销售订单 -->
        <el-dialog title="" :visible.sync="sales">
            <el-input placeholder="请输入内容" v-model="keyword" class="search" size="mini">
                <el-button slot="append" icon="el-icon-search" @click="search(1)"></el-button>
            </el-input>
            <el-table :data="salesList" height="300px">
                <el-table-column property="id" label="订单id"></el-table-column>
                <el-table-column property="order_no" label="订单号"></el-table-column>
                <el-table-column property="order_name" label="订单名称"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="mini"
                            @click="salesBtn(scope.$index, scope.row)"
                        >选择</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange(1)"
                @current-change="handleCurrentChange(1)"
                :current-page="currentPage1"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </el-dialog>
    </div>
</template>
<script>
import url from "@/api/api.js";
export default {
  data() {
    return {
      ruleForm: {},
      cart_id: "",
      supplier: false,
      supplierList: [],
      purchase: false,
      purchaseList: [],
      sales: false,
      salesList: [],
      total: 30,
      page: 1, //页数
      limit: 10, //每页条数
      currentPage1: 1,
      keyword: "",
      user_id : localStorage.getItem("user_id"),
      merchant_id : "1",
    };
  },
  created() {
    this.cart_id = this.$route.query.cart_id;
    this.getList();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getList() {
      let obj = {
        time: Math.floor(new Date().getTime() / 1000),
        merchant_id: this.merchant_id,
        user_id : this.user_id,
        token: this.postToken(),
        cart_id: this.cart_id
      };
      this.$axios.post(url.cartInfo, obj).then(res => {
        if (res.data.status == 1) {
          this.ruleForm = res.data.data;
          delete this.ruleForm.id
        }
      });
    },
    getId(e) {
      let data = {
        time: Math.floor(new Date().getTime() / 1000),
        merchant_id: this.merchant_id,
        user_id : this.user_id,
        token: this.postToken(),
        page: this.page,
        limit: this.limit,
        keyword: this.keyword
      };
      if (e == 2) {
        //关联供应商
        this.supplier = true;
        this.$axios.post(url.getSupplier, data).then(res => {
          if (res.data.status == 1) {
            this.supplierList = res.data.data;
            this.total = res.data.count;
          }
        });
      } else if (e == 3) {
        //关联采购订单
        this.purchase = true;
        this.$axios.post(url.getPurchase, data).then(res => {
          if (res.data.status == 1) {
            this.purchaseList = res.data.data;
            this.total = res.data.count;
          }
        });
      } else if (e == 4) {
        //关联销售
         this.sales = true;
        this.$axios.post(url.getSale, data).then(res => {
          if (res.data.status == 1) {
            this.salesList = res.data.data;
            this.total = res.data.count;
          }
        });
      }
    },
    supplierBtn(index, row) {
      this.ruleForm.supplier_id = row.id;
      this.supplier = false;
    },
    purchaseBtn(index, row) {
      this.ruleForm.purchase_id = row.id;
      this.purchase = false;
    },
    salesBtn(index, row) {
      this.ruleForm.sale_id = row.id;
      this.sales = false;
    },
    //提交修改
    submit() {
      let obj = {
        time: Math.floor(new Date().getTime() / 1000),
        merchant_id: this.merchant_id,
        user_id : this.user_id,
        token: this.postToken(),
        cart_id: this.cart_id,
      };
      let data = Object.assign(obj, this.ruleForm);
      this.$axios.post(url.editCart, data).then(res => {
        if (res.data.status == 1) {
          this.$message.success(res.data.msg);
        }
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
.el-form {
  background-color: #fff;
  padding: 30px 0;
  margin-bottom: 20px;
  .el-input {
    width: 40%;
    height: 30px;
  }
  .textarea {
    width: 80%;
  }
}
.el-table--fit {
  height: 300px;
}
.el-form-item {
  margin-bottom: 5px;
}
.search {
  width: 400px;
}
.el-form-item {
  margin-bottom: 5px;
}
</style>
<style lang="scss">
.el-textarea__inner {
  width: 50%;
}
.el-input__inner {
  height: 25px;
}
</style>
