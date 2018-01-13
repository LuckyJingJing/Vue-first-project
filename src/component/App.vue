<template>
  <div>
    公共头部
    <router-view></router-view>
    Rate 评分
    <el-rate
      v-model="value"
      :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
    </el-rate>
    <el-rate
      v-model="value2"
      :icon-classes="['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3']"
      void-icon-class="icon-rate-face-off"
      :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
    </el-rate>
    公共底部
  </div>
</template>
<script>
export default{
  data(){
    return{
      value: 1,
      value2: null
    }
  }
}
</script>
<style>

</style>
