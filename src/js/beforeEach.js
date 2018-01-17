//引入aixos和api文件
import axios from 'axios';
import api from './api.js';


////当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 等待中。
export default function(to,from,next){
  // console.log(to);  //打印出来里面有一个name属性对应的就是我们路由规则里面写的name属性
  // console.log(from);
  //1.获得我们要去的url
  var toUrl = to.name;
  //2.调用后台的接口，根据后台接口返回的数据来判断用户是否登陆了，因为这里不是一个组件，也不是用Vue来写，
  //是路由的一个方法，所以this.$http和this.$api都不能用，所以我们要用axios来发送请求,所以我们要引入axios
  //还要引入api


  var flag = false;
  //注意 ******这个请求的目的就只是在乎判断我们是否登陆了，我们在这里立了一个flag标志，用这个flag的true和false来知道我们是否登陆了，这个调用接口并没有其他的作用了，所以按照常理我们下面的另一个if判断是完全可以写在这个请求的外面的，但是这里却不能写在外面。必须写在这个调用接口的里面，因为这个请求是异步的，如果我们把下面的另一个if判断写在了外面，那么上面的这个请求和下面的if判断的代码就有可能同时执行，也就是说就有可能还没判断出flag为true还是false的时候，下面的if代码就已经执行了，那么下面的if代码执行的时候，我们的flag就只是我们声明的时给的false值。所以我们要把下面的另一个if判断也包在这个请求里面写。
  axios.get(api.isLogin).then(res=>{
    if(res.data.code == "logined"){
      flag = true;
    }
    //注意****** 虽然上面
    if(toUrl == "login" && flag){
      //满足条件表示已经登陆过，那么我们直接帮用户跳转到首页
      next("/admin")
    }else if(toUrl != "login" && flag == false){
      //满足条件表示用户没有登陆过那么，那么我们要跳转到登陆页面,并把当前页面通过url参数记录下来
      next({ name: "login" , query : {nextPage : to.fullPath } });  //fullpath是带参数的，path是不带参数的
      next({ name: 'login', query: { nextPage: to.fullPath } });
    }else{
      //这里加一个else的判断是因为，无论如何这个next()都要被执行
      next();
    }
  });
}
