const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
dotenv.config();


module.exports = {
    mode: 'development',
    entry: './src/main.js',
    devServer: {
        port: process.env.PORT || 8090,
        hot: true,
        historyApiFallback: true
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
        publicPath: '/'
    },
    resolve: {extensions: [".js", ".jsx", ".ts", ".tsx"]},
    module:{
        rules: [
            {
                test: /\.(?:js|mjs|cjs|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript"
                        ],
                        plugins: ['react-refresh/babel']
                    }                    
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            { test: /\.(png|jpe?g|gif)$/i, use: [{loader: 'file-loader'}]}
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./public/index.html"),
            favicon: './public/favicon.ico'
        }),
        new ReactRefreshWebpackPlugin(),
        new webpack.DefinePlugin(
            {"env": JSON.stringify(dotenv.config().parsed)}
        )
    ]
}