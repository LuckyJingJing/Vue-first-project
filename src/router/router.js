//注意这里一定要引入我们路由匹配的组件，之前在main.js里面引入的，是因为我们的之前的路由的配置也是写在了main.js里面

//导入路由组件
import Login from '../component/login/Login.vue';
import Register from '../component/register/Register.vue';
import Admin from '../component/admin/Admin.vue';


//暴露
export default {
  routes: [
    { name: "login", path: "/login",component: Login},
    { name: "register",path: "/register",component: Register},
    { name:"admin", path:"/admin", component: Admin}
  ]
}