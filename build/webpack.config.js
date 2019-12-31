const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

function resolve(p) {
  return path.resolve(__dirname, p);
}


module.exports = {
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', resolve('../src/main.js')],
    header: resolve('../src/header.js'), // 打包入口文件
  },
  output: {
    filename: '[name].[hash:8].js', // 打包后的文件名称
    path: resolve('../dist'), // 打包后的目录
  },
  module: {
    rules: [
      {
        test:/\.js$/,
        use:{
          loader:'babel-loader',
          options:{
            presets:['@babel/preset-env']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            // 使用 `dart-sass`
            implementation: require('sass'),
          },
        }, 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('../public/index.html'),
      filename: 'index.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      template: resolve('../public/header.html'),
      filename: 'header.html',
      chunks: ['header'],
    }),
    new CleanWebpackPlugin(), // 打包前清理打包目标目录（如dist）
  ],
}
