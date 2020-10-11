<template>
    <div class="login_wapper">
        <el-button
            class="detail_btn"
            style="width:40px;outline:none;position: relative;border: none;left: 400px;top: -130px;height:40px;border-top-right-radius: 20px;"
        >
            <!-- 切换 -->
        </el-button>
        <div class="login input_from" v-show="isswitch">
            <div>
                <div class="title">请输入账号和密码</div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="ruleForm.password" type="password"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="footer">
                <el-button type="danger" @click="onReset">重置</el-button>
                <el-button type="primary" @click="onsubmit">提交</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import url from "../api/api.js";
export default {
  data() {
    return {
      codeData: {},
      ruleForm: {
        name: "admin",
        password: "123456"
      },
      isswitch: true, //开关
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 9, message: "长度在 2 到 9个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 18, message: "长度在 3 到 18 个字符", trigger: "blur" }
        ]
      },
      user_id : localStorage.getItem("user_id"),
      merchant_id : "1",
    };
  },
  created() {
  },
  methods: {
    onReset() {
      this.$refs.ruleForm.resetFields();
      // this.$router.push({ path: "/" });
    },
    postToken() {
      let time = Math.floor(new Date().getTime() / 1000);
      let merchant_id= this.merchant_id;
      let user_id = this.user_id;
      var token = this.$md5(merchant_id + time + user_id);
      return token;
    },
    // 点击提交
    onsubmit() {
      // alert("发送请求");
      let token = this.postToken();
      let data={
            time:Math.floor(new Date().getTime() / 1000),
            merchant_id: this.merchant_id,
            user_id : this.user_id,
            token:token,
            name:this.ruleForm.name,
            password:this.ruleForm.password
      }
      this.$axios.post(url.getlogin,data).then(res=>{
          if(res.data.status==1){
              this.$message({
              message: res.data.msg,
              type: "success"
            });
            localStorage.setItem('username',this.ruleForm.name)
            localStorage.setItem('user_id',res.data.data)
             this.$router.push({ path: "/nav"});
          } else {
            this.$message.error(res.data.msg);
          }
      }).catch(req=>{
        
      });
    },
  }
};
</script>
<style lang="scss" scoped>
.login_wapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url("http://pic1.win4000.com/wallpaper/b/55597435bb036.jpg")
    no-repeat 100% 100%;
}
.login {
  width: 400px;
  height: 300px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 0 0 #888888;
}
.login_title {
  text-align: center;
  padding: 20px 0;
}
.contain {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
.el-form-item__content {
  float: left;
}
.detail_btn {
  background: #fff;
  background-size: 40px;
}
.detail_selected {
  background: #fff;
  background-size: cover;
}
iframe {
  width: 230px;
  height: 230px;
}
.input_from {
  box-sizing: border-box;
  padding: 0 20px;
  display: flex;
  align-content: center;
  flex-direction: column;
  justify-content: space-evenly;
}

.el-form-item {
  display: flex;
}

.el-form-item__content {
  flex: 1;
  margin: 0 !important;
}
.title {
  text-align: center;
  padding-bottom: 40px;
  font-size: 18px;
}
.footer {
  display: flex;
  justify-content: flex-end;
}
.detail_selected {
  z-index: 1;
}
.el-button {
  z-index: 3;
}
.login {
  z-index: 2;
}
</style>

