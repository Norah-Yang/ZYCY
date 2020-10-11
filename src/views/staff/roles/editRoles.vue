<template>
  <div style="height:100%">
    <p class="title">
      <span>修改角色</span>
      <el-button size="mini" @click="goBack">返回</el-button>
    </p>
    <el-form label-position="right" label-width="120px" :model="ruleForm" ref="ruleForm">
      <el-form-item label="角色ID">
        <el-input v-model="ruleForm.id" readonly></el-input>
      </el-form-item>
      <el-form-item label="角色名称">
        <el-input v-model="ruleForm.role"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="ruleForm.note" type="textarea" :rows="4" class="textarea"></el-input>
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
      role_id:'',
      user_id : localStorage.getItem("user_id"),
      merchant_id : "1",
    };
  },
  created() {
      this.role_id = this.$route.query.role_id;
      this.getList()
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
          role_id: this.role_id
        };
        this.$axios
          .post(url.roleInfo, obj)
          .then(res => {
            if (res.data.status == 1) {
                this.ruleForm = res.data.data
            }
          })
    },
    //提交修改
    submit(){
        let obj = {
          time: Math.floor(new Date().getTime() / 1000),
          merchant_id: this.merchant_id,
          user_id : this.user_id,
          token: this.postToken(),
          role_id: this.role_id,
        };
        let data = Object.assign(obj,this.ruleForm)
        this.$axios.post(url.editRole,data).then(res=>{
            if(res.data.status==1){
                this.$message.success(res.data.msg);
                this.$router.push('/getRoles')
            }
        })
    },
    //生成token
    postToken() {
      let time = Math.floor(new Date().getTime() / 1000);
      let merchant_id = this.merchant_id;
      let user_id = this.user_id;
      let token = this.$md5(merchant_id + time + user_id);
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
