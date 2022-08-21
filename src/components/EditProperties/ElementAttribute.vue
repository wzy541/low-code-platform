<template>
  <div>
    <div>
      <el-divider content-position="left">大小</el-divider>
      <span>宽度:</span>
      <el-input v-model="elementWidth" placeholder="请输入宽度"
                style="width: 60%;height: 50px"></el-input>
      <br>
      <span>高度:</span>
      <el-input v-model="elementHeight" placeholder="请输入高度"
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
    <el-input v-model="fontSize" placeholder="请输入大小" @blur="refreshSize"
              style="width: 150px;height: 50px"></el-input>
    <br>
    <hr>
    图片等以后再弄,先解决实际功能
    <hr>
    <br>
    <el-button type="danger"
               @click="deleteElement">删除元素
    </el-button>

    <div class="editable" v-if="attributeDisplay"></div>
  </div>
</template>

<script>

export default {
  name: "ElementAttribute",
  data() {
    return {
      attributeDisplay: true,
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
    }
  },
  methods: {
    deleteElement() {
      if (this.$store.state.pathBuffer.length === 0) {
        return; //如果pathBuffer中没有数据则不需要操作
      }
      this.$store.commit('deleteLeaves', this.$store.state.pathBuffer);
      this.$store.commit('clearBuffer');
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


    refreshSize() {

    }
  },
  computed: {
    elementWidth: {
      get() {
        if (this.$store.state.elementBuffer === null) {
          return this.$store.state.domTree.style.width;
        } else {
          return this.$store.state.elementBuffer.style.width;
        }
      },
      set(value) {
        this.$store.commit('refreshWidth', value);
      }
    },
    elementHeight: {
      get() {
        if (this.$store.state.elementBuffer === null) {
          return this.$store.state.domTree.style.height;
        } else {
          return this.$store.state.elementBuffer.style.height;
        }
      },
      set(value) {
        this.$store.commit('refreshHeight', value);
      }
    },
    textColor: {
      get() {
        if (this.$store.state.elementBuffer === null ||
            this.$store.state.elementBuffer.style.textColor === null ||
            this.$store.state.elementBuffer.style.textColor === '') {
          return '#000000';
        }else {
            return this.$store.state.elementBuffer.style.color;
          }

      },
      set(value) {
        console.log(value);
        this.$store.commit('refreshColor', value);
      }
    },
    backgroundColor: {
      get() {
        if (this.$store.state.elementBuffer === null ||
            this.$store.state.elementBuffer.style.fontSize === null ||
            this.$store.state.elementBuffer.style.fontSize === '') {
          return 'rgba(0, 0, 0, 0)';
        } else {
          return this.$store.state.elementBuffer.style.backgroundColor;
        }

      },
      set(value) {
        this.$store.commit('refreshBackgroundColor', value);
      }
    },
    fontFamily: {
      get() {
        if (this.$store.state.elementBuffer === null ||
            this.$store.state.elementBuffer.style.fontFamily === null ||
            this.$store.state.elementBuffer.style.fontFamily === '') {
          return '';
        } else {
          return this.$store.state.elementBuffer.style.fontFamily;
        }
      },
      set(value) {
        console.log(value);
        this.$store.commit('refreshFontFamily', value);
      }
    },
    fontSize: {
      get() {
        if (this.$store.state.elementBuffer === null ||
            this.$store.state.elementBuffer.style.fontSize === null ||
            this.$store.state.elementBuffer.style.fontSize === '') {
          return '';
        } else {
          return this.$store.state.elementBuffer.style.fontSize;
        }
      },
      set(value) {
        this.$store.commit('refreshFontSize', value);
      }
    },
  },
  watch: {
    '$store.state.elementBuffer'() {
      this.attributeDisplay = this.$store.state.elementBuffer === null;
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