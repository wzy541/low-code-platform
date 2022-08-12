<template>
  <div class="home">
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
          <el-input v-model.number="viewWidth" oninput="value=value.replace(/\D/g,'')" size="mini"></el-input>
          <span>x</span>
          <el-input v-model.number="viewHeight" oninput="value=value.replace(/\D/g,'')" size="mini"></el-input>
        </div>
      </el-row>
    </header>

    <!-- 内容区 -->
    <div class="container">
      <!-- 中间区域 -->
      <div class="middle column">
        <!-- 向画布组件MiddleCanvas传递画布的长宽高 -->
        <MiddleCanvas :viewHeight="viewHeight" :viewWidth="viewWidth"/>
      </div>

      <!-- 左边区域 -->
      <div class="left column">
        <!-- 组件栏 -->
        <ComponentCard/>
      </div>

      <!-- 右边区域 -->
      <div class="right column">
        <!--属性栏-->
        <AttributeCard/>
      </div>

      <!-- 清除浮动 -->
      <div style="clear: both"></div>
    </div>
  </div>
</template>

<script>
// 导入组件栏ComponentCard,画布MiddleCanvas,属性栏AttributeCard
import ComponentCard from "../components/ComponentCard.vue"
import MiddleCanvas from "../components/MiddleCanvas.vue"
import AttributeCard from "../components/AttributeCard.vue"

export default {
  name: 'HomeView',
  components: {
    ComponentCard,
    MiddleCanvas,
    AttributeCard
  },
  data() {
    return {
      // 画布的大小
      viewWidth: 1920,
      viewHeight: 1080
    }
  },
  watch: {
    // 监听画布的大小是否被用户改变(日后需要改一改,让用户输入完再变化或者固定分辨率选择)
    viewWidth(newValue) {
      if (newValue === '') {
        this.viewWidth = 0
      }
    },
    viewHeight(newValue) {
      if (newValue === '') {
        this.viewHeight = 0
      }
    }
  }
}
</script>

<style scoped lang="less">

// 经典样式,不再多叙
.home {
  height: 100%;
  min-width: 1200px;
  max-width: 1920px
}

* {
  margin: 0;
  padding: 0;
}

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
        width: 60px;
        height: 30px;
      }

      span {
        color: black;
        margin: 0 10px;
      }
    }
  }
}

.container {
  padding-left: 250px;
  padding-right: 250px;
  height: calc(100% - 60px);
}

.column {
  float: left;
}

.middle {
  width: 100%;
  height: 100%;
  // background-color: salmon;
  text-align: center;
}

.left {
  width: 250px;
  height: 100%;
  margin-left: -100%;
  position: relative;
  right: 250px;
}

.right {
  width: 250px;
  height: 100%;
  text-align: center;
  // background-color: #bed28c;
  position: relative;
  margin-left: -250px;
  right: -250px;
}

</style>
