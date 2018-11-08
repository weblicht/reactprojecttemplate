var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: ['./src/index.jsx'],
    devtool: 'source-map',
    output: {
        path: __dirname+"/../src/main/resources/webui",
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {   test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        contentBase: __dirname+"/../src/main/resources/webui",
        historyApiFallback: true,
        proxy: {
            '/api/**': {
                target :'http://localhost:8088',
                changeOrigin: true,
                secure: false
            }
        }
    }
};
