<template>
  <div class="can">
    <el-card :body-style="{ padding: '0px',height: '100%'}">
      <!--
        创建画布本体并设计点击事件：
           事件名：setElement
           触发：鼠标抬起
      -->
      <div @mouseup="setElement" :style="'width:'+viewWidth+'px;' +'height:'+viewHeight+'px'">
        <!--
          画布内容
        -->
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'MiddleCanvas',
  data() {
    return {
      viewWidth:this.$store.state.viewWidth,
      viewHeight:this.$store.state.viewHeight,
      /*
      * 数据结构：
      * 树状，与dom树具有映射关系，存储各个元素的基本数据属性
      * 以下似乎是个例子？在正常情况下应只存在一个div元素盒子,没有下辖的a标签,改数据结构并未正式投入使用
      * */
      elData: {
        width: this.viewWidth,
        height: this.viewHeight,
        domTree: [{
          name: 'div',  // 元素名
          el: '<bp-div/>',  //
          style: {height: 122, width: 222}, //样式
          events: {}, // 绑定的事件？
          text: '', // 内容
          child: [{ //子组件，可以有多个，为对象数组
            name: 'a',
            el: '<bp-a/>',
            style: {color: '#ccc'},
            events: '',
            src: '',
            text: '',
            child: [],
          },]
        }
        ]
      }
    }
  },
  methods: {
    setElement(e) {
      //获取事件,获取的数据包括了抬起的位置等,可用作定位等后续操作
      console.log(e)
      // console.log(e.offsetX,e.offsetY)
      // console.log(this.elData)
      console.log(this.elData,'鼠标左键从画布抬起了')
    },
    //获取点击的元素后获取ID的函数(?)目前没有调用的方式,暂时注去避免警告
    // passId(e) {
    //   console.log(e.target.id)
    // }
  },
  //监听属性,收到页面大小数据后实时修改画布大小
  watch: {
    "$store.state.viewWidth"(){
      this.viewWidth=this.$store.state.viewWidth;
      this.elData.width = this.viewWidth;
      // console.log('正在更新ViewWidth.更新值为'+this.viewWidth);
    },
    "$store.state.viewHeight"(){
      this.viewHeight=this.$store.state.viewHeight;
      this.elData.Height = this.viewHeight;
      // console.log('正在更新ViewHeight.更新值为'+this.viewHeight);
    },
  }
}
</script>

<style lang="less" scoped>
//样式,没啥好说的
.can {

  height: calc(100% - 40px);
  padding: 20px 15px;

  .el-card {
    overflow: scroll;
    height: 100%;

    div {
      // position: relative;
      // top: 50%;
      // transform:translateY(-50%) ;
      // transform: scale(2);
      margin: 0 auto;
      background-color: #ccc;
    }
  }

}
</style>
