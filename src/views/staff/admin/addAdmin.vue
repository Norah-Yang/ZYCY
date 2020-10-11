<template>
  <div style="height:100%">
    <p class="title">
      <span>添加管理员</span>
      <el-button size="mini" @click="goBack">返回</el-button>
    </p>
    <el-form label-position="right" label-width="120px" :model="ruleForm" ref="ruleForm">
      <el-form-item label="管理员账号">
        <el-input v-model="ruleForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="ruleForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="管理员名称">
        <el-input v-model="ruleForm.admin"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="ruleForm.note" type="textarea" :rows="4" class="textarea"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="ruleForm.role_id" placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.role"
            :value="item.id">
            </el-option>
        </el-select>
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
      ruleForm: {
        account:'',
        password:'',
        admin:'',
        note:'',
        phone:'',
        role_id:'',
      },
      options:[],
      user_id : localStorage.getItem("user_id"),
      merchant_id : "1",
    };
  },
  created() {
      let data={
        time:Math.floor(new Date().getTime() / 1000),
        merchant_id: this.merchant_id,
        user_id : this.user_id,
        token:this.postToken(),
        keyword:'',
        page:'',
        limit:''
      }
      this.$axios.post(url.getRole,data).then(res=>{
        this.options = res.data.data
      })
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    submit() {
        let obj = {
          time: Math.floor(new Date().getTime() / 1000),
          merchant_id: this.merchant_id,
          user_id : this.user_id,
          token: this.postToken(),
        };
        let data = Object.assign(this.ruleForm, obj);
        this.$axios
          .post(url.addAdmin, data)
          .then(res => {
            if (res.data.status == 1) {
              this.$message.success(res.data.msg);
              this.$router.push("/getAdmin");
            }
          })
          .catch(req => {
            this.$message.error("添加失败");
          });
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
