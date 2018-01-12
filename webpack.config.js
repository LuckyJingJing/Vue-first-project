var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
 // 入口文件配置
 entry: "./src/main.js",

 // 出口文件配置项
 output: {
   // 输出的路径，通常到绝对路径
   path: path.join(__dirname, 'dist'),
   // 静态资源在服务器上运行时的访问路径，可以直接http://localhost:8080/dist/bundle.js访问到服务器中的bundle.js文件
//    publicPath: '/dist',   //在html的webpack中 注意需要注释掉publicPath，不然会冲突
   // 输出文件名字
   filename: "bundle.js"
 },
 module: {
  rules: [
    // 配置的是用来解析.css文件的loader(style-loader和css-loader)
    {
      // 1.0 用正则匹配当前访问的文件的后缀名是  .css
      test: /\.css$/,
      use: ['style-loader', 'css-loader'] //webpack底层调用这些包的顺序是从右到左
    },
    {
      test: /\.less$/,
      use: [{
          loader: 'style-loader'
      }, {
          loader: 'css-loader'
      }, {
          loader: 'less-loader'
      }]
  },
  {
      test: /\.scss$/,
      use: [{
          loader: 'style-loader'
      }, {
          loader: 'css-loader'
      }, {
          loader: 'sass-loader'
      }]
    },
    {
        test: /\.(png|jpg|gif)/,
        use: [{
            loader: 'url-loader',
            options: {
                // 表示限制图片大小，单位是kb，当图片大小大于这个值时， 就将图片处理成文件路径的格式，如果图片小于这个值，就图片处理成base64格式,,所以我们可以规定一个值，当超过多大的时候让它是路径或者base64，这种方式可以提高代码的 
                limit: 5
            }
        }]
    },
    //在webpack 1.x  和 webpack 2.x  里面才需要写这个，因为webpack 3.x已经支持了es6的语法了 
    {
        test: /\.js$/,
        exclude: /(node_modules)/, // node_modules下面的.js文件会被排除
        use: {
          loader: 'babel-loader',
          // options里面的东西可以放到.babelrc文件中去
        //   options: {
        //     presets: ['env']
        //   }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
    }

  ]
},


plugins: [
    new HtmlWebpackPlugin({
        filename: 'index.html',  //配置后生成的文件
        template: './src/index.html', //我们目录中的文件
        //如果需要显示title需要在title里面加那句代码。然后在这里写上我们标题里面要显示的内容
        title:"hello vue"
    })
]

}