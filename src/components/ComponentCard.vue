<template>
  <div class="leftBox">
    <!--调用Element-UI内置的卡片组件,简化编程,可视为一个准备好的-->
    <el-card :body-style="{ padding: '0px' }">
      <span>组件</span>

      <!--绑定点击事件:事件名为show(只做测试使用)-->
      <!--<div name="btn" @mousedown="show">按钮</div>
      注:name属性无意义,添加理由未知,暂行优化,如有需要,请返回原代码版本-->
      <div @mousedown="show">按钮</div>

      <div>插件</div>

      <div>插件</div>
    </el-card>
  </div>
</template>

<script>
export default {
  // 插件栏
  name: 'ComponentCard',
  data() {
    return {
      //无数据
    }
  },
  methods: {
    //鼠标按下后触发的函数
    show(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="less" scoped>
//样式,没啥好说的
.leftBox {
  height: calc(100% - 50px);
  padding: 20px 0 20px 10px;  //这里优化了一下,把padding-top: 20px注释掉了
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
