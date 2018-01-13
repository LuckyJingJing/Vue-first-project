<template>
  <div>登陆组件</div>
</template>
<script>
export default{
data(){
    return {

    }
  },
  //这个是生命周期函数（钩子函数），也就是在实例被创建之后就会自动被调用
  created(){
    this.$http.get(this.$api.islogin).then(res=>{
      console.log(res);
    })
  }
}
</script>
<style>

</style>
