const path = require("path");
const CURRENT_WORKING_DIR = process.cwd()
const webpack = require("webpack")

const config = {
    name: "browser",
    mode: "development",
    // eval-source-map devtool may cause CSP issue
    // https://github.com/webpack/webpack/issues/4899
    // https://webpack.js.org/configuration/devtool/
    // devtool: 'eval-source-map',
    devtool: false,
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(CURRENT_WORKING_DIR, 'client/main.js')
    ],
    output: {
        path: path.join(CURRENT_WORKING_DIR, '/dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    }
}

module.exports = config