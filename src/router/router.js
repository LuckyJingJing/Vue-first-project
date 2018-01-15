//注意这里一定要引入我们路由匹配的组件，之前在main.js里面引入的，是因为我们的之前的路由的配置也是写在了main.js里面

//导入路由组件
import Login from '../component/login/Login.vue';
import Admin from '../component/admin/Admin.vue';

//导入商品管理里面的内容管理组件
import GoodsCtList from '../component/admin/goods/goodsCtList/goodsCtList.vue';
import GoodsCtAdd from '../component/admin/goods/goodsCtList/goodsCtAdd.vue';
import GoodsCtEdit from '../component/admin/goods/goodsCtList/goodsCtEdit.vue';
//导入商品管理里面的分类管理组件
import GoodsCgList from '../component/admin/goods/goodsCgList/goodsCgList.vue';
import GoodsCgAdd from '../component/admin/goods/goodsCgList/goodsCgAdd.vue';
import GoodsCgEdit from '../component/admin/goods/goodsCgList/goodsCgEdit.vue';

let childrenList=[
  //商品管理-> 内容管理
  {name:"goodsCtList",path:"goods/contents/list", component: GoodsCtList},
  {name:"goodsCtAdd",path:"goods/contents/add", component: GoodsCtAdd},
  {name:"goodsCtEdit",path:"goods/contents/edit/id", component: GoodsCtEdit},
  //商品管理-> 分类管理
  {name:"goodsCgList",path:"goods/category/list", component: GoodsCgList},
  {name:"goodsCgAdd",path:"goods/category/add", component: GoodsCgAdd},
  {name:"goodsCgEdit",path:"goods/category/edit/id", component: GoodsCgEdit}
  
]
//暴露
export default {
  routes: [
    { name: "login", path: "/login",component: Login},
    {path:"/",redirect: "/admin" },
    { name:"admin", path:"/admin", component: Admin, children:childrenList}
  ]
}