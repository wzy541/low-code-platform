<template>
  <div class="AttributeCard">
    <el-tabs type="border-card" stretch>
      <!-- 样式属性 -->
      <el-tab-pane label="属性">
        <ElementAttribute/>
      </el-tab-pane>
      <!-- 添加事件 -->
      <el-tab-pane label="事件">
        <ElementEvent/>
      </el-tab-pane>
      <!-- 添加动画 -->
      <el-tab-pane label="动画">
        <ElementAnimation/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ElementEvent from "@/components/EditProperties/ElementEvent";
import ElementAttribute from "@/components/EditProperties/ElementAttribute";
import ElementAnimation from "@/components/EditProperties/ElementAnimation";
import 'animate.css'
export default {
  // 属性栏
  name: 'EditCard',
  components: {ElementAttribute, ElementEvent,ElementAnimation},
  data() {
    return {

    }
  },
  methods: {
  },
  computed:{
  }
}
</script>

<style lang="less" scoped>
//样式,没啥好说的
.AttributeCard {

  height: calc(100% - 40px);

  .el-tabs {
    margin-top: 20px;
    margin-right: 10px;
    height: 100%;
  }
}


</style>
