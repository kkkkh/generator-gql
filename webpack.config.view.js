const path = require('path');
      const { VueLoaderPlugin } = require('vue-loader')
      const TerserWebpackPlugin = require('terser-webpack-plugin')
      const { CleanWebpackPlugin } = require('clean-webpack-plugin')
      const HtmlWebpackPlugin = require('html-webpack-plugin')
      module.exports = {
        entry: {
          main:'./src/views/main.js'
        },
        output: {
          path: path.resolve(__dirname, 'docs'),
          filename: 'main.js', 
        },
        target: 'web',
        mode: 'production',
        // mode: 'development',
        // devtool: 'source-map',
        module: {
          rules: [
            {
              test: /\.ts$/,  
              loader: 'ts-loader',
              options: {
                appendTsSuffixTo: [/\.vue$/],//关键
                configFile: 'tsconfig.view.json', 
              },
              exclude: /node_modules/
            },
            {
              test: /\.vue$/,
              loader: 'vue-loader',
              exclude: /node_modules/,
            },
            // {
            //   test: /\.js$/, 
            //   loader: 'babel-loader', 
            //   exclude: /node_modules/
            // }
          ]
        },
        plugins: [
          new VueLoaderPlugin(),
          new CleanWebpackPlugin(),
          new HtmlWebpackPlugin({
            title:"generator-gql",
            template:"./src/views/index.html",
            filename:"index.html",
          }),
        ],
        // "@element-plus/icons-vue",
        externals:[{
          Vue:'vue',
          ElementPlus:'element-plus',
          },
          function ({ context, request }, callback) {
            if(request.match(/^prettier\/parser-\w+.js/g)) {
              const prettierPlugin = request.replace(/^prettier\/parser-(\w+).js/g, (match,$1)=>{
                if(match){
                  return `prettierPlugins.${$1}`
                }
              })
              return callback(null, prettierPlugin);
            }else{
              callback()
            }
          },],
        resolve: {
          extensions: ['.js', '.ts', '.vue'],
          alias: {
            '@': path.resolve(__dirname,'./src'), 
            "generator-gql": path.resolve(__dirname, './'),
          },
        },
        optimization: {
          minimize: true,
          minimizer: [new TerserWebpackPlugin()],
          usedExports:true,
          sideEffects: true,
        },
      };