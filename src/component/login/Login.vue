<template>
  <div class="login">
    <h2>后台管理系统</h2>
    <el-form  :model="ruleForm2" :rules="rules" ref="ruleForm2" class="demo-ruleForm">
       <!--因为我们是向后台发送请求判断我们的用户名和密码，所以需要传参给我们的后台，我们就需要根据文档来设置我们需要传参的名字是什么,文档规定请求的参数名字为uname 和 upwd 所以我们在data返回的值里面就要写成这两个，这两个键的值就是我们要自己输入在input里面的值，所以我们要用双向数据绑定，v-model来获取我们输入的值，并在我们data（）返回的值里面也拿到这个值，因为我们要将这两个键值对发送请求的时候传递给后台-->
    <el-form-item label="账户" prop="uname">
      <el-input type="text" v-model="ruleForm2.uname" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="upwd">
      <el-input type="password" v-model="ruleForm2.upwd" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
      <el-button @click="resetForm('ruleForm2')">重置</el-button>
    </el-form-item>
    </el-form>
  </div>
</template>
<script>
    export default{
      data(){
        //校验用户名
        function judgeUname(rule, value, callback){
          if (value === '') {
            callback(new Error('请输入用户名'));
          } else {
            callback();
          }
        }
        //校验密码
        function judgeUpwd(rule, value, callback){
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            callback();
          }
        }
        return{
          ruleForm2:{
            uname:'',
            upwd :''
          },
          rules: {
            uname: [
              { validator: judgeUname, trigger: 'blur' }
            ],
            upwd: [
              { validator: judgeUpwd, trigger: 'blur' }
            ]
          }
        }
        
      },
      methods:{
        // 点击提交的时候发送请求到后台，并把用户名和密码传给后台，后台根据我们传递过去的参数，得到一个返回值，是res对象，如果res.data.status == 0 说明密码和用户名正确，那么我们就可以跳到后台管理系统页面也就是admin页面。
        //在点击提交之前要先进行校验，校验通过之后我们再能向后台发送请求，所以是在判断校验成功之后调用这个发送请求的方法
        login(){
          this.$http.post(this.$api.login,this.ruleForm2).then(res=>{
            if(res.data.status == 0){
              this.$alert("登陆成功");
              this.$router.push({name:"admin"})
            }else{
              this.$alert(res.data.message)
            }
          })
        },
        //这里面的形参formName就是在标签里面写注册的点击事件里面传的参数，这个参数是表单的名字，下面的这个代码this.$refs[formName]，就是获取我们的整个表单元素
        submitForm(formName) {
          // 这里的formName只能用[]，不能用.点的形式，如果是点的形式，就是写死了，上面传的是形参，就是为了当我们标签里面注册的点击事件里面传的表单的名字发生改变的时候，这里不用修改，用.的方式写的话，它就不会随着上面传的参数的改变而改变了，用[]才能随着改变
          // console.log(this.$refs[formName])
        this.$refs[formName].validate((valid) => {
          // 当校验都满足的时候，valid就是true，否则就是false，vaild是一个形参，可以改成其它的单词，但是改了之后if也要跟着改变
          if (valid) {
            // console.log(valid)  这里打印的就是true
            this.login();
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
      }
    }
</script>
<style scoped>
  .login{
    width: 400px;
    height: 206px;
    border: 1px solid #fff;
    margin: 0 auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    padding:20px;
    box-sizing: border-box;
    text-align: center;
  }
  .el-input{
    width: 88%;
  }
  .el-form-item:nth-of-type(3){
    margin: 0;
  }
  h2{
    color: #fff;
    width: 100%;
    position: absolute;
    top: -66px;
    left: 0;
  }
</style>
