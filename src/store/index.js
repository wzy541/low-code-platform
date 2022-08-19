//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

//引入一些功能函数
// import {handleData} from '../utils/index'

//准备actions对象——响应组件中用户的动作
const actions = {
//  这里需要一个根据state创建dom的函数.
//   generateDom(e, path, component) {
//     需要在这里先更改domTree，然后再修改dom.这里的path是元素的路径,包含了起一系列的父元素,要好好利用
//     截取子元素的父元素组
//     path = path.reverse();
//     let pathEnd = 0;
//     for (; path[pathEnd].id !== 'canvas';) {
//       pathEnd++;  //这样写只是不想被报弱错误,仅此而已
//     }
//     path = path.splice(pathEnd);
//     console.log('处理后的path:');
//     console.log(path);
//     console.log(e);
//     console.log(component);
//     //根据路径寻路找到需要修改的domTree中的对象
//     mutations.addLeaves(path, this.state.domTree, component);
//
//   }
}
//准备mutations对象——修改state中的数据
const mutations = {
  updateWidth(state, newWidth) {  //更新画布宽度
    state.domTree.style.width = newWidth;
    // state.viewWidth = newWidth;
    // console.log('更新viewWidth成功修改的值为：'+state.viewWidth+'|'+newWidth);
  },
  updateHeight(state, newHeight) {  //更新画布高度
    state.domTree.style.height = newHeight;
    // state.viewHeight = newHeight;
    // console.log('更新viewHeight成功修改的值为：'+state.viewHeight+'|'+newHeight);
  },

  /*
  函数说明:
  state:固定的传参
  elem:对象,包含两个部分:
    {
      path:元素的路径,从id为canvas的div盒子开始,到需要添加的元素的父元素为止,为数组,形式,未来我应该会编写专门生成路径的函数和寻路用的函数
      component:需要添加的元素对象,包含预定的全部内容
    }
  */
  addLeaves(state, elem) {
    let i=1;
    let j=0;
    let temp=state.domTree;
    console.log('elem.path');
    console.log(elem.path);
    while(i<elem.path.length) {
      console.log('尘世皆攘攘');
      while(temp.child[j].id!==elem.path[i].id){
        console.log(temp.child[j].id);
        console.log(elem.path[i].id);
        j++;
        console.log('尘世皆攘攘2');
      }
      console.log('尘世皆攘攘3');
      temp=temp.child[j];
      i++;
      j=0;
    }
    console.log('temp');
    console.log(temp);
    temp.child.push(elem.component);
  }
  /*需要大量的函数,包括:
  * 1.寻路函数,用于获取相对应的叶子(通过唯一的id)
  * 2.新建对象函数,用于创建新的叶子,需要能创建唯一的id,根据不同的类型创造不同的叶子?
  * 3.转换函数,能将下面的dom树生成相应的结构*/
}
//准备state对象——保存具体的数据
const state = {
  /* 数据结构：
  树状，与dom树具有映射关系，存储各个元素的基本数据属性
  以下似乎是个例子？在正常情况下应只存在一个div元素盒子,没有下辖的a标签,
  该数据结构并未正式投入使用*/
  domTree:
    {
      id: 'canvas',
      el: '<div>',
      style: {height: 560, width: 640}, //本大小为默认的试做大小,适配了Woceda的显示器,需要可更改
      events: [],
      text: '',
      child: [
        {
          id: 'div',
          el: '<bp-div/>',  //???
          style: {height: 122, width: 222}, //样式
          events: [], // 绑定的事件？
          text: '我是一个div盒子', // 内容
          child: [{ //子组件，可以有多个，为对象数组
            id: '114514',
            el: '<bp-link/>',
            style: {color: '#ccc'},
            events: [],
            href: '',
            text: '我应当是一个a标签',
            child: [],
          },
          ]
        },
      ]
    },
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