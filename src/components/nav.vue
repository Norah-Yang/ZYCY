<template>
  <div class="global">
    <el-container>
      <el-aside width="200px">
        <div class="logo"></div>
        <Menu></Menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="logInfo">
            <span>销项：{{sale_sum}}元&nbsp;&nbsp;&nbsp;&nbsp;进项：{{purchase_sum}}元</span>
            <span>{{info.name}}：{{username}}，您好，最后登录时间：{{info.login_time}}&nbsp;&nbsp;最后登录ip：{{info.ip}}</span>
            <el-dropdown>
              <el-badge  :value="200" :max="99" class="item">
              <el-button
                class="el-dropdown-link"
                type="info"
                icon="el-icon-mouse"
                circle
              ></el-button>
              </el-badge> 
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <span>修改密码</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span @click="logout">退出登录</span>
                </el-dropdown-item>
              </el-dropdown-menu> 
           </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer style="height:6%">
          <p>©版权所有</p>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import url from "@/api/api.js";
import Menu from "./menu";
export default {
  data() {
    return {
      username: "",
      info: {},
      user_id: localStorage.getItem("user_id"),
      merchant_id: "1",
      sale_sum: 0,
      purchase_sum: 0
    };
  },
  created() {
    this.username = localStorage.getItem("username");
    this.getInfo();
  },
  methods: {
    logout() {
      this.$confirm("确定退出吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          window.localStorage.clear();
          this.$router.push("/login");
        })
        .catch(() => {
          return false;
        });
    },
    //获取头部信息
    getInfo() {
      let data = {
        time: Math.floor(new Date().getTime() / 1000),
        merchant_id: this.merchant_id,
        token: this.postToken(),
        user_id: this.user_id
      };
      this.$axios.post(url.getInfo, data).then(res => {
        this.info = res.data.data;
        this.sale_sum = res.data.sale_sum;
        this.purchase_sum = res.data.purchase_sum;
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
  },
  components: {
    Menu
  }
};
</script>
<style scoped  lang="scss">
.global,
.el-container {
  height: 100%;
}
.el-header {
  background-color: #fff;
  color: #333;
  .logInfo {
    color: #000;
    float: right;
    margin-top: 5px;
    span {
      font-size: 10px;
      margin-right: 20px;
      letter-spacing: 0.2px;
    }
  }
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.el-footer {
  background-color: #fff;
  color: #333;
  text-align: center;
  p {
    line-height: 100%;
  }
}
.el-aside {
  background-color: #545c64;
  color: #333;
  height: 100%;
  .logo {
    // background-color: #000;
    height: 60px;
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>


