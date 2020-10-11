<template>
  <div style="height:100%">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/accountManage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card">
      <p class="title">
        <span>角色列表</span>
        <el-button size="mini" @click="addOrder">添加角色</el-button>
      </p>
      <!-- 列表 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        height="600"
        :row-style="{height:'20px'}"
        :cell-style="{padding:'0px'}"
      >
        <el-table-column label="">
          <template slot="header" slot-scope="scope">
            <el-date-picker
              v-model="rangeDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="mini"
              value-format="yyyy-MM-dd"
            ></el-date-picker>关键字：
            <el-input
              placeholder="角色名称/手机号"
              size="mini"
              v-model="searchInfo.keyword"
              class="keywords"
              @keyup.enter.native="search"
            >
              <el-button slot="append" @click="search">搜索</el-button>
            </el-input>
          </template>
          <el-table-column prop="id" label="角色ID" width="100px"></el-table-column>
          <el-table-column prop="role" label="角色名称" width="250px"></el-table-column>
          <el-table-column prop="note" label="备注" min-width="140px" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="add_time" label="添加时间" width="180px"></el-table-column>
          <el-table-column prop="operator" label="操作人"></el-table-column>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="editBusiness(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="delBusiness(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="assignNode(scope.row)" type="text" size="small">权限</el-button>
            <el-button @click="assignRole(scope.row)" type="text" size="small">角色分配</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 管理员信息 -->
      <el-dialog title="" :visible.sync="admin">
        <el-input placeholder="请输入内容" v-model="keywords" class="search" size="mini">
          <el-button slot="append" icon="el-icon-search" @click="search(1)"></el-button>
        </el-input>
        <el-table :data="adminList" height="300px">
          <el-table-column property="id" label="用户id"></el-table-column>
          <el-table-column property="admin" label="管理员名称"></el-table-column>
          <el-table-column
            property="note"
            label="备注"
            min-width="140px"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column property="phone" label="手机号"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="adminBtn(scope.$index, scope.row)">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="currentPage2"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totals"
        ></el-pagination>
      </el-dialog>
      <!-- 权限 -->
      <el-dialog title="权限设置" :visible.sync="node">
        <div v-for="item in nodes" :key="item.id">
          <el-checkbox
            :label="item.id"
            v-model="checkedCities"
            @change="handleCheckedCitiesChange"
          >{{item.title}}</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group
            v-model="checkedCities"
            @change="handleCheckedCitiesChange"
            style="margin-left:20px;margin-bottom:10px"
          >
            <el-checkbox v-for="items in item.son" :key="items.id" :label="items.id">{{items.title}}</el-checkbox>
          </el-checkbox-group>
        </div>
          <el-button @click="submit">提交</el-button>
        <!-- <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          v-for="(item,index) in nodes"
          :key="index"
        >{{item.title}}</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="(sonr,sons) in item.son" :label="sonr.title" :key="sons">{{sonr.title}}</el-checkbox>
        </el-checkbox-group>-->
      </el-dialog>
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
    </div>
  </div>
</template>
<script>
import url from "@/api/api.js";
export default {
  data() {
    return {
      tableData: [],
      searchInfo: {
        start_time: "",
        end_time: "",
        keyword: ""
      },
      admin: false,
      adminList: [],
      node: false,
      rangeDate: "",
      currentPage1: 1,
      page: 1, //页数
      limit: 10, //每页条数
      total: 100,
      currentPage2: 1,
      pages: 1, //页数
      limits: 10, //每页条数
      totals: 100,
      keywords: "",
      role_id: "",
      user_id: localStorage.getItem("user_id"),
      merchant_id: "1",
      checkAll: false,
      checkedCities: [],
      cities: [],
      isIndeterminate: false,
      nodes: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.1)"
      });
      let obj = {
        time: Math.floor(new Date().getTime() / 1000),
        merchant_id: this.merchant_id,
        user_id: this.user_id,
        token: this.postToken(),
        type: 1,
        page: this.page,
        limit: this.limit
      };
      let data = Object.assign(obj, this.searchInfo);
      await this.$axios.post(url.role, data).then(res => {
        if (res.data.status == 1) {
          loading.close();
          this.total = res.data.count;
          if (this.total > 0) {
            this.tableData = res.data.data;
          } else if (this.total == 0) {
            this.tableData = [];
            this.$message.error("未查询到相关结果");
          }
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    handleSizeChange(val) {
      this.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    //搜索
    search() {
      this.getList();
    },
    //修改订单
    editBusiness(row) {
      this.$router.push({
        path: "/editRoles",
        query: {
          role_id: row.id
        }
      });
    },
    //删除业务
    delBusiness(row) {
      let data = {
        time: Math.floor(new Date().getTime() / 1000),
        merchant_id: this.merchant_id,
        user_id: this.user_id,
        token: this.postToken(),
        role_id: row.id
      };
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.post(url.delRole, data).then(res => {
            if (res.data.status == 1) {
              this.$message.success(res.data.msg);
              //   window.location.reload();
            }
          });
        })
        .catch(() => {
          return false;
        });
    },
    //添加角色
    addOrder() {
      this.$router.push("/addRoles");
    },
    //生成token
    postToken() {
      let time = Math.floor(new Date().getTime() / 1000);
      let merchant_id = this.merchant_id;
      let user_id = this.user_id;
      let token = this.$md5(merchant_id + time + user_id);
      return token;
    },
    //全选
     handleCheckAllChange(val) {
      //  console.log(val)
        // this.checkedCities = val ? this.cities : [];
        // this.isIndeterminate = false;
      },
    handleCheckedCitiesChange(value) {
      // console.log(value)
      // let checkedCount = value.length;
      // this.checkAll = checkedCount === this.cities.length;
      // this.isIndeterminate =
      //   checkedCount > 0 && checkedCount < this.cities.length;
    },
    //选中弹出框的管理员时
    adminBtn(index, row) {
      console.log(this.role_id);
      let data = {
        time: Math.floor(new Date().getTime() / 1000),
        merchant_id: this.merchant_id,
        user_id: this.user_id,
        token: this.postToken(),
        role_id: this.role_id,
        admin_id: row.id
      };
      this.$axios.post(url.assignRole, data).then(res => {
        if (res.data.status == 1) {
          this.admin = false;
          this.$message.success(res.data.msg);
        } else if (res.data.status == -1) {
          this.$message.error(res.data.msg);
        }
      });
    },
    //角色分配
    assignRole(row) {
      let data = {
        time: Math.floor(new Date().getTime() / 1000),
        merchant_id: this.merchant_id,
        user_id: this.user_id,
        token: this.postToken(),
        page: this.pages,
        limit: this.limits,
        keyword: this.keywords
      };
      this.role_id = row.id;
      this.admin = true;
      this.$axios.post(url.getAdmin, data).then(res => {
        if (res.data.status == 1) {
          this.adminList = res.data.data;
          this.totals = res.data.count;
        }
      });
    },
    //权限分配
    assignNode(row) {
      console.log(row.id)
      this.role_id = row.id
      this.node = true;
      let data = {
        time: Math.floor(new Date().getTime() / 1000),
        merchant_id: this.merchant_id,
        token: this.postToken(),
        user_id: this.user_id,
        keyword: this.searchInfo.keyword
      };
      this.$axios.post(url.getNode, data).then(res => {
        this.nodes = res.data.data;
        console.log(res);
      });
    },
    //权限分配的提交
    submit(){
      let data={
        time: Math.floor(new Date().getTime() / 1000),
        merchant_id: this.merchant_id,
        token: this.postToken(),
        user_id: this.user_id,
        node_id:this.checkedCities,
        role_id:this.role_id
      }
      this.$axios.post(url.assignNode,data).then(res=>{
        console.log(res.data)
        if(res.data.status==1){
          this.$message.success(res.data.msg)
          this.node = false;
        }else{
          this.$message.error(res.data.msg)
        }
      })      
    },
    sizeChange() {
      this.assignRole();
    },
    currentChange() {
      this.assignRole();
    }
  },
  watch: {
    rangeDate: function(newVal, oldVal) {
      if (newVal !== null) {
        this.searchInfo.start_time = newVal[0];
        this.searchInfo.end_time = newVal[1];
      } else {
        this.searchInfo.start_time = null;
        this.searchInfo.end_time = null;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.el-breadcrumb {
  line-height: 2;
}
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
.el-pagination {
  margin-top: 50px;
}
.card {
  height: 97%;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.keywords {
  width: 35%;
}
</style>
