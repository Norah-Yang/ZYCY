<template>
  <div style="height:100%">
    <p class="title">
      <span>铭牌修改</span>
      <el-button size="mini" @click="goBack">返回</el-button>
    </p>
    <el-form label-position="right" label-width="120px" :model="ruleForm" ref="ruleForm">
      
      <el-form-item label="铭牌ID">
        <el-input v-model="ruleForm.id" readonly></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="ruleForm.note" type="textarea" :rows="4" class="textarea"></el-input>
      </el-form-item>
      <el-form-item label="车辆ID">
        <el-input v-model="ruleForm.cart_id" readonly></el-input>
      </el-form-item>
      <el-form-item label="上传图片">
        <el-upload
          class="upload-demo"
          :action="action"
          :file-list="fileList"
          list-type="picture"
          name="img[]"
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
      nameplate_id: "",
      fileList: [],
      action: url.upload,
      img:[],
      user_id : localStorage.getItem("user_id"),
      merchant_id : "1",
    };
  },
  created() {
    this.nameplate_id = this.$route.query.nameplate_id;
    this.getInfo();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getInfo() {
      let data = {
        time: Math.floor(new Date().getTime() / 1000),
        merchant_id: this.merchant_id,
        user_id : this.user_id,
        token: this.postToken(),
        type: this.type,
        nameplate_id: this.nameplate_id,
      };
      this.$axios.post(url.nameplateInfo, data).then(res => {
        this.fileList = res.data.data.pics;
        this.img = res.data.data.pics;
        delete res.data.data.pics;
        this.ruleForm = res.data.data;
      });
    },
    submit() {
      let obj = {
          time: Math.floor(new Date().getTime() / 1000),
          merchant_id: this.merchant_id,
          user_id : this.user_id,
          token: this.postToken(),
          nameplate_id: this.nameplate_id,
          img:this.img
        };
        let data = Object.assign(this.ruleForm, obj);
        this.$axios
          .post(url.editNameplate, data)
          .then(res => {
            if (res.data.status == 1) {
              this.$message.success(res.data.msg);
              this.$router.push("/getNameplate");
            }
          })
          .catch(req => {
            this.$message.error("提交失败");
          });
    },
    //图片上传成功时
    uploadSuccess(response, file, fileList){
      this.img.push(response.data)
    },
    //图片移除时
    uploadRemove(file, fileList) {
      this.img = fileList;
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
  overflow: auto;
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
.imgBox{
  display: flex
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
