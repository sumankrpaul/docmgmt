const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    devServer: {
        port: 8090,
        hot: true
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js"
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
            template: path.resolve(__dirname, "./public/index.html")
        }),
        new ReactRefreshWebpackPlugin()
    ]
}