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
            <el-button class="el-icon-plus" size="mini" plain >新增</el-button>
            <el-button class="el-icon-check" size="mini" plain @click="selectedAll">全选</el-button>
            <el-button class="el-icon-delete" size="mini" plain @click="delData">删除</el-button> 
             <!-- 搜索框 -->
            <el-input style="width:200px; float: right" placeholder="请输入内容" prefix-icon="el-icon-search" size="mini" v-model="getCtList.searchvalue" @keydown.native.enter="searchList"></el-input>    
            <!--因为我们单独写@keydown.enter没有起作用，所以可以判断是不是要跟不是原生事件有关系，所以可以家native来，发现可以实现效果-->
        </div>

        <!-- 表格 -->
        <!--  :data="tableData3"中的：data会自动帮我们便利它后面的写的数组tableData3-->
        <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width:100%;border: 1px solid #eee;" @selection-change="selectionChange    ">
            <!-- 没有type类型就是普通类型, 普通类型可以通过label设置表头 -->
              <!-- 普通类型还通过内嵌template标签, 书写当前列展示的数据 -->
            <el-table-column type="selection" width="55" ></el-table-column>
            <!-- 标题 -->
            <el-table-column label="标题">
                
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" placement="right">
                        <div slot="content">
                            <img style="width:200px":src="scope.row.imgurl" alt="商品预览">
                        </div>
                        <!-- scope.row是固定写法, title是活的, 展示什么字段, 就写什么 -->
                        <router-link :to="{name:'goodsCtEdit',params:{id:scope.row.id}}">{{scope.row.title}}</router-link>
                        
                    </el-tooltip>
                </template>
                
            </el-table-column>
            <!-- 所属类别 -->
            <el-table-column prop="categoryname" label="所属类别" width="100"></el-table-column>
            <!-- 库存 -->
            <el-table-column prop="stock_quantity" label="库存" width="100"></el-table-column>
            <!-- 市场价 -->
            <el-table-column prop="market_price" label="市场价" width="100"></el-table-column>
            <!-- 销售价 -->
            <el-table-column prop="sell_price" label="销售价" width="100"></el-table-column>
            <!-- 属性 -->
            
            <el-table-column label="属性" width="100">
            <!-- 字体图标, 默认为浅灰色, 如果添加active类, 那么就是亮黑色 -->
            <!-- class可以写活, 值可以为一个数组, 里面可以加表达式运算 -->
            <!-- 监听点击事件, 需要把当前商品的id, 修改的字段, 以及该字段新的状态(布尔值)传过去 -->0">
                <template slot-scope="scope">
                    <!--  changStatus(scope.row.id, 'is_slide' ,scope.row.is_slide==1? false:true) 这个方法本来是点击之后向后台请求接口的，但是因为我们没有配置这个接口，所以我们请求不了接口，所以只能用js来实现点击切换颜色的功能-->
                    <span :class="['el-icon-picture' , scope.row.is_slide ==1?'active':'']"
                    @click="changStatus(scope.row.id, 'is_slide' ,scope.row.is_slide==1? false:true)"></span>
                    <span :class="['el-icon-upload2' , scope.row.is_top ==1?'active':'']"
                    @click="changStatus(scope.row.id, 'is_top' ,scope.row.is_top ==1?false:true)"></span>
                    <span :class="['el-icon-star-on' , scope.row.is_hot ==1?'active':'']"
                    @click="changStatus(scope.row.id, 'is_hot' ,scope.row.is_hot ==1?false:true)"></span>                        
                </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column label="操作" width="100">
                <!-- to 属性里面还可以传参， -->
                <template slot-scope="scope"><router-link :to="{name:'goodsCtEdit', params:{id:scope.row.id}}">删除</router-link></template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <!-- size-change 事件处理页码大小
            current-change处理当前页变动时候触发的事件。
            page-sizes接受一个整型数组，数组元素为展示的选择每页显示个数的选项，[100, 200, 300, 400]表示四个选项，每页显示 100 个，200 个，300 个或者 400 个。 -->
        <div class="block">
            <el-pagination
                @size-change="SizeChange"
                @current-change="CurrentChange"
                :current-page="getCtList.pageIndex"
                :page-sizes="page.size"
                :page-size="getCtList.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.totalData">
            </el-pagination>
        </div>
        
    </div>
  </template>
  <script>
    export default{
        data(){
            return{
                tableData3:[],
                getCtList:{
                    pageIndex: 1,
                    pageSize: 10,
                    searchvalue:""
                },
                page:{
                    totalData: 100,
                    size:[10, 20, 30, 40]
                },
                // 声明一个变量存储我们删除事件需要的id
                delIds:''
            }
        },
        
        methods:{
            // 实现搜索功能
            searchList(){
                this.$http.get(this.$api.gsList,{params:this.getCtList}).then(res=>{
                console.log(res);
                this.tableData3 = res.data.message;
                this.page.totalData = res.data.totalcount;
            })
            },
            // 切换属性中图片的状态
            changStatus(id,type,newStatus){
                // 以 =  号为分割点 等号后面的newStatus? 1: 0 是一个三元表达式。因为newStatus是一个，是我们给标签绑定点击事件的时候，通过判断渲染的数据中scope.row.is_top ==1 的时候我们自己设定让它显示黑色，不是就是我们自己设置的默认色灰色，因为我们要实现的效果是点击的时候改变它的class 是否有active 点击之前，我们设定是1的时候true，不是1的时候为false，所以在传参的时候，改变它的状态，让它相反，然后传参的时候，再根据改变的状态，来改变这个属性对应的值，如：当它为1的时候是黑色（判断是1的时候就为true），我们点击的时候让它变为不是1，也就是给它一个false的状态，那么我们传值 的时候也就传的false我们再根据这个传值的状态来进行三元表达式，重新返回一个1或者0把返回的这个值赋值给原来数据中的这个属性，那么这个属性对应的值就和原来不一样了。我们标签中class中的三元表达式的判断，也就重新返回一个变换后的值了，那么我们在下面传的参数也就是false因为在返回的数据中scope.row.is_topboolean类型，所以不是true就是false 所以为false就返回0 ，为true就返回1，因为
                this.tableData3.filter(goods => goods.id == id)[0][type] = newStatus? 1: 0;
                console.log(this.tableData3.filter(goods => goods.id == id)) //打印出来是[{…}] ->0:{…} ， 是一个数组，数组里面只有一个对象。也就是数组的第0项是一个对象

            },
            //分页里面的改变每页显示多少条数据的事件，处理页码大小
            SizeChange(val){
                //当我点击,重新调用接口，渲染数据，但是点击的时候，要让后台知道我选中的是每页显示多少条，这个组件的内置方法，只要我选中了这个参数就是我选中的数据，这个val是一个形参，我们可以写成其它
                this.getCtList.pageSize = val;
                this.searchList();
            },
            //分页里面的改变当前页的事件 处理当前页变动时候触发的事件。
            //同上一样，点击的时候，就能获取我点击的是第几页,这个val就是我点击的要当前页的页数
            CurrentChange(val){
                //告诉浏览器我们点击的第几页，
                this.getCtList.pageIndex =val;
                //请求接口，将第几页传递给后台，重新获得数据渲染页面
                this.searchList();
  
            },
            
            //实现点击删除按钮的时候，删除我们选中的数据，selection-change是表格组件的事件类型（文档上面提供的），我们要给表格注册这个事件，@selection-change='selectionChange'事件，这个事件类型有一个selection参数。通打印这个参数我们可以看出这个参数获取的是我们勾选的所有的数据的的数组，那么我们可以在data()的返回值中声明一个变量来储存我们获到的数据中的id 因为我们点击删除调用后台接口的时候，根据文档我们需要传一个ids的参数，这个参数是一个字符串，所以我们要将我们的id存起来
            selectionChange(selection){
                // console.log(selection); //打印出来的是我们的整个对应一条的所有的数据，
                //selection.map(v=>v.id) 中的v代表我们selection数组中的每一项，返回的是数组中每一项的id，返回的是一个数组，但是我们传参是要求是字符串，所以用数组的join方法把数组转换为字符串
                this.delId = selection.map(v=>v.id).join(",");
                console.log(this.delId);
            },
            //点击删除的时候调用后台接口
            del(){
                //调用后台接口的时候，一定要分清楚我们传参的方式，如果后台接口后面是写的/：+参数名  那么我们在调用接口的时候就要用+ 号来连接我们后面要传的参数， 如：this.$http.get(this.$api.gsDel + this.delId)  如果是另外的形式就要以get或者post传参的方式（对象）的形式传过去如：getthis.$http.get(this.$api.gsList,{params:this.getCtList})   如post  this.$http.post(this.$api.login,this.ruleForm2)  可以很明显的看到post是用都好隔开的，传的是一个对象，而+号就只是传了一个参数，并不是以键值对的形式传参
                this.$http.get(this.$api.gsDel + this.delId).then(res=>{
                    if(res.data.status == 0){
                        //满足条件的时候，表示删除成功，这个时候我们要重新调用查询所有商品的数据接口，重新渲染页面
                        this.searchList();
                        //删除成功之后，我们要把我们之前存在了delId里面的值清空，因为我们删除成功之后delId中对应的id的数据已经没有了，我们可以把它清空
                        this.delId='';
                        //为了用户的友好体验我们应该在删除数据之前询问用户是否真的需要删除该数据，点击确认的时候，才真正的删除，点击取消的时候就不删除

                    }
                })
            },
            delData(){
                //所以点击删除的时候，我们要弹出框询问用户是否真的删除
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.del();
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            
            //实现点击全选按钮的时候，全部选中我们的每一行的
            selectedAll(){
                //因为我们用的是element-ui组件，上面的每一个标签都是组件，在打开页面的时候都被解析成了别的标签，所以我们在这些标签即使加上了ref也获取不到这个元素，所以只能用js 根据解析之后的标签的class的类名来获取这个标签，因为这个标签被点击的时候，下面所有的小标签都被选中了，所以我们只需要在点击全选按钮的时候，让这个标签被点击就可以了
                document.querySelector(".el-checkbox__inner").click();
            }
            

        },
        //组件初始化完毕之后立马调用接口
        created() {
            this.searchList();
        },
        
    }
  </script>
  <style scope lang="less">  
    /* 设置属性的样式，最开始的时候根据后台传回来的数据来设置颜色，为1的时候就是黑色，为0的时候为灰色，点击的时候切换颜色 ，先默认设置为灰色*/
    [class^=el-icon]{
        color: #ccc;
    
        &.active{
            color: #000
            
        }
    }
    
  </style>