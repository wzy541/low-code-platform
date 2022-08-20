<template>
  <div>
    <div>
      <span>事件选择</span>
      <el-radio-group v-model="events" size="small">
        <!--选择触发模式,这里以后可以做成下拉选择-->
        <el-radio-button label="click">单击</el-radio-button>
        <el-radio-button label="dblclick">双击</el-radio-button>
        <el-radio-button label="mouseover">鼠标悬停</el-radio-button>
      </el-radio-group>
    </div>
    <div style="margin-top: 20px">
      <span>方法选择</span>
      <el-radio-group v-model="method" size="small">
        <!--这里以后可以做成下拉选择,因为方法不止这几种,没必要进行堆砌-->
        <el-radio-button label="alert">警告</el-radio-button>
        <el-radio-button label="console">控制台</el-radio-button>
        <el-radio-button label="location">跳转</el-radio-button>
      </el-radio-group>
    </div>
    <!-- 事件输入框,让用户输入触发事件时执行的代码或者显示的内容 -->
    <el-input
        placeholder="请输入内容"
        v-model="input"
        clearable>
    </el-input>
    <el-button type="primary" @click="setEvent">添加事件</el-button>
  </div>
</template>

<script>
export default {
  name: "ElementEvent",
  data() {
    return {
      events: 'click',  //事件类型,目前有3个,为['click','dblclick','mouseover']
      method: 'alert',  //方法类型,目前有3个,为['alert','console','location']
      input: '' //事件的具体内容,由用户输入
    }
  },
  methods: {
    // 设置事件
    setEvent() {
      //跳出控制信息,依次为:触发的事件,调用的方法,输出结果
      console.log(this.events, this.method, this.input)
      // document.getElementById(el).addEventListener(this.events, fn)
      //这一函数用于判断添加的事件时什么并进行相应操作,再真实情况下需要完全重写,
      // 因现在只做调试用,注去了其函数名
      // function fn() {
      if (this.method === 'alert') {
        return alert(this.input)
      } else if (this.method === 'console') {
        return console.log(this.input)
      } else if (this.method === 'location') {
        // window.location.replace(this.input)
        return window.open(/*'http://' +
          注:这里可以不需要添加http前缀,网页会自动跳转(?)暂时先注掉防报错*/
            this.input)
      }
      // }
    }
  }
}
</script>

<style scoped>
</style>