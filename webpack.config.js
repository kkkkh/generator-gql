const path = require('path');
var nodeExternals = require('webpack-node-externals');
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
    mode: 'development',
    target: 'node',
    externals:[nodeExternals()],
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
            "@": path.resolve(__dirname, './src/'),
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                use:'ts-loader',
                // use: [{
                //     loader: 'ts-loader'
                // }],
                exclude: /node_modules/
            }
        ]
    },
    plugins: []
}
