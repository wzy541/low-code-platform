# low-code-platform

## 使用语言:
Vue,html,Javascript,css

### 使用插件(库):
1. element-ui
2. Vuex
3. animate.css

### 安装环境:
1. 安装nodejs 官网下载:[nodejs for windows](https://nodejs.org/en/)
2. 安装element-ui:
    ```
   npm i element-ui -S
    ```
3. 安装Vuex:
   ```
   npm install vuex --save
   ```
4. 安装animate.css
   ```
   npm install animate.css --save
   ```
   
### 运行项目
```
npm run serve
```

### 打包项目
```
npm run build
```

### 线上地址
[low-code-platform](https://fbwoceda.fun/dist/).

### github地址
[BytePowerPro/low-code-platform](https://github.com/BytePowerPro/low-code-platform)

## 项目完成情况

### 已实现功能:
1. 从左侧组件栏拖拽元素到画布并生成对应节点
2. 对画布上的元素进行选中和编辑

### 文件结构
```
Low_code_platform
│  .gitignore
│  babel.config.js
│  jsconfig.json
│  package-lock.json
│  package.json
│  README.md
│  tree.txt
│  vue.config.js
│  
├─public
│      favicon.ico
│      index.html
│      
└─src
    │  App.vue
    │  main.js
    │  
    ├─assets
    │      logo.png
    │      
    ├─components
    │  │  ComponentCard.vue
    │  │  EditCard.vue
    │  │  MiddleCanvas.vue
    │  │  TheHeader.vue
    │  │  
    │  └─EditProperties
    │          ElementAnimation.vue
    │          ElementAttribute.vue
    │          ElementEvent.vue
    │          
    ├─router
    │      index.js
    │      
    ├─store
    │      index.js
    │      
    └─utils
            index.js
```
### 编辑页面基本布局
使用element-ui对编辑页面进行了基本的布局,采用了头部+左中右结构,分别对应组件为:

TheHeader.vue | ComponentCard.vue | MiddleCanvas.vue | EditCard.vue

其中EditCard组件下辖三个对应的编辑组件:

ElementAnimation.vue | ElementAttribute.vue | ElementEvent.vue

### 数据结构

借助Vuex实现数据互通,在Vue的基础上再实现了一个小型的虚拟dom,数据结构中为domTree,其样例为:
```javascript
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
          style: {height: '200px', width: '200px',color: '#123456',backgroundColor:'',fontFamily:'',fontSize:''}, //样式
          events: [], // 绑定的事件？
          text: '我是一个div盒子', // 内容
          class: [], //目前只是用于存储
          child: [{ //子组件，可以有多个，为对象数组
            id: '114514',
            el: '<bp-link/>',
            style: {color: '#ccc',backgroundColor:'',fontFamily:'宋体',fontSize:''},
            events: [],
            href: '',
            text: '我应当是一个a标签',
            child: [],
          },
          ]
        },
      ]
    },
```
我们采用缓存其中的节点的方式简化操作,设置路径缓冲和元素缓冲:
```javascript
pathBuffer:[],  //用来暂存需用控制的组件的路径信息
elementBuffer:null,  //用来暂存被选中或需要编辑的节点
```
