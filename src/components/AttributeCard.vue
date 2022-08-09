<template>
  <div class="AttributeCard" >
    <el-tabs type="border-card" stretch>
      <!-- 样式属性 -->
      <el-tab-pane label="样式">样式</el-tab-pane>
      <!-- 添加事件 -->
      <el-tab-pane label="事件">
        <div>
          <span>事件选择</span>
          <el-radio-group v-model="events" size="small">
            <el-radio-button label="click" >单击</el-radio-button>
            <el-radio-button label="dblclick">双击</el-radio-button>
            <el-radio-button label="mouseover"></el-radio-button>
          </el-radio-group>
        </div>
        <div style="margin-top: 20px">
        <span>方法选择</span>
          <el-radio-group v-model="method" size="small">
            <el-radio-button label="alert" >alert</el-radio-button>
            <el-radio-button label="console">console</el-radio-button>
            <el-radio-button label="location">跳转</el-radio-button>
          </el-radio-group>
        </div>   
        <el-input
          placeholder="请输入内容"
          v-model="input"
          clearable>
        </el-input> 
         <el-button type="primary" @click="setEvent">添加事件</el-button>
      </el-tab-pane>
      <!-- 添加动画 -->
      <el-tab-pane label="动画">动画</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script >
export default {
  name:'AttributeCard',
  data(){
    return {
      events:'click',
        method:'alert',
         input: ''
    }
  },methods:{
    	// 设置事件
	setEvent(){
     console.log(this.events,this.method,this.input)
      // document.getElementById(el).addEventListener(this.events, fn)
      function fn(){
         	if(this.method=='alert'){
			      return	alert(this.input)
			}else if(this.method=='console'){
			     return	console.log(this.input)
			}else if(this.method=='location'){
				// window.location.replace(this.input)
				  return window.open('http://'+this.input)
			}
      }
		
		    
			
		}

  }
}
</script>

<style lang="less" scoped>
   .AttributeCard{
   
    height:calc(100% - 40px);
    .el-tabs{
       margin-top: 20px;
       margin-right: 10px;
        height: 100% ;
     }
    
  }
  .el-input{
    margin: 20px auto;
  }
</style>