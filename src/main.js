import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import md5 from 'js-md5';
import Blob from './vendor/Blob'
import Export2Excel from './vendor/Export2Excel.js'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$md5 = md5;
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
