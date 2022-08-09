<template>
  <div  class="can">
    <el-card :body-style="{ padding: '0px',height: '100%'}">
      <div @mouseup="setElement" :style="'width:'+viewWidth+'px;' +'height:'+viewHeight+'px'">
       画布111
        <button @click="passId" id="btn1">1111</button>
      </div>
    </el-card>
  </div>
</template>

<script >
export default {
  name:'MiddleCanvas',
  data(){
    return {
       elData: { width:this.viewWidth,height:this.viewHeight,
            domTree:[{
                name:'div',
                el:'<bp-div/>',
                style:{height:122,width:222},
                events:{},
                text:'',
                child:[{
                  name:'a',
                  el:'<bp-a/>',
                  style:{color:'#ccc'},
                  events:'',
                  src:'' ,
                  text:'',
                  child:[],       
                }]
              }
            ]
        }
    }
  },
  props:{
    viewWidth:Number,
     viewHeight:Number
  },
  methods:{
    setElement(e){
      // console.log(e)
      // console.log(e.offsetX,e.offsetY)
      // console.log(this.elData)
      console.log(this.elData.width)
      
    },
    passId(e){
       console.log(e.target.id)
    }
  },
  watch:{
     viewWidth(width){
         this.elData.width=width
     },
       viewHeight(height){
         this.elData.height=height
     }
  }
}
</script>

<style lang="less"scoped>
  .can{
   
    height:calc(100% - 40px);
    padding: 20px 15px;
    .el-card{
       overflow: scroll;
        height: 100% ;
        div{
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