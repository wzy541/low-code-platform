<template>
  <div style="text-align: left">
    <div>
      <el-divider content-position="left">大小</el-divider>
      <span>宽度:</span>
      <el-input v-model.number="width" placeholder="请输入宽度" @blur="refreshWidth"
                style="width: 60%;height: 50px"></el-input>
      <br>
      <span>高度:</span>
      <el-input v-model.number="height" placeholder="请输入高度" @blur="refreshHeight"
                style="width: 60%;height: 50px"></el-input>
    </div>
    <el-divider content-position="left">颜色</el-divider>
    <div class="color-area">
      <span>字体颜色</span>
      <el-color-picker v-model="textColor" show-alpha :predefine="predefineColors"
      ></el-color-picker>
    </div>
    <div class="color-area">
      <span>背景颜色</span>
      <el-color-picker v-model="backgroundColor" show-alpha :predefine="predefineColors"
      ></el-color-picker>
    </div>
    <div style="clear: both"/>
    <el-divider content-position="left">文字</el-divider>
    <span>字体:</span>
    <el-autocomplete
        class="inline-input"
        v-model="fontFamily"
        :fetch-suggestions="querySearch"
        placeholder="请选择或输入字体"
        @select="handleSelect"
        style="width: 150px"
    ></el-autocomplete>
    <br>
    <span>大小:</span>
    <el-input v-model.number="fontSize" placeholder="请输入数字" @blur="refreshSize"
              style="width: 150px;height: 50px"></el-input>
    <br>
    <hr>
    图片等以后再弄,先解决实际功能
    <hr>
    <el-button type="danger" style="display: flex;top: 100%"
               @click="deleteElement">删除元素
    </el-button>
    <div class="editable" v-show="attributeDisplay"></div>
  </div>
</template>

<script>
import {getElement} from "@/store";

export default {
  name: "ElementAttribute",
  data() {
    return {
      attributeDisplay: true,
      path: [],
      width: getElement(this.$store.state.pathBuffer).width,
      height: 200,
      textColor: '#000000',
      backgroundColor: '',
      fontFamily: '',
      restaurants: [],//用来暂存数据的地方
      predefineColors: [  //预置颜色
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577'
      ],
      fontSize: 15
    }
  },
  methods: {
    deleteElement() {
      if (this.$store.state.pathBuffer.length === 0) {
        return; //如果pathBuffer中没有数据则不需要操作
      }
      this.$store.commit('deleteLeaves', this.$store.state.pathBuffer);
      this.$store.commit('clearPathBuffer');
    },
    querySearch(queryString, cb) {
      let restaurants = this.restaurants;
      let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return [
        {"value": "微软雅黑"},
        {"value": "宋体"},
        {"value": "华文行楷"},
      ];
    },
    handleSelect(item) {  //获取用户选择的字体,以后要注意添加获取用户输入的功能
      console.log(item);
    },
    refreshWidth() {

    },
    refreshHeight() {

    },
    refreshSize() {

    }
  },
  computed: {
    element() {
      return getElement(this.$store.state.pathBuffer)
    }
  },
  watch: {
    "$store.state.pathBuffer.length"() {
      if (this.$store.state.pathBuffer.length === 0) {
        this.attributeDisplay = true;
        return;
      }
      this.attributeDisplay = false;
      this.path = this.$store.state.pathBuffer;
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
}
</script>

<style scoped>
.color-area {
  float: left;
  text-align: center;
  width: 48%;
  /*clear: both;*/
}

.color-area span {
  display: flex;
  Flex-direction: column;
}

.editable {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(256, 256, 256, 50%);
}

</style>