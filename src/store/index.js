//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

//引入一些功能函数
import {handleData} from '../utils/index'

//准备actions对象——响应组件中用户的动作
const actions = {
//  这里需要一个根据state创建dom的函数.
  generateDom(e,path,component) {
    //需要在这里先更改domTree，然后再修改dom.这里的path是元素的路径,包含了起一系列的父元素,要好好利用
    console.log('parentId'+path[0].id);
    //截取子元素的父元素组
    let pathStart = 0;
    for(;path[pathStart].id!=='canvas';){
      pathStart++;  //这样写只是不想被报弱错误,仅此而已
    }
    //根据路径寻路找到需要修改的domTree中的对象
    handleData (path[0].id, this.state.domTree,component);

  }
}
//准备mutations对象——修改state中的数据
const mutations = {
  updateWidth(state, newWidth) {  //更新画布宽度
    state.viewWidth = newWidth;
    // console.log('更新viewWidth成功修改的值为：'+state.viewWidth+'|'+newWidth);
  },
  updateHeight(state, newHeight) {  //更新画布高度
    state.viewHeight = newHeight;
    // console.log('更新viewHeight成功修改的值为：'+state.viewHeight+'|'+newHeight);
  },

  /*需要大量的函数,包括:
  * 1.寻路函数,用于获取相对应的叶子(通过唯一的id)
  * 2.新建对象函数,用于创建新的叶子,需要能创建唯一的id,根据不同的类型创造不同的叶子?
  * 3.转换函数,能将下面的dom树生成相应的结构*/
}
//准备state对象——保存具体的数据
const state = {
  viewWidth: 1920,
  viewHeight: 1080,
  /* 数据结构：
  树状，与dom树具有映射关系，存储各个元素的基本数据属性
  以下似乎是个例子？在正常情况下应只存在一个div元素盒子,没有下辖的a标签,
  该数据结构并未正式投入使用*/
  domTree: []
}

//创建并暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state
})


/*  数据样例，暂存于此
domTree: [{
    id: 'div',
    name: 'div',  // 元素名
    el: '<bp-div/>',  //???
    style: {height: 122, width: 222}, //样式
    events: [], // 绑定的事件？
    text: '', // 内容
    child: [{ //子组件，可以有多个，为对象数组
      id: '114514',
      name: 'a',
      el: '<bp-a/>',
      style: {color: '#ccc'},
      events: [],
      src: '',
      text: '',
      child: [
        {},
      ],
    },
    ]
  }]
*/