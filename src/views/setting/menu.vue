<template>
  <div style="height:100%">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/accountManage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card">
      <p class="title">
        <span>菜单管理</span>
        <el-button size="mini" @click="dialogFormVisible = true">添加菜单</el-button>
      </p>
      <div class="main">
        <el-table
          :data="rightsList"
          style="width: 100%"
          row-key="id"
          border=""
          @row-click='menuList'
          :tree-props="{children: 'son', hasChildren: 'hasChildren'}"
        >
          <el-table-column prop="id" label="菜单id"></el-table-column>
          <el-table-column prop="title" label="菜单名称"></el-table-column>
        </el-table>
        <!-- <el-table :data="rightsList" border="" style="width: 20%" >
          <el-table-column prop="id" label="id" width="180"></el-table-column>
          <el-table-column prop="title" label="名称"></el-table-column>
        </el-table>-->
        <el-table :data="detailList" border="" style="width: 60%">
          <el-table-column prop="id" label="菜单id"></el-table-column>
          <el-table-column prop="title" label="菜单名称"></el-table-column>
          <el-table-column prop="path" label="路径"></el-table-column>
          <el-table-column prop="icon" label="图标">
            <template slot-scope="scope">
              <i :class="scope.row.icon"></i>
            </template>
          </el-table-column>
          <el-table-column prop="parent_id" label="父级id"></el-table-column>
          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button @click="editMenu(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="delMenu(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title="菜单导航" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="导航名称">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="导航图标">
          <el-input v-model="form.icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="导航路径">
          <el-input v-model="form.path" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级id">
          <el-input v-model="form.parent_id" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrder">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改菜单导航" :visible.sync="dialogFormChange">
      <el-form :model="form">
        <el-form-item label="导航名称">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="导航图标">
          <el-input v-model="form.icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="导航路径">
          <el-input v-model="form.path" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级id">
          <el-input v-model="form.parent_id" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormChange = false">取 消</el-button>
        <el-button type="primary" @click="editOrder">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import url from "../../api/api.js";
export default {
  data() {
    return {
      rightsList: [],
      detailList: [],
      dialogFormVisible: false,
      dialogFormChange: false,
      form: {
        title: "",
        icon: "",
        path: "",
        parent_id: ""
      },
      menu_id: "",
      user_id : localStorage.getItem("user_id"),
      merchant_id : "1",
    };
  },
  created() {
    this.getParentMenu();
  },
  methods: {
    getParentMenu() {
      let data = {
        token: this.postToken(),
        time: Math.floor(new Date().getTime() / 1000),
        merchant_id: this.merchant_id,
        user_id : this.user_id,
      };
      this.$axios.post(url.getMenu, data).then(res => {
        if (res.data.status == 1) {
          this.rightsList = res.data.data;
        }
      });
    },
    //表格的点击事件
    menuList(e) {
      this.detailList.length = 0;
      let data = {
        token: this.postToken(),
        time: Math.floor(new Date().getTime() / 1000),
        merchant_id: this.merchant_id,
        user_id : this.user_id,
        menu_id: e.id
      };
      this.$axios.post(url.menuInfo, data).then(res => {
        this.detailList.push(res.data.data);
      });
    },
    //添加导航
    addOrder() {
      let obj = {
        token: this.postToken(),
        time: Math.floor(new Date().getTime() / 1000),
        merchant_id: this.merchant_id,
        user_id : this.user_id,
      };
      let data = Object.assign(obj, this.form);
      this.$axios.post(url.addMenu, data).then(res => {
        if (res.data.status == 1) {
          window.location.reload();
        }
      });
      this.dialogFormVisible = false;
    },
    //修改
    editMenu(row) {
      this.dialogFormChange = true;
      this.form.title = row.title;
      this.form.icon = row.icon;
      this.form.path = row.path;
      this.form.parent_id = row.parent_id;
      this.menu_id = row.id;
    },
    editOrder() {
      this.dialogFormChange = false;
      let data = {
        token: this.postToken(),
        time: Math.floor(new Date().getTime() / 1000),
        merchant_id: this.merchant_id,
        user_id : this.user_id,
        menu_id: this.menu_id
      };
      let obj = Object.assign(data, this.form);
      this.$axios.post(url.editMenu, data).then(res => {
        if (res.data.state == 1) {
          window.location.reload();
        }
      });
    },
    //删除
    delMenu(row) {
      let data = {
        token: this.postToken(),
        time: Math.floor(new Date().getTime() / 1000),
        merchant_id: this.merchant_id,
        user_id : this.user_id,
        menu_id: row.id
      };
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.post(url.delMenu, data).then(res => {
            if (res.data.status == 1) {
              this.$message.success(res.data.msg);
              window.location.reload();
            }
          });
        })
        .catch(() => {
          return false;
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
.main {
  display: flex;
  justify-content: space-around;

}
.el-tree {
  margin-top: 20px;
}
.card {
  height: 97%;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)
}
</style>
<style>
.el-table td{
  padding: 7px 0;
}
</style>
