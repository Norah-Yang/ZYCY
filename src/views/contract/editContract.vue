<template>
  <div style="height:100%">
    <p class="title">
      <span>合同修改</span>
      <el-button size="mini" @click="goBack">返回</el-button>
    </p>
    <el-form label-position="right" label-width="120px" :model="ruleForm" ref="ruleForm">
      <el-form-item label="合同类型">
        <el-input v-model="type1" readonly></el-input>
      </el-form-item>
      <el-form-item label="合同ID">
        <el-input v-model="ruleForm.id" readonly></el-input>
      </el-form-item>
      <el-form-item label="合同名称">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="合同编号">
        <el-input v-model="ruleForm.contract_no"></el-input>
      </el-form-item>
      <el-form-item label="销售订单ID" v-if="type==1">
        <el-input v-model="sale_id"></el-input>
        <el-button size="mini" type="text" style="margin-left:20px" @click="getId(1)">关联销售订单id</el-button>
      </el-form-item>
      <el-form-item label="采购订单ID" v-if="type==2">
        <el-input v-model="purchase_id"></el-input>
        <el-button size="mini" type="text" style="margin-left:20px" @click="getId(2)">关联采购订单id</el-button>
      </el-form-item>
      <el-form-item label="合同金额">
        <el-input v-model="ruleForm.amount"></el-input>
      </el-form-item>
      <el-form-item label="合同日期">
        <el-input v-model="ruleForm.date"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="ruleForm.note" type="textarea" :rows="4" class="textarea"></el-input>
      </el-form-item>
      <el-form-item label="上传凭证">
        <el-upload
          class="upload-demo"
          :action="action"
          :file-list="fileList"
          list-type="picture"
          name="img[]"
          multiple
          :on-success="uploadSuccess"
          :on-remove="uploadRemove"
        >
          <el-button size="mini" type="text">点击上传</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
    <!-- 销售订单 -->
    <el-dialog title="" :visible.sync="salesman">
      <el-input placeholder="请输入内容" v-model="keyword" class="search" size="mini">
        <el-button slot="append" icon="el-icon-search" @click="search(1)"></el-button>
      </el-input>
      <el-table :data="salesmanList" height="300px">
        <el-table-column property="id" label="订单id"></el-table-column>
        <el-table-column property="order_no" label="订单号"></el-table-column>
        <el-table-column property="order_name" label="订单名称"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="salesmanBtn(scope.$index, scope.row)">选择</el-button>
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
    <!-- 采购id -->
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
            <el-button type="text" size="mini" @click="purchaseBtn(scope.$index, scope.row)">选择</el-button>
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
import url from "@/api/api.js";
export default {
  data() {
    return {
      ruleForm: {},
      sale_id: "",
      purchase_id: "",
      type: "",
      type1: "",
      contract_id: "",
      fileList: [],
      action: url.upload,
      img: [],
      salesman: false,
      salesmanList: [],
      purchase: false,
      purchaseList: [],
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
    let type = this.$route.query.type;
    this.contract_id = this.$route.query.contract_id;
    if (type == 1) {
      this.type = 1;
      this.type1 = "销售";
    } else if (type == 2) {
      this.type = 2;
      this.type1 = "采购";
    }
    this.getInfo();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    //加载页面时获取当前合同信息
    getInfo() {
      let data = {
        time: Math.floor(new Date().getTime() / 1000),
        merchant_id: this.merchant_id,
        user_id : this.user_id,
        token: this.postToken(),
        type: this.type,
        contract_id: this.contract_id
      };
      this.$axios.post(url.contractInfo, data).then(res => {
        console.log(res)
        this.fileList = res.data.data.pics;
        // delete res.data.data.pics;
        this.ruleForm = res.data.data;
      });
    },
    //提交修改
    submit() {
      let obj;
      if (this.type == 1) {
        obj = {
          time: Math.floor(new Date().getTime() / 1000),
          merchant_id: this.merchant_id,
          user_id : this.user_id,
          token: this.postToken(),
          type: this.type,
          sale_id: this.sale_id,
          contract_id: this.contract_id,
          img: this.img
        };
        let data = Object.assign(this.ruleForm, obj);
        this.$axios
          .post(url.editContract, data)
          .then(res => {
            console.log(res.data);
            if (res.data.status == 1) {
              this.$message.success(res.data.msg);
              this.$router.push("salecontract/index");
            }
          })
          .catch(req => {
            this.$message.error("提交失败");
          });
      } else if (this.type == 2) {
        obj = {
          time: Math.floor(new Date().getTime() / 1000),
          merchant_id: this.merchant_id,
          user_id : this.user_id,
          token: this.postToken(),
          type: 2,
          purchase_id: this.purchase_id,
          contract_id: this.contract_id
        };
        let data = Object.assign(this.ruleForm, obj);
        this.$axios
          .post(url.editContract, data)
          .then(res => {
            if (res.data.status == 1) {
              this.$message.success(res.data.msg);
              this.$router.push("purchaseContract");
            }
          })
          .catch(this.$message.error("提交失败") );
      }
    },
    //图片上传成功时
    uploadSuccess(response, file, fileList) {
      this.img.push(response.data);
    },
    //图片移除时
    uploadRemove(file, fileList) {
      this.img = fileList;
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
        //销售订单
        this.salesman = true;
        this.$axios.post(url.getSale, data).then(res => {
          if (res.data.status == 1) {
            this.salesmanList = res.data.data;
            this.total = res.data.count;
          }
        });
      } else if (e == 2) {
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
      this.sale_id = row.id;
      this.salesman = false;
    },
    purchaseBtn(index, row) {
      this.purchase_id = row.id;
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
.imgBox {
  display: flex;
}
.upload-demo {
  width: 40%;
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
