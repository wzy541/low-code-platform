<template>
  <!-- 标题(头部) -->
  <header>
    <el-row>
      <h1>low-Code</h1>
      <el-button plain>保存</el-button>
      <el-button type="warning" plain>后退</el-button>
      <el-button type="danger" plain>重置</el-button>
      <el-button type="primary" plain>生成页面</el-button>
      <div class="resolutionRatio">
        <span>分辨率:</span>
        <el-input v-model.number="viewWidth" oninput="value=value.replace(/\D/g,'')" size="mini" @blur="flashWidth"></el-input>
        <span>x</span>
        <el-input v-model.number="viewHeight" oninput="value=value.replace(/\D/g,'')" size="mini" @blur="flashHeight"></el-input>
      </div>
    </el-row>
  </header>
</template>

<script>
export default {
  name: "TheHeader",
  data(){
    return {
      viewWidth:this.$store.state.viewWidth,
      viewHeight:this.$store.state.viewHeight,
    }
  },
  methods:{
    flashWidth:function (){
      console.log('viewWidth失去焦点'+this.viewWidth);
      this.$store.commit('updateWidth',this.viewWidth);

    },
    flashHeight(){
      console.log('viewHeight失去焦点'+this.viewHeight);
      this.$store.commit('updateHeight',this.viewHeight);
    }
  }
}
</script>

<style lang="less" scoped>
header {
  height: 60px;
  line-height: 60px;
  color: white;
  // border-bottom: 1px solid black;
  box-shadow: 0 0 2px black;

  .el-row {

    h1 {
      display: inline;
      font-size: 24px;
      color: black;
      padding-right: 80px;
      padding-left: 24px;
    }

    .resolutionRatio {
      display: inline-block;
      margin-left: 30px;

      span {

        font-size: 14px
      }

      .el-input {
        width: 70px;
        height: 30px;
      }

      span {
        color: black;
        margin: 0 10px;
      }
    }
  }
}
</style>