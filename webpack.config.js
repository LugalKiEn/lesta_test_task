const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/main.js', // какой файл собираем
  output: { // куда поместим
    path: path.resolve(__dirname, 'dist'), // путь
    filename: '[hash].js', // какое будет имя бандла
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Lesta Test Task',
      filename: 'index.html',
      template: 'index.html'
    })
  ],
  module: {
    rules: [
        {
            test: /\.html$/,
            use: 'html-loader',
        },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|png|svg|jpeg|gif)$/,
        type: 'asset/resource'
        },

    ]
  },
  mode: 'development',
  devServer: {
    static: './dist',
    port: 3002
  }
};