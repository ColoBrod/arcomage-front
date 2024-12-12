const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => ({
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'web',

  module: {
    rules: [
      // Manifest json
      {
        test: /manifest\.json/,
        exclude: /(node_modules)/,
        
      },
      // JavaScript
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      // CSS
      {
        test: /\.css$/,
        // exclude: /node_modules/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      // HTML
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          }
        ],
      },
      // Images
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(webp)$/i,
        use: [
          {
            loader: 'file-loader',
          },
          {
            loader: 'webp-loader',
          },
        ],
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader',
      },
    ],
  },

  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
    extensions: ['', '.js', '.jsx'],
  },
  
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      // manifest: 'public/manifest.json',
      chunks: ['main'],
    }),
  ],

  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 3001,
    static: [
      { directory: path.join(__dirname, 'dist') },
      { directory: path.join(__dirname, 'public') },
    ],
    compress: true,
  },
  
  // Следующая настройка может чудовищно снижать производительность программы.
  devtool: argv.mode === 'development' ? 'source-map' : false,
});