<template>
  <div class="leftBox">
    <!--调用Element-UI内置的卡片组件,简化编程,可视为一个准备好的-->
    <el-card :body-style="{ padding: '0px' }">
      <span>组件</span>
      <div
          class="menuItem"
          draggable="true"
          v-for="(item,index) in menus"
          :key="index"
          :data-type="item.type"
          :data-name="item.name"
          @dragstart="dragStart"
      >{{ item.name }}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  // 插件栏
  name: 'ComponentCard',
  data() {
    return {
      menus: [
        {
          type: 'divComp',
          name: "盒子元素",
        },
        {
          type: 'textComp',
          name: "文本元素",
        },
        {
          type: 'buttonComp',
          name: "按键元素",
        },
        {
          type: 'imgComp',
          name: "图像元素",
        },
        {
          type: 'linkComp',
          name: "链接元素",
        },
        {
          type:'customComp',
          name:"自定义元素"
        }
      ]
    }
  },
  methods: {
    //定义方法,似乎是用来获取拖拽参数的,此时组件没有任何的特殊属性,只有'是个啥'的描述
    dragStart(e) {
      // console.log(e.target);
      let info = {
        name: e.target.getAttribute("data-name"),
        type: e.target.getAttribute("data-type"),
        class: e.target.getAttribute("data-class"), //class属性,根本没有data-class属性,传递为空
      };
      //将数据传递出去
      e.dataTransfer.setData("info", JSON.stringify(info));
    },
  },
}
</script>

<style lang="less" scoped>
//样式,没啥好说的
.leftBox {
  height: calc(100% - 50px);
  padding: 20px 0 20px 10px; //这里优化了一下,把padding-top: 20px注释掉了
  //padding-top: 20px;
  .el-card {

    height: 100%;
    padding: 5px;

    span {
      display: block;
      height: 60px;
      font-size: 24px;
      text-align: center;
      line-height: 60px;
    }

    div {
      display: inline-block;
      width: 107px;
      margin-right: 5px;
      margin-top: 5px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 5px;
      // box-shadow: 0 0 2px #ccc;
    }
  }
}
</style>
