<template>
    <div class="box">
        <!-- ruleForm 是一个对象，是这个组件自带的功能，所以我们只要把我们要渲染的数据放在里面，用ruleForm.属性的方式就能渲染在我们的页面上面-->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"  style="width: 600px">

            <!-- 标题 -->
            <el-form-item label="标题" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>

            <!-- 副标题 -->
            <el-form-item label="副标题" prop="sub_title">
                <el-input v-model="ruleForm.sub_title"></el-input>
            </el-form-item>

            <!-- 所属类别 -->
            <el-form-item label="所属类别" prop="category_id">

                <!-- v-model绑定数据, 将来要和每个option的value值进行匹配, 匹配到哪个默认就会选中那个 -->
                <el-select v-model="ruleForm.category_id" placeholder="请选择活动区域">
                    <!-- categoryList是请求接口获取到的分类列表, 将来用户要选择其中一个分类的ID传给后端 -->
                    <!-- 要想让我们点击选中的内容显示在框框中，那么我们要保证:value后面的值和v-model里面的值是一样的，category_id都是同一个但是ruleForm.category_id是字符串，而item.category_id这个里面的是number,所以页面一加载的时候，框里面显示的数字，而不是对应名字，所以要在下面获取数据填充的时候，将ruleForm.category_id转换为number -->
                    <el-option v-for="(item,index) in categoryList" :key="item.category_id" :label="item.title" :value="item.category_id">

                        <!-- 给分类中的子分类加上标记，那么我们可以把{{item.title}}重新写在一个标签里面，但是上面的:label="item.title" 这个不能删，删了之后框框里面就不能显示我们选中的字，而是对应的数字 -->
                        <span>
                            <span v-if="item.class_layer !=1 ">></span>
                            <span>{{item.title}}</span>                        
                        </span>
                    </el-option>

                    <!-- option标签内可以嵌套子标签, 但是option的label属性不能删掉 -->
                    
                </el-select>
            </el-form-item>

            <!--滑动按钮-->
            <el-form-item label="是否发布" >
                <el-switch v-model="ruleForm.status"></el-switch>
            </el-form-item>
            <el-form-item label="推荐类型">
                <el-switch active-text="轮播图" v-model="ruleForm.is_slide"></el-switch>
                <el-switch active-text="置顶" v-model="ruleForm.is_top"></el-switch>
                <el-switch active-text="热门" v-model="ruleForm.is_hot"></el-switch>            
            </el-form-item>

            <!-- 上传封面 -->
            <!-- action属性用来设置图片上传地址，file-list属性用来关联图片列表-->
             <!-- on-preview与on-remove用来添加回调函数的, 注意他们是属性的方式添加 -->
             <!-- on-success	文件上传成功时的钩子	function(response, file, fileList)
             <!-- on-remove	文件列表移除文件时的钩子	function(file, fileList) -->
            <el-form-item label="上传封面" prop="imgList">
                <!-- 注意更改action地址的时候，一定要核对请求协议和ip协议有两种要看清是http还是https， -->
                <el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadimg"
                    :on-success="imgUploaded" :on-remove="imgRemove" :file-list="ruleForm.imgList"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item> 

            <!-- 上传附件 -->
            <el-form-item label="上传附件">
            <el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadfile"
                :on-success="fileUploaded" :on-remove="fileRemove" :file-list="ruleForm.fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            </el-form-item>
            <!-- 商品货号  -->
            <el-form-item label="商品货号">
                <el-input v-model="ruleForm.goods_no"></el-input>
            </el-form-item>

            <!-- 库存数量  -->
            <el-form-item label="库存数量" >
                <el-input v-model="ruleForm.stock_quantity"></el-input>
            </el-form-item>

            <!-- 市场价格  -->
            <el-form-item label="市场价格">
                <el-input v-model="ruleForm.market_price"></el-input>
            </el-form-item>

            <!-- 销售价格  -->
            <el-form-item label="销售价格">
                <el-input v-model="ruleForm.sell_price"></el-input>
            </el-form-item>
            
            <!-- 摘要 -->
            <el-form-item label="内容摘要" prop="zhaiyao" style="width: 100%">
                <el-input type="textarea" v-model="ruleForm.zhaiyao"></el-input>
            </el-form-item>

            <!--内容 -->
            <el-form-item label="内容详情" style="width:1000px">
            <!-- bidirectional data binding（双向数据绑定） -->
                <quill-editor v-model="ruleForm.content"></quill-editor>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
            <el-button >返回上一页</el-button>
            </el-form-item>
        </el-form>
    </div>
  </template>
  <script>
    //导入富文本插件样式与组件 
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import { quillEditor } from 'vue-quill-editor'

      export default {
        components: {
            quillEditor
        },
        data() {
            // 验证图片
            function validateImg(rule, value, callback){
                console.log(value)
                if (value === '' || value.length == 0) {
                callback(new Error('请上传一张封面'));
                } else {
                callback();
                }
            }
            return {
                //显示数据需要的对应的id
                id:null,
                //填充内容需要的数据
                ruleForm: {},
                //分类列表的数据
                categoryList:[],

                //验证的规则
                rules: {
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' },
                        { min: 5, max: 50, message: '长度在 5 到 50 个字符', trigger: 'blur' }
                    ],
                    sub_title: [
                        { required: true, message: '请输入副标题', trigger: 'blur' },
                        { min: 5, max: 50, message: '长度在 5 到 50 个字符', trigger: 'blur' }
                    ],
                    goods_no: [
                        { required: true, message: '请输入商品编号', trigger: 'blur' }
                    ],
                    stock_quantity: [
                        { required: true, message: '请输入库存', trigger: 'blur' }
                    ],
                    market_price: [
                        { required: true, message: '请输入市场价', trigger: 'blur' }
                    ],
                    sell_price:  [
                        { required: true, message: '请输入销售价', trigger: 'blur' }
                    ],
                    zhaiyao: [
                        { required: true, message: '请输入摘要', trigger: 'blur' },
                        { min: 20, message: '长度不能少于20', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请输入商品详细信息', trigger: 'blur' },
                        { min:1000, message: '长度在 1000', trigger: 'blur' }
                    ],
                    imgList: [
                        //图片的验证可以单独写一个方法来验证
                        { required: true, validator: validateImg, message: '请上传图片'}
                    ]
                }
            }
        },
        methods: {

            //获取对应id的数据，填充
            getContent(){
                this.$http.get(this.$api.gsDetail + this.id).then(res=>{
                    // console.log(res);
                    // 获取数据之后,把我们整个表单要渲染的数据,存到组件里面的那个数组里面
                    this.ruleForm = res.data.message;
                    //因为res.data.message这个里面返回的数据的category_id是string类型,而我们获取分类里面的category_id是number,所以我们要把这里面的category_id转换为number，如果不转的话，页面一加载完框框里面显示的是数字而不是对应的名字
                    this.ruleForm.category_id = +this.ruleForm.category_id;
                });
            },

            //获取分类数据，显示到下拉框里面
            getCategory(){
                this.$http.get(this.$api.ctList +  "goods").then(res=>{
                    // console.log(res);
                    this.categoryList = res.data.message;
                })
            },

            //编辑成功之后，点击提交调用后台接口将修改好的数据发送给后台,根据文档，我们需要传我们修改的数据的对应的id还有所有修改好之后的内容
            editContent(){
                this.$http.post(this.$api.gsEdit +this.id, this.ruleForm).then(res=>{
                    //提交数据成功之后页面跳转到对应商品列表的页面
                    if(res.data.status == 0){
                        //提示用户修改成功
                        // this.$alert("保存成功")****
                        // this.$rotuer.push({ name: "GoodsCtList" });****
                        //注意因为alert是异步的，所以我们像上面那样写就是错误的，上面会同时进行，会出现问题
                        this.$alert('马上跳回商品列表页', '修改成功',{
                            confirmButtonText: '确定',
                            callback:action=>this.$router.push({ name: "goodsCtList" })
                            
                           
                        })
                        
                    }
                      
                })
            },
            //封面上传成功之后的回调
            imgUploaded(res,file,fileList){
                // console.log(res,file,fileList)
                //res返回的就是就是我们的图片列表，包含了所有的图片的信息
                //因为我们的后台接口规定了只能上传一张图片，所以我们上传图片只能覆盖之前的
                this.ruleForm.imgList=[res];
            },

            //删除封面图
            //1.获取file.url信息
            //2.然后遍历this.ruleForm.imgList 从中删除掉与之相同的url的图片数据,因为最后我们要传所有的数据给后台，那么我们要将我们删除的图片在imgList中删除掉，那么我们传数据的时候才是传的删除完这个图片之后的数据
            imgRemove(file, fileList){
                // console.log(file,fileList);
                //删除图片的时候，也要向后台发送请求
                this.ruleForm.imgList=this.ruleForm.imgList.filter(v=>v.url!=file.url)
            },

            //删除文件
            
            fileRemove(file, fileList){
                console.log(file)
                this.ruleForm.fileList=this.ruleForm.fileList.filter(v=>v.url!=file.url)
            },
            
            //文件上传成功之后的回调
            fileUploaded(res,file,fileList){
                // console.log(res,file,fileList)
                //同上。但是文件可以上传多个，
                this.ruleForm.fileList.push(res);
            },
            //点击提交的时候，验证校验是否都满足
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    //满足条件表示校验都满足条件，那么我们就要调用后台接口，将修改好的数据发送给后台
                    this.editContent();
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            },
            //组件初始化的时候，1.我们就要获取对应id的数据，进行填充 2.获取分类数据，渲染在分类选项上面
            created(){
                //1.获取数据，填充内容
                //获取id，因为在其他地方也需要用到这个id，所以我们获取id之后在data的返回的数据里面声明一个id并给他赋值成我们获取的这个id
                this.id = this.$route.params.id;
                this.getCategory();
                this.getContent();
            
            }
    }
  </script>
  <style scoped lang="less">


  </style>