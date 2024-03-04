const path = require('path');
var nodeExternals = require('webpack-node-externals');
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    entry: {
        index:'./index.ts',
        main:'./src/main.ts'
    },
    output: {
        path: path.resolve(__dirname, './lib/'),
        library:{
            type:'commonjs',
        },
        filename: '[name].js',
    },
    mode: 'production',
    // mode: 'development',
    target: 'node',
    externals:[nodeExternals(),/^prettier/],
    externalsType: 'commonjs',
    externalsPresets: {
      node: true,
    },
    node: {
        global: true,
        __filename: false,
        __dirname: false,
    },
    resolve: {
        extensions: ['.ts','.js'],
        alias: {
            "@": path.resolve(__dirname, './src'),
            "generator-gql": path.resolve(__dirname, './src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                loader:'ts-loader',
                // use: [{
                //     loader: 'ts-loader'
                // }],
                options: {
                    configFile: 'tsconfig.json', // 指定特定的 tsconfig 文件
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserWebpackPlugin()],
        usedExports:true,
        sideEffects: true,
      },
}
