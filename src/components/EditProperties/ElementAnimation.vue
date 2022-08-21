<template>
  <div>
    请选择动画效果:
    <el-select v-model="effect" placeholder="请选择">
      <el-option
          v-for="item in AnimationOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
    <el-divider content-position="center">样例</el-divider>
    <div class="canvas">
      <h1 :class="'animate__animated '+ effect">动画</h1>
    </div>
    <br>
    <el-button type="primary" @click="addAnimate">确定</el-button>
  </div>
</template>

<script>
export default {
  name: "ElementAnimation",
  data() {
    return {
      effect: '',
      // AnimationClass:'animate__zoomIn',
      AnimationOptions: [
        {
          value: '',
          label:'无'
        },
        {
          value: 'animate__bounce',
          label: 'bounce'
        },
        {
          value: 'animate__flash',
          label: 'flash'
        },
        {
          value: 'animate__pulse',
          label: 'pulse'
        },
        {
          value: 'animate__shakeX',
          label: 'shakeX'
        },
        {
          value: 'animate__shakeY',
          label: 'shakeY'
        },
      ]
    }
  },
  methods: {
    addAnimate() {
    }
  }
}
</script>

<style scoped>

.canvas {
  margin: 0 auto;
  display:table-cell;
  vertical-align: middle;
  /*height: inherit; !* 继承高度 *!*/
  width: 200px;
  height: 200px;
  background: -webkit-linear-gradient(top, transparent 40px, gray 41px), -webkit-linear-gradient(left, transparent 40px, gray 41px);
  background-size: 41px 41px;
  border: 1px outset #2c3e50;
  background-color: white;
  /*能通过设置background-color来解决, 但是报弱警告, 难受*/
}

</style>