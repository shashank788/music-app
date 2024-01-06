const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    // devServer: {
    //     port: 3000,
    //     contentBase: path.resolve(__dirname, "dist"),
    //     historyApiFallback: { index: "/", disableDotRule: true },
    // },
    devServer: { ////Added line

        historyApiFallback: true, ////Added line
        
        },
    output: {
        // path: path.join(__dirname, "/dist"),
        // filename: "index_bundle.js",
        path: path.resolve(__dirname, 'build'), // specify the output path here
        // filename: 'bundle.js',
        filename: '[name].bundle.js', // generate separate JavaScript files
        chunkFilename: '[name].chunk.js',
        publicPath: '/' //Added line
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.js$|\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ]
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    }
};
