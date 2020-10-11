<template>
    <div style="height:100%">
        <p class="title">
            <span>添加铭牌</span>
            <el-button size="mini" @click="goBack">返回</el-button>
        </p>
        <el-form label-position="right" label-width="120px" :model="ruleForm" ref="ruleForm">
            <el-form-item label="车辆ID">
                <el-input v-model="ruleForm.cart_id"></el-input>
                <el-button size="mini" type="text" style="margin-left:20px" @click="getId">关联车辆id</el-button>
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
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary" @click="submit">提交</el-button>
            </el-form-item>
        </el-form>
        <!-- 车辆 -->
        <el-dialog title="" :visible.sync="getCart">
            <el-input placeholder="请输入内容" v-model="keyword" class="search" size="mini">
                <el-button slot="append" icon="el-icon-search" @click="search(1)"></el-button>
            </el-input>
            <el-table :data="getCartList" height="300">
                <el-table-column property="id" label="车辆id"></el-table-column>
                <el-table-column property="name" label="车辆姓名"></el-table-column>
                <el-table-column property="frame" label="车架号"></el-table-column>
                <el-table-column property="engine" label="发动机号"></el-table-column>
                <el-table-column property="storage" label="存放点"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="mini"
                            @click="getCartBtn(scope.$index, scope.row)"
                        >选择</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
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
      ruleForm: {
        cart_id: "",
        img: [],
        note: ""
      },
      fileList:[],
      action:url.upload,
      getCart: false,
      getCartList: [],
      total: 30,
      page: 1, //页数
      limit: 10, //每页条数
      currentPage1: 1,
      keyword: "",
      user_id : localStorage.getItem("user_id"),
      merchant_id : "1",
    };
  },
  created() {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    submit() {
      let obj = {
          time: Math.floor(new Date().getTime() / 1000),
          merchant_id: "001",
          token: this.postToken(),
          user_id: localStorage.getItem("user_id"),
        };
      let data = Object.assign(this.ruleForm, obj);
      console.log(data)
      this.$axios
        .post(url.addNameplate, data)
        .then(res => {
          console.log(res);
          if (res.data.status == 1) {
            this.$message.success(res.data.msg);
            this.$router.push("/getNameplate");
          }
        })
        .catch(req => {
          this.$message.error("提交失败");
        });
    },
    getId() {
      let data = {
        time: Math.floor(new Date().getTime() / 1000),
        merchant_id: this.merchant_id,
        user_id : this.user_id,
        token: this.postToken(),
        page: this.page,
        limit: this.limit,
        keyword: this.keyword
      };
      //关联客户id
      this.getCart = true;
      this.$axios.post(url.getCartID, data).then(res => {
        if (res.data.status == 1) {
          this.getCartList = res.data.data;
          this.total = res.data.count;
        }
      });
    },
    handleSizeChange(){
        this.getId();
    },
    handleCurrentChange(){
        this.getId();
    },
    getCartBtn(index, row) {
      this.ruleForm.cart_id = row.id;
      this.getCart = false;
    },
    uploadSuccess(res){
      this.ruleForm.img.push(res.data);
    },
    //图片移除时
    uploadRemove(file, fileList) {
      this.ruleForm.img = fileList;
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
  height: 80%;
  margin-bottom: 20px;
  overflow: auto;
  
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
.upload-demo{
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
