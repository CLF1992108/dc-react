'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopywebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const dvgisDist = './node_modules/@dvgis';
const webpack = require('webpack');
const config = require('./config/env/config');
module.exports = (env, argv) => {
  const IS_PROD = (argv && argv.mode === 'production') || false;
  return {
    mode: IS_PROD ? 'production' : 'development',
    entry: {
      app: path.resolve(__dirname, 'src/'),
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: IS_PROD ? './' : '/',
    },
    devtool: IS_PROD ? false : 'cheap-module-source-map',
    devServer: {
      host: '0.0.0.0',
      proxy: {
        '/admin/fast-go-gis/': {
          target: 'http://192.168.18.142:9999', //请求本地 
          ws: false,
          changeOrigin: true,
          pathRewrite: {
            '^': ''
          },
        },
        '/admin/ajax/': {
          target: 'http://192.168.18.142:8201', //请求本地 
          secure: false,
          pathRewrite: {
            '^': ''
          },
        },
        '/uploads/': {
          target: 'http://192.168.18.142:8201', //请求本地 
          secure: false,
          pathRewrite: {
            '^': ''
          },
        },
      },
      progress: true, // 命令行中会显示打包的进度
      liveReload: true,
      port: 5000,
      filename: 'tsc_out.js',
      writeToDisk: (filename) => {
        return /tsc_out.js/.test(filename);
      }, // 传入一个函数用来筛选哪些文件需要写入硬盘
    },
    module: {
      rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/transform-runtime'],
            compact: false,
            ignore: ['checkTree'],
          },
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          loader: 'url-loader',
          options: {
            limit: 20000,
          },
        },
      ],
    },
    optimization: IS_PROD ? {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        automaticNameDelimiter: '~',
        cacheGroups: {
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial',
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true,
          },
        },
      },
    } : {},
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin(),
      new CopywebpackPlugin({
        patterns: [{
            from: path.join(__dirname, 'public'),
            to: path.join(__dirname, 'dist'),
            globOptions: {
              ignore: ['**/*index.html'],
            },
          },
          {
            from: path.join(dvgisDist, 'dc-sdk/dist/resources'),
            to: 'libs/dc-sdk/resources',
          },
        ],
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
      }),
      new webpack.DefinePlugin({
        ASSET_URL: JSON.stringify(config.ASSET_URL),
        API_URL: JSON.stringify(config.API_URL),
        NODE_ENV: process.env.NODE_ENV,
      }),
    ],
    resolve: {
      extensions: ['.js', '.json', '.css', '.ts', '.tsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  }
}