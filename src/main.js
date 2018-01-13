//引入全局默认初始化样式
import 'normalize.css';
//引入我们自己的样式
import './less/index.less'

//1.导入第三方包
import Vue from 'vue';
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

//3.导入根组件
import App from './component/App.vue';

//5.导入路由插件
import VueRouter from 'vue-router';

//手动使用路由插件
Vue.use(VueRouter);
Vue.use(ElementUi);

//6.导入路由配置文件
import Router from './router/router.js';

//8.导入axios插件  因为它不是vue的插件，所以不需要use
import axios from 'axios';

//9.把axios加到Vue的原型里面,这样在其它的组件里面使用axios的时候，不需要每次都要引入，就可以直接用this.点出来
// axios.get('http://157.122.54.189:9095/admin/account/islogin').then(res=>console.log(res));
//注意这里的defaults 有s  不要写成了defaults
axios.defaults.baseURL = 'http://157.122.54.189:9095'; //一配置之后，以后所有的请求都会使用这个域名
Vue.prototype.$http =axios;

//10.导入api路径文件
import api from './js/api.js';
Vue.prototype.$api = api;

//2.创建Vue实例
new Vue({
  el:"#App",
  //7.挂载路由到Vue实例上面
  router: new VueRouter(Router),
  //4.挂载根组件
  render:function(createElement){
    return createElement(App)
  }
  // render:c=>c(App) //上面的挂载根组件可以这么写es6箭头函数

})