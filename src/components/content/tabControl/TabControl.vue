<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="item"
      class="tab-control-item"
      :class="{ active: index === currentIndex }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    
    itemClick(index){
      this.currentIndex = index
      this.$emit('tabclick', index) //把点击事件传出
    }
  },
};
</script>

<style>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background: #fff;
}
.tab-control-item {
  flex: 1;
}
.active span{
color: var(--color-high-text);
border-bottom: var(--color-tint) solid 3px;
padding: 0 3px 3px;
}
</style>