<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>购物商城</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <!-- <el-breadcrumb-item :to="{ name: 'admin' }">首页</el-breadcrumb-item>             -->
            <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 按钮 -->
        <div style="margin: 20px 0" >
            <el-button class="el-icon-plus" size="mini" plain>新增</el-button>
            <el-button class="el-icon-check" size="mini" plain>全选</el-button>
            <el-button class="el-icon-delete" size="mini" plain>删除</el-button>            

        </div>
    </div>
  </template>
  <script>
  export default{
    
  }
  </script>
  <style scoped>  

  </style>