import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//导入拖拽功能用的,我先去研究一下再来
// import myComps from './components/index'
// Vue.use(myComps)
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
