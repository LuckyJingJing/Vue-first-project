<!-- 分析：这个页面又一个头部，又一个左边的侧边栏都是固定的，在点击左边的菜单栏的时候，中间的部分改变显示不同的页面，所以，这个admin.vue的组件的根节点里面有两个子组件header（头部） 和aside（侧边栏）还有一个router-view标签，用来显示不同的页面，通过点击左边的侧边栏的菜单用router-link来包裹，这样就能实现点击显示不同的页面的效果-->
<template>
  <el-container>
    <!-- 页面左侧 -->
      <el-aside width="200px" style="background:rgb(38,124,183)"><Aside></Aside></el-aside>
      
      <!-- 页面右侧 -->
      <el-container>
        <!-- 右侧头部 -->
        <el-header>
          <Header></Header>
        </el-header>
         <!-- 右侧主体, 将来通过路由控制 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
  </el-container>
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
  .el-container{
    width: 100%;
    height: 100%;
  }
  .el-header{
    background-color: #B3C0D1;
    color: #333;
    background: #fff;
    border-bottom: 1px solid #ccc;
  } 
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
  }
  .el-main {
    background-color: #E9EEF3;
    background: #fff;
  }
</style>       