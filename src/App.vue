<template>
  <div id="app">
    <!-- 标题(头部) -->
    <header>
      <TheHeader/>
    </header>

    <!-- 内容区 -->
    <div class="container">
      <!-- 中间区域 -->
      <div class="middle column">
        <MiddleCanvas/>
      </div>
      <!-- 左边区域 -->
      <div class="left column">
        <!-- 组件栏 -->
        <ComponentCard/>
      </div>
      <!-- 右边区域 -->
      <div class="right column">
        <!--属性栏-->
        <EditCard/>
      </div>
      <!-- 清除浮动 -->
      <div style="clear: both"></div>
    </div>
  </div>
</template>

<script>
import ComponentCard from './components/ComponentCard'
import MiddleCanvas from './components/MiddleCanvas'
import EditCard from './components/EditCard'
import TheHeader from "@/components/TheHeader";

export default {
  name: 'App',
  components: {
    TheHeader,
    ComponentCard,
    MiddleCanvas,
    EditCard
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding:0;
  margin:0;
  width: 100%;
  height: 100%;
  min-width: 1200px;
  max-width: 1920px
}
* {
  margin: 0;
  padding: 0;
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
  /*background-color: salmon;*/
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
  /*background-color: #bed28c;*/
  position: relative;
  margin-left: -250px;
  right: -250px;
}

</style>
