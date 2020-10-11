<template>
  <div style="height:100%">
    <p class="title">
      <span>添加发票</span>
      <el-button size="mini" @click="goBack">返回</el-button>
      <!-- @click="goBack"-->
    </p>
    <el-form label-position="right" label-width="120px" :model="ruleForm" ref="ruleForm">
      <el-form-item label="分类">
        <el-select v-model="cate" placeholder="请选择" @change="changeKind">
          <el-option v-for="item in kind" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单号">
        <!-- <el-input v-model="" placeholder="请选择订单"></el-input> -->
        <el-button size="mini" @click="orderNo" :disabled="saledisable">{{input_id}}</el-button>
        <el-button size="mini" @click="orderNo" :disabled="purdisable">{{purchase_order}}</el-button>
      </el-form-item>
      <el-form-item label="发票类型">
        <el-select v-model="type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发票名称">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="ruleForm.date"
          value-format="timestamp"
          format="yyyy 年 MM 月 dd 日"
          type="date"
          placeholder="请选择时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="纳税人识别号">
        <el-input v-model="ruleForm.taxpayer"></el-input>
      </el-form-item>
      <el-form-item label="开户行">
        <el-input v-model="ruleForm.bank"></el-input>
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="ruleForm.account"></el-input>
      </el-form-item>
      <el-form-item label="发票金额">
        <el-input v-model="ruleForm.money"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="ruleForm.note" type="textarea" :rows="4" class="textarea"></el-input>
      </el-form-item>
      <el-form-item label="上传图片">
        <el-upload
          class="upload-demo"
          :action="action"
          :file-list="fileList"
          list-type="picture"
          name="img[]"
          multiple
          :limit="10"
          :on-success="uploadSuccess"
          :on-remove="uploadRemove"
        >
          <el-button size="mini" type="text">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
    <!-- 订单列表 -->
    <el-dialog title="订单列表" :visible.sync="dialogFormVisible " :show-close="false">
      <el-card>
        <div>
          关键字：
          <el-input placeholder="订单名称/供应商名称" size="mini" v-model="keyword" class="keywords">
            <el-button slot="append" @click="search">搜索</el-button>
          </el-input>
        </div>
      </el-card>
      <el-table :data="orderData" style="width: 100%;height:90%;" v-if="cate == 1">
        <el-table-column prop="id" label="订单id" width="80" align="center"></el-table-column>
        <el-table-column prop="order_name" label="订单名称" width="180" align="center"></el-table-column>
        <el-table-column prop="order_no" label="订单号" align="center"></el-table-column>
        <el-table-column label="操作" width="140" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="chooseOrder(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="orderData" style="width: 100%;height:90%;" v-if="cate == 2">
        <el-table-column prop="id" label="订单id" width="80" align="center"></el-table-column>
        <el-table-column prop="order_name" label="订单名称" width="180" align="center"></el-table-column>
        <el-table-column prop="customer" label="客户姓名" align="center"></el-table-column>
        <el-table-column prop="supplier" label="供应商名称" align="center"></el-table-column>
        <el-table-column label="操作" width="140" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="chooseOrder(scope.row)">选择</el-button>
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="orderCancel">取 消</el-button>
        <!-- <el-button type="primary">确 定</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import url from "../../api/api.js";
export default {
  data() {
    return {
      currentPage1: 1,
      total: 100,
      ruleForm: {
        name: "",
        taxpayer: "",
        date: "",
        bank: "",
        account: "",
        money: "",
        note: "",
      },
      searchInfo: {
        start_time: "",
        end_time: "",
      },
      rangeDate: "",
      input_id: "销售订单", //采购or销售订单号
      purchase_order: "采购订单",
      kind: [
        { value: 1, label: "销售" },
        { value: 2, label: "采购" },
      ],
      cate: 1, //分类
      options: [
        { value: 1, label: "专业发票" },
        { value: 2, label: "电子发票" },
        { value: 3, label: "机动车统一销售发票" },
      ],
      type: "", //发票类型
      merchant_id: "001", //商户id
      token: "",
      page: 1, //页数
      limit: 10, //每页条数
      dialogFormVisible: false, //订单是否显示
      orderData: [], //订单列表
      keyword: "",
      purdisable: true, //采购订单按钮禁用
      saledisable: false, //销售订单按钮禁用
      merchant_id:"1",
      user_id:localStorage.getItem("user_id"),
      invoice_id:0,
      action: url.upload,
      img: [],
      fileList: [],
    };
  },
  created() {
    this.orderList();
    this.invoice_id = this.$route.query.invoice_id;
  },
  methods: {
    //图片上传成功时
    uploadSuccess(res) {
      // this.img = res.data;
      this.img.push(res.data);
    },
    //图片移除时
    uploadRemove(file, fileList) {
      this.img = fileList;
    },
    //   点击返回按钮
    goBack() {
      this.$router.back(-1);
    },
    changeKind: function () {
      if (this.cate == 1) {
        this.saledisable = false;
        this.purdisable = true;
        this.purchase_order = "采购订单";
      }
      if (this.cate == 2) {
        this.purdisable = false;
        this.saledisable = true;
        this.input_id = "销售订单";
      }
      this.orderList();
    },
    // 获取订单列表
    orderList() {
      // 销售订单
      if (this.cate == 1) {
        let time = Math.floor(new Date().getTime() / 1000);
        let token = this.postToken(this.merchant_id, time);
        let data = {
          time: time,
          token: token,
          merchant_id: this.merchant_id,
          user_id: this.user_id,
          page: this.page,
          limit: this.limit,
          keyword: this.keyword,
        };
        this.$axios.post(url.getPurchaseNoTax , data).then((res) => {
          if (res.data.status == 1) {
            this.total = res.data.count;
            this.orderData = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        });
      }
      //   采购订单
      if (this.cate == 2) {
        let time = Math.floor(new Date().getTime() / 1000);
        let token = this.postToken(this.merchant_id, time);
        let data = {
          time: time,
          token: token,
          merchant_id: this.merchant_id,
          user_id: this.user_id,
          page: this.page,
          limit: this.limit,
          keyword: this.keyword,
        };
        this.$axios.post(url.procurementOrder, data).then((res) => {
          if (res.data.status == 1) {
            this.total = res.data.count;
            this.orderData = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        });
      }
    },
    // 点击搜索按钮
    search() {
      this.orderList()
    },
    //   点击选择按钮
    chooseOrder(row) {
      if (this.cate == 1) {
        this.input_id = row.order_no;
      }
      if (this.cate == 2) {
        this.purchase_order = row.id;
      }
      this.dialogFormVisible = false;
    },
    // 订单列表点击取消
    orderCancel() {
      this.dialogFormVisible = false;
      this.input_id = "销售订单";
      this.purchase_order = '采购订单';
    },
    orderNo() {
      this.dialogFormVisible = true;
    },
    submit: function () {
      //   sale_id    销售订单id   cate为1传sale_id
      //  purchase_id
      let invoice_id = this.invoice_id;
      let order_id = 0;
      if (this.cate == 1) {
        order_id = this.input_id;
      }
      if (this.cate == 2) {
        order_id = this.purchase_order;
      }
      let time = Math.floor(new Date().getTime() / 1000);
      let token = this.postToken(this.merchant_id, time);
      this.$axios
        .post(url.addInvoice, {
          time: time,
          merchant_id: this.merchant_id,
          user_id: this.user_id,
          token: token,
          type: this.type,
          name: this.ruleForm.name,
          taxpayer: this.ruleForm.taxpayer,
          bank: this.ruleForm.bank,
          account: this.ruleForm.account,
          note: this.ruleForm.note,
          note: this.ruleForm.note,
          cate: this.cate,
          amount: this.ruleForm.money,
          order_id: order_id,
          invoice_id:invoice_id,
        })
        .then((res) => {
          if (res.data.status == 1) {
            this.$router.go(-1);
            //   this.total = res.data.total
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    //生成token
    postToken(merchant_id, time) {
      var token = this.$md5(merchant_id + time + this.user_id);
      return token;
    },

    // 分页
    handleSizeChange(val) {
      this.limit = val;
      console.log(val);
      this.listInvoice();
    },
    handleCurrentChange(val) {
      this.page = val;
      console.log(val);
      this.listInvoice();
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
.keywords {
  width: 35%;
}
</style>
