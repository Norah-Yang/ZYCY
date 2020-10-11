<template>
  <div id="app">
    <div id="nav">
      <router-view v-if="isRouterAlive"></router-view>
      <!-- <router-link to="/">Home</router-link> | -->
      <!-- <Nav/> -->
    </div>
  </div>
</template>
<script>
// import Nav from './components/nav'
export default {
  provide(){
    return{
       reload:this.reload
    }
  },
  data() {
    return {
      isRouterAlive:true,
    }
  },
  components:{
    // Nav
  },
    methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      })
    }
  },
}
</script>

<style lang="scss">
html,body{
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
#nav {
  margin: 0;
  padding: 0;
  height: 100%;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
