<template>
  <div style="height:100%">
    <p class="title">
      <span>添加业务</span>
      <el-button size="mini" @click="goBack">返回</el-button>
    </p>
    <el-form
      label-position="right"
      :rules="roles"
      label-width="120px"
      ref="ruleForm"
      :model="ruleForm"
    >
      <el-form-item label="客户名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="车辆名称" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="金额" prop="amount">
        <el-input v-model="ruleForm.amount"></el-input>
      </el-form-item>
      <el-form-item label="是否开票" prop="tax_state">
        <el-select v-model="ruleForm.tax_state" placeholder="--请选择--">
          <el-option label="已开票" value="1"></el-option>
          <el-option label="未开票" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="合同状态" prop="contract_state">
        <el-select v-model="ruleForm.contract_state" placeholder="--请选择--">
          <el-option label="有" value="1"></el-option>
          <el-option label="无" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公告状态" prop="notice_state">
        <el-select v-model="ruleForm.notice_state" placeholder="--请选择--">
          <el-option label="有" value="1"></el-option>
          <el-option label="无" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预警日期" prop="tax_date" v-if="ruleForm.tax_state==1">
        <el-date-picker
          v-model="ruleForm.tax_date"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="备注" prop>
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="ruleForm.note"
          class="textarea"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="销售订单id" prop>
                <el-input v-model="ruleForm.sale_id"></el-input>
                <el-button size="mini" type="text" style="margin-left:20px" @click="getId(2)">关联销售订单id</el-button>
            </el-form-item>
            <el-form-item label="采购订单id" prop>
                <el-input v-model="ruleForm.purchase_id"></el-input>
                <el-button size="mini" type="text" style="margin-left:20px" @click="getId(3)">关联采购订单id</el-button>
      </el-form-item>-->
      <el-form-item label="">
        <el-button type="primary" size="small" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')" size="small">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 销售订单 -->
    <!-- <el-dialog title="" :visible.sync="salesman">
            <el-input placeholder="请输入内容" v-model="keyword" class="search" size="mini">
                <el-button slot="append" icon="el-icon-search" @click="search(1)"></el-button>
            </el-input>
            <el-table :data="salesmanList" height="300px">
                <el-table-column property="id" label="订单id"></el-table-column>
                <el-table-column property="order_no" label="订单号"></el-table-column>
                <el-table-column property="order_name" label="订单名称"></el-table-column>
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
    </el-dialog>-->
    <!-- 业务id -->
    <!-- <el-dialog title="" :visible.sync="purchase">
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
    </el-dialog>-->
  </div>
</template>
<script>
import url from "../../api/api.js";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        title: "",
        amount: "",
        tax_state: "",
        note: "",
        tax_date:'',
        notice_state:'',
        contract_state:'',
        // sale_id:'',
        // purchase_id:'',
      },
      roles: {},
      salesman: false,
      salesmanList: [],
      purchase: false,
      purchaseList: [],
      total: 30,
      page: 1, //页数
      limit: 10, //每页条数
      currentPage1: 1,
      keyword: "",
      user_id: localStorage.getItem("user_id"),
      merchant_id: "1"
    };
  },
  created() {
    // if (this.$route.params.data != undefined) {
    //   let addOrderList = this.$route.params.data;
    //   window.sessionStorage.setItem(
    //     "addOrderList",
    //     JSON.stringify(addOrderList)
    //   );
    //   this.ruleForm = this.$route.params.data;
    // }
    //   console.log(data);
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
        user_id: this.user_id,
        token: this.postToken()
      };
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = Object.assign(obj, this.ruleForm);
          this.$axios.post(url.addSale, data).then(res => {
            if (res.data.status == 1) {
              this.$message.success(res.data.msg);
              this.$router.push("/sale/index");
            } else {
              this.$message.error("添加失败");
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
        user_id: this.user_id,
        token: this.postToken(),
        page: this.page,
        limit: this.limit,
        keyword: this.keyword
      };
      if (e == 2) {
        //销售订单
        this.salesman = true;
        this.$axios.post(url.getSale, data).then(res => {
          if (res.data.status == 1) {
            this.salesmanList = res.data.data;
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
      }
    },
    salesmanBtn(index, row) {
      this.ruleForm.sale_id = row.id;
      this.salesman = false;
    },
    purchaseBtn(index, row) {
      this.ruleForm.purchase_id = row.id;
      this.purchase = false;
    },
    search(e) {
      this.getId(e);
    },
    handleSizeChange(e) {
      this.getId(e);
    },
    handleCurrentChange(e) {
      this.getId(e);
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
