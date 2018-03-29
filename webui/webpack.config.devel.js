var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: ['./src/index.jsx'],
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: __dirname+"/../src/main/resources/webui",
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {   test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: { presets: ['es2015', 'react'] },
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    },
    devServer: {
        contentBase: __dirname+"../src/main/resources/webui",
        historyApiFallback: true,
        proxy: {
            '/api/**': {
                target :'http://localhost:8080',
                changeOrigin: true,
                secure: false
            }
        }
    },
    mode: 'development',
};
