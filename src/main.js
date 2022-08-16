import Vue from 'vue'
import App from './App.vue'
//引入element-ui组件库
import ElementUI from 'element-ui';
//引入element-ui的全部样式
import 'element-ui/lib/theme-chalk/index.css';
//引入路由器
// import router from "@/router";
//引入store
import store from "@/store";

Vue.use(ElementUI);


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // router,
  store,
}).$mount('#app')
