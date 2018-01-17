<template>
  <div>
    <span class="el-icon-menu"></span>
    <el-dropdown>
      <span class="el-dropdown-link">
          你好{{uname}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>login</el-dropdown-item>
        <!-- 默认情况下, 监听组件的事件都是监听组件自己emit发射的事件 -->
        <!-- 如果要监听浏览器原生事件, 添加一个native修饰符即可 ,判断是不是浏览器的原生事件主要是我们自己试了之后才知道，如果我们直接注册clcik事件不起作用的时候，就要加native，如果起作用的话就不需要加，没有明确的分什么是原生事件什么不是原生事件-->
        <el-dropdown-item @click.native="logout">logout</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
    
</template>
<script> 
  export default{
    data(){
      return{
        uname:"admin"
      }
    },
    methods:{
      logout(){
        //点击退出的时候向后台发送请求
        this.$http.get(this.$api.logout).then(res=>{
          console.log(res);
          if(res.data.status == 0){
            this.$router.push({name:"login"})
          }else{
            this.$alert(res.data.message)
          }
        })
      }
    }
  }
</script>
<style scoped>
  div{
    line-height: 60px;
  }
  .el-icon-menu{
    font-size: 24px;
  }
  .el-dropdown{
    float: right;
  }
</style>       