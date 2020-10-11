<template>
    <div class="menu">
        <el-menu
            :default-active="this.$route.path"
            class="el-menu-vertical-demo"
            :router="true"
            @open="handleOpen"
            @close="handleClose"
            :unique-opened='true'
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            >
            <el-submenu  v-for="item in menuList" :key="item.id"  :index="item.id+''">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{item.title}}</span>
                </template>
                <el-menu-item-group v-for="items in item.son" :key="items.id">
                    <el-menu-item :index="'/'+items.path">{{items.title}}</el-menu-item>
                    <!-- <el-menu-item :index="'/'+items.path" @click="getRoles('/'+items.path)">{{items.title}}</el-menu-item> -->
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
import url from "../api/api.js";
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            menuList:[],
            user_id : localStorage.getItem("user_id"),
            merchant_id : "1",
        }
    },
    created() {
        this.getMenuList();
    },
  methods: {
      ...mapMutations(["getAuthcurent"]),
      // 获取所有的菜单
    getMenuList() {
        let data={
            time:Math.floor(new Date().getTime() / 1000),
            merchant_id:this.merchant_id,
            user_id:this.user_id,
            token:this.postToken(),
        }
      this.$axios.post(url.getMenu,data).then(res=>{
            if(res.data.status == 1){
                this.menuList = res.data.data;
                // console.log(res.data.data)
                this.getAuthcurent(res.data.data);
            }else{
                this.$message.error(res.data.msg)
            }            
        })
    },
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
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
.menu ul{
    border-right: 1px solid #545c64;
}
.el-submenu .el-menu-item{
    height: 40px;
}
</style>
