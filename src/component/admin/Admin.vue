<!-- 分析：这个页面又一个头部，又一个左边的侧边栏都是固定的，在点击左边的菜单栏的时候，中间的部分改变显示不同的页面，所以，这个admin.vue的组件的根节点里面有两个子组件header（头部） 和aside（侧边栏）还有一个router-view标签，用来显示不同的页面，通过点击左边的侧边栏的菜单用router-link来包裹，这样就能实现点击显示不同的页面的效果-->
<template>
    <div>
      <Aside></Aside>
      <Header></eader>
    </div>
</template>
<script>
  //组件里面包含子组件用components，这两个组件分别都是单独写一个组件文件,所以这里要引入
  import Header from './common/Header.vue';
  import Aside from './common/Aside.vue';
    
  export default{
    components:{
      //写子组件的名字
      Header,
      Aside
    }
  }
</script>
<style>

</style>       