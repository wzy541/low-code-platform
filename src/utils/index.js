import Vue from "vue";

/** Woceda不知道这是干嘛的 **/
let getAttrStr = (attrs) => {
  let attrStr = ''
  attrs.forEach(item => {
    attrStr += item.key + "=" + item.value + "  "
  });
  return attrStr
}
export default getAttrStr

/** 产生随机ID **/
export const getId = () => { //获取随机ID，  (其实吧,可以调库的)
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4() + '-' + s4();
  // 0x10000：以0x开始的数据表示16进制，10000转成十进制数就是65536，实际上这是为了后面获取四位数随机号码所以乘以10000，而为了获取包含字母在内的字符就用16进制。
}

/** 挂载组件 **/
export const mountedComponent = (component) => {  //挂载组件
  let data = {}
  let id = component.info.id;
  let compWidth = 0;
  let compHeight = 0;
  if (component.attribute) {
    component.attribute.forEach(item => {
      data[item.key] = item.value
      if (item.key === 'width') {
        compWidth = item.value
      }
      if (item.key === 'height') {
        compHeight = item.value
      }
    })
  }
  setTimeout(() => {
    new Vue({
      name: id.toString(),
      data() {
        return data
      },
      el: document.getElementById(id),
      template: component.template,
      mounted() {
        //给组件添加属性，this.$el：获取该组件的实例
        this.$el.id = id;
        this.$el.style.position = "absolute";
        this.$el.style.cursor = 'pointer';
        this.$el.style.left = `${component.position.left}px`;
        this.$el.style.top = `${component.position.top}px`;
        this.$el.style.zIndex = component.position.zIndex;
        this.$el.style.width = `${compWidth}px`;
        this.$el.style.height = `${compHeight}px`;

      },
    })
  }, 500)
}

/** 初始化一个全新的组件并返回 **/
export function getComponent(info) {
  let component = {};
  component.id=info.id;
  component.text='请输入内容';
  component.class='';
  component.child=[];
  component.position={top:0,left:0}
  switch (info.type) {
    case 'divComp':
      component.el='<el-div>';
      component.style= {height: 122, width: 222};
      break;
    case 'linkComp':
      component.el='<el-link>';
      component.type="";
      component.href='#';
      break;
    case 'textComp':
      component.el='<span>';
      break
    case 'buttonComp':
      component.el='<el-button>';
      component.type="";
      break;
    case 'imgComp':
      component.el='<el-image>';
      component.style={height:100,width:100};
      component.src='../assets/logo.png';
      break;
    case 'customComp':
      component.el='<el-div>';
      component.style= {height: 122, width: 222};
      break;

    default:
      window.alert('组件信息生成错误,创建失败');
  }
  return component;
}

/** 处理path并返回,用于交给寻路函数处理 **/
export function disposePath(path){
  path = path.reverse();
  let pathEnd = 0;
  while (path[pathEnd].id !== 'canvas') {
    pathEnd++;
  }
  return path.splice(pathEnd+1);
}