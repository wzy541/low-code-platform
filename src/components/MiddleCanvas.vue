<template>
  <div class="can">
    <el-card :body-style="{ padding: '0px',height: '100%'}">
      <!--
        创建画布本体并设计点击事件：
           事件名：setElement
           触发：鼠标抬起
      -->
      <div class="canvas"
           :style="'width:'+viewWidth+'px;' +'height:'+viewHeight+'px'"
           @dragover="dragOver"
           @drop="drop"
           @click="checkComp"
           @mousedown="mouseDownStart"
           id="canvas"
      >
        <!--
          画布内容,暂时先放着，先解决其他问题后再来处理
        -->

        <!--这是一种解决思路,但是终归有很大的弊端,需要思考改进,使用的方法是通过
        固定的v-for循环来刷新这就意味着无法确定元素的标签(div)和固定的层数.
        -->
        <div
            v-for="(element,index) in this.$store.state.domTree.child"
            draggable='true'
            :key="index"
            :id=element.id
            :style=element.style
        >{{ element.text }}
          <div
              v-for="(element_1,index) in element.child"
              draggable="true"
              :key="index"
              :id=element_1.id
              :style=element_1.style
          >{{ element_1.text }}
            <div
                v-for="(element_2,index) in element_1.child"
                draggable="true"
                :key="index"
                :id=element_2.id
                :style=element_2.style
            >{{ element_2.text }}
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {getComponent, getId,disposePath} from "../utils/index"; //导入组件创建是相关函数

export default {
  name: 'MiddleCanvas',
  data() {
    return {
      viewWidth: this.$store.state.domTree.style.width,
      viewHeight: this.$store.state.domTree.style.height,
      currComp: null,
      startPosition: {x: 0, y: 0},
    }
  },
  methods: {
    //画布点击事件,需要重构,想办法获取点击的元素
    checkComp(e) {
      let path = disposePath(e.path); //取得被点击元素的路径
      //如果点击的元素是canvas,则清空pathBuffer
      console.log(path);
      if (path.length===0){
        this.$store.commit('clearPathBuffer');
      }else {
        this.$store.commit('writeBuffer', path);
        this.$store.commit('highlight');  //这里是调用方法删除尝试修改样式来达到高亮目的但是失败了.需要进一步改进
      }
    },
    //拖拽到画布的回调
    dragOver(e) {
      e.preventDefault();
    },
    //鼠标松开的回调 (重写的差不多了,但是丢失了位置信息)
    drop(e) {
      e.preventDefault(); //阻止默认事件被触发
      let info = JSON.parse(e.dataTransfer.getData("info"));  //取得从leftView组件传递过来的对象参数
      info.id = getId();  //设置唯一的id.  赋予元素唯一的id
      let component = getComponent(info); //利用info(信息)初始化一个组件
      //找到组件的宽高
      let compWidth = 0;
      let compHeight = 0;

      if (component.el === '<el-div>' || component.el === '<el-button>') {
        compWidth = component.style.width;
        compHeight = component.style.height;
      }
      //计算画布上的组件的位置,e.offsetX和e.offsetY为鼠标放下时的坐标
      let left = e.offsetX - compWidth / 2;
      let top = e.offsetY - compHeight / 2;
      if (left < 0) {
        left = 0;
      }
      if (top < 0) {
        top = 0;
      }
      //设置组件在画布的位置信息
      component.position = {left, top,};
      //将component加入到domTree中并生成页面图标
      this.$store.commit('addLeaves', {path: disposePath(e.path), component: component});
    },
    //鼠标按下的回调,需要重写
    mouseDownStart(e) {
      console.log(e);
      //记录按下瞬间的位置
      this.startPosition.x = e.clientX;
      this.startPosition.y = e.clientY;
      //注册移动鼠标和鼠标松开的事件
      // document.addEventListener("mousemove", this.mouseMove, true);
      // document.addEventListener("mouseup", this.mouseUp, true);
      console.log('1111');
    },
    //鼠标移动的回调,需要重写
    mouseMove(e) {
      console.log(e.path);
      /*
      //计算偏移量
      let offsetX = e.clientX - this.startPosition.x;
      let offsetY = e.clientY - this.startPosition.y;

      //设置组件当前的位置,让组件在拖拽时也具有视觉效果(不理解为什么有这一段代码,其实拖动过程中并不需要另外再写这样的函数了)
      let comp = document.getElementById(this.currComp.info.id);
      Object.assign(comp.style, {
        // left: this.currComp.position.left + offsetX + "px",
        // top: this.currComp.position.top + offsetY + "px",
        left:
            this.boundaryLimit(
                "x",
                this.currComp.position.left + offsetX,
                this.currComp
            ) + "px",
        top:
            this.boundaryLimit(
                "y",
                this.currComp.position.top + offsetY,
                this.currComp
            ) + "px",
      });

      //设置选中框的位置
      let borderComp = document.getElementById("borderBox");
      Object.assign(borderComp.style, {
        left:
            this.boundaryLimit(
                "x",
                this.currComp.position.left + offsetX,
                this.currComp
            ) + "px",
        top:
            this.boundaryLimit(
                "y",
                this.currComp.position.top + offsetY,
                this.currComp
            ) + "px",
        // left: this.currComp.position.left + offsetX + "px",
        // top: this.currComp.position.top + offsetY + "px",
      });*/
    },
    //鼠标松开的回调,需要重写
    mouseUp(e) {
      console.log(e.path);
      /*
      //移除事件
      document.removeEventListener("mousemove", this.mouseMove, true);
      document.removeEventListener("mouseup", this.mouseUp, true);
      //更新组件的数据
      this.currComp.position.left = this.boundaryLimit(
          "x",
          this.currComp.position.left +
          (e.clientX - this.startPosition.x),
          this.currComp
      );
      this.currComp.position.top = this.boundaryLimit(
          "y",
          this.currComp.position.top + (e.clientY - this.startPosition.y),
          this.currComp
      );
    },
    //边界限定,需要重写
    boundaryLimit(type, num, comp) {
      let canvas = document.getElementById("canvasBox");
      //计算出边界值
      let canvasWidth = canvas.clientWidth;
      let canvasHeight = canvas.clientHeight;

      //组件的宽高
      let compWidth = 0;
      let compHeight = 0;
      comp.attribute.forEach((item) => {
        if (item.key === "width") {
          compWidth = item.value;
        }
        if (item.key === "height") {
          compHeight = item.value;
        }
      });
      //边界值
      let maxX = canvasWidth - compWidth;
      let maxY = canvasHeight - compHeight;

      let lastNum = 0;
      if (type === "x") {
        if (num < 0) {
          lastNum = 0;
        } else if (num > maxX) {
          lastNum = maxX;
        } else {
          lastNum = num;
        }
      } else if (type === "y") {
        if (num < 0) {
          lastNum = 0;
        } else if (num > maxY) {
          lastNum = maxY;
        } else {
          lastNum = num;
        }
      }
      return lastNum;*/
    },
  },
  //监听属性,收到页面大小数据后实时修改画布大小
  watch: {
    "$store.state.domTree.style.width"() {
      this.viewWidth = this.$store.state.domTree.style.width;
      // this.elData.width = this.viewWidth;无用的?
      // console.log('正在更新ViewWidth.更新值为'+this.viewWidth);
    },
    "$store.state.domTree.style.height"() {
      this.viewHeight = this.$store.state.domTree.style.height;
      // this.elData.Height = this.viewHeight;无用的?
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
    background-color: aliceblue;

    .canvas {
      // position: relative;
      // top: 50%;
      // transform:translateY(-50%) ;
      // transform: scale(2);
      margin: 0 auto;
      //画布网格样式
      height: inherit; /* 继承高度 */
      //background: white;//两个background相互冲突,得想办法
      background: -webkit-linear-gradient(top, transparent 40px, gray 41px), -webkit-linear-gradient(left, transparent 40px, gray 41px);
      background-size: 41px 41px;
      border: 1px outset #2c3e50;
      background-color: white; //能通过设置background-color来解决,但是报弱警告,难受
    }
  }
}
</style>
