<template>
    <div style="height:100%">
        <p class="title">
            <span>添加权限</span>
            <el-button size="mini" @click="goBack">返回</el-button>
        </p>
        <el-form label-position="right" label-width="120px" :model="ruleForm" ref="ruleForm">
            <el-form-item label="权限名称">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="权限路径">
                <el-input v-model="ruleForm.coin"></el-input>
            </el-form-item>
            <el-form-item label="父级">
                <el-select v-model="ruleForm.parent_id" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.title"
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
        title: "",
        coin: "",
        parent_id: "",
      },
      tips: "",
      user_id : localStorage.getItem("user_id"),
      merchant_id : "1",
      options:[],
    };
  },
  created() {
      this.getSelect();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getSelect(){
        let obj = {
            time: Math.floor(new Date().getTime() / 1000),
            merchant_id: this.merchant_id,
            user_id : this.user_id,
            token: this.postToken()
        };
        this.$axios.post(url.getParentNode,obj).then(res=>{
            this.options = res.data.data
            console.log(res.data.data)
        })
    },
    submit() {
      let obj = {
        time: Math.floor(new Date().getTime() / 1000),
        merchant_id: this.merchant_id,
        user_id:this.user_id,
        token: this.postToken()
      };
      let data = Object.assign(this.ruleForm, obj);
        this.$axios
          .post(url.addNode, data)
          .then(res => {
              console.log(res.data.data)
            if (res.data.status == 1) {
              this.$message.success(res.data.msg);
              this.$router.push("/getNode");
            }
          })
          .catch(req => {
            this.$message.error("提交失败");
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
  .regWarn {
    display: inline-block;
    text-indent: 20px;
    color: #f56c6c;
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
