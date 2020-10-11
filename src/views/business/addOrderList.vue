<template>
    <div style="height:100%">
        <p class="title">
            <span>添加销售订单</span>
            <el-button size="mini" @click="goBack">返回</el-button>
        </p>
        <el-form
            label-position="right"
            :rules="roles"
            label-width="120px"
            ref="ruleForm"
            :model="ruleForm"
        >
            <el-form-item label="应收总额" prop="total_receivables">
                <el-input v-model="ruleForm.total_receivables"></el-input>
            </el-form-item>
            <el-form-item label="已收总额" prop="amount_received">
                <el-input v-model="ruleForm.amount_received"></el-input>
            </el-form-item>
            <el-form-item label="应收余额" prop="balance_receivables">
                <el-input v-model="ruleForm.balance_receivables"></el-input>
            </el-form-item>
            <el-form-item label="应收垫款" prop="advances_receivables">
                <el-input v-model="ruleForm.advances_receivables"></el-input>
            </el-form-item>
            <el-form-item label="业务id" prop>
                <el-input v-model="ruleForm.business_id"></el-input>
                <el-button
                    size="mini"
                    type="text"
                    style="margin-left:20px"
                    @click="getId(4)"
                >关联业务id</el-button>
            </el-form-item>
            <el-form-item label="订单名称" prop>
                <el-input v-model="ruleForm.order_name"></el-input>
            </el-form-item>
            <el-form-item label="业务员名称" prop>
                <el-input v-model="ruleForm.salesman"></el-input>
            </el-form-item>
            <el-form-item label="客户id" prop>
                <el-input v-model="ruleForm.customer_id"></el-input>
                <el-button size="mini" type="text" style="margin-left:20px" @click="getId(1)">关联客户id</el-button>
            </el-form-item>
            <el-form-item label="供应商id" prop>
                <el-input v-model="ruleForm.supplier_id"></el-input>
                <el-button
                    size="mini"
                    type="text"
                    style="margin-left:20px"
                    @click="getId(2)"
                >关联供应商id</el-button>
            </el-form-item>
            <el-form-item label="关联采购订单id" prop>
                <el-input v-model="ruleForm.purchase_id"></el-input>
                <el-button size="mini" type="text" style="margin-left:20px" @click="getId(3)">关联采购订单id</el-button>
            </el-form-item>
            <el-form-item label="是否开票" prop>
                <el-select v-model="ruleForm.tax_state" placeholder="请选择">
                    <el-option label="开发票" value="1"></el-option>
                    <el-option label="不开发票" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" prop>
                <el-input  type="textarea" :rows="4"  placeholder="请输入内容" v-model="ruleForm.note" class="textarea"></el-input>
            </el-form-item>
            <el-form-item label="是否确认" prop>
                <el-select v-model="ruleForm.confirm" placeholder="请选择">
                    <el-option label="确认" value="1"></el-option>
                    <el-option label="未确认" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="定金" prop>
                <el-input v-model="ruleForm.deposit"></el-input>
            </el-form-item>
            <el-form-item label="尾款" prop>
                <el-input v-model="ruleForm.balance"></el-input>
            </el-form-item>
            <el-form-item label="合同金额" prop>
                <el-input v-model="ruleForm.amount"></el-input>
            </el-form-item>
            <el-form-item label="合同日期" prop>
                <el-date-picker
                    v-model="ruleForm.date"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" size="small" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')" size="small">重置</el-button>
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
        <!-- 客户 -->
        <el-dialog title="" :visible.sync="salesman">
            <el-input placeholder="请输入内容" v-model="keyword" class="search" size="mini">
                <el-button slot="append" icon="el-icon-search" @click="search(1)"></el-button>
            </el-input>
            <el-table :data="salesmanList">
                <el-table-column property="id" label="客户id"></el-table-column>
                <el-table-column property="name" label="客户姓名"></el-table-column>
                <el-table-column property="phone" label="手机号"></el-table-column>
                <el-table-column property="city" label="城市"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="mini"
                            @click="salesmanBtn(scope.$index, scope.row)"
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
        <!-- 业务id -->
        <el-dialog title="" :visible.sync="business">
            <el-input placeholder="请输入内容" v-model="keyword" class="search" size="mini">
                <el-button slot="append" icon="el-icon-search" @click="search(4)"></el-button>
            </el-input>
            <el-table :data="businessList">
                <el-table-column property="id" label="业务id" width="150"></el-table-column>
                <el-table-column property="title" label="车辆名称" width="200"></el-table-column>
                <el-table-column property="name" label="客户姓名"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="mini"
                            @click="businessBtn(scope.$index, scope.row)"
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
    </div>
</template>
<script>
import url from "../../api/api.js";
export default {
  data() {
    return {
      ruleForm: {
        total_receivables: "",
        amount_received: "",
        balance_receivables: "",
        advances_receivables: "",
        business_id: "",
        order_name: "",
        salesman: "",
        customer_id: "",
        supplier_id: "",
        purchase_id: "",
        tax_state: "",
        note: "",
        confirm: "",
        deposit: "",
        balance: "",
        amount: "",
        date: ""

        // sale_id:'',
        // purchase_id:''
      },
      roles: {
        total_receivables: [{ required: false, message: " " }],
        amount_received: [{ required: false, message: " " }],
        balance_receivables: [{ required: true, message: " " }],
        advances_receivables: [{ required: true, message: " " }]
      },
      supplier: false,
      supplierList: [],
      salesman: false,
      salesmanList: [],
      purchase: false,
      purchaseList: [],
      business: false,
      businessList: [],
      total: 30,
      page: 1, //页数
      limit: 10, //每页条数
      currentPage1: 1,
      keyword: "",
      user_id : localStorage.getItem("user_id"),
      merchant_id : 1,
    };
  },
  created() {
    if (this.$route.params.data != undefined) {
      let addOrderList = this.$route.params.data;
      window.sessionStorage.setItem(
        "addOrderList",
        JSON.stringify(addOrderList)
      );
      this.ruleForm = this.$route.params.data;
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    //提交
    submitForm(formName) {
      let obj = {
        time: Math.floor(new Date().getTime() / 1000),
        merchant_id: this.merchant_id,
        user_id : this.user_id,
        token: this.postToken(),
      };
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = Object.assign(obj, this.ruleForm);
          this.$axios.post(url.addSale, data).then(res => {
              if(res.data.status==1){
                  console.log(res.data);
                  this.$message.success(res.data.msg);
                  this.$router.push('/sale/index')
              }else{
                  this.$message.error('添加失败');
              }
          });
        } else {
          return false;
        }
      });
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //生成token
    postToken() {
      let time = Math.floor(new Date().getTime() / 1000);
      let merchant_id = this.merchant_id;
      let user_id = this.user_id;
      var token = this.$md5(merchant_id + time + user_id);
      return token;
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
      if (e == 1) {
        //关联客户id
        this.salesman = true;
        this.$axios.post(url.getSalesman, data).then(res => {
          if (res.data.status == 1) {
            this.salesmanList = res.data.data;
            this.total = res.data.count;
          }
        });
      } else if (e == 2) {
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
      }else if(e==4){
        //关联业务
          this.business = true;
        this.$axios.post(url.getBusiness, data).then(res => {
          if (res.data.status == 1) {
            this.businessList = res.data.data;
            this.total = res.data.count;
          }
        });
      }
    },
    salesmanBtn(index, row) {
      this.ruleForm.customer_id = row.id;
      this.salesman = false;
    },
    supplierBtn(index, row) {
      this.ruleForm.supplier_id = row.id;
      this.supplier = false;
    },
    purchaseBtn(index, row) {
      this.ruleForm.purchase_id = row.id;
      this.purchase = false;
    },
    businessBtn(index, row) {
      this.ruleForm.business_id = row.id;
      this.business = false;
    },
    search(e) {
      this.getId(e);
    },
    handleSizeChange(e) {
      this.getId(e);
    },
    handleCurrentChange(e) {
      this.getId(e);
    },
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
  .textarea{
      width: 80%;
  }
}
.el-form-item {
  margin-bottom: 5px;
}
.el-table--fit {
  height: 300px;
}
.search {
  width: 400px;
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
