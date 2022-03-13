require('dotenv/config');

const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const { NODE_ENV, PORT, APP_TITLE } = process.env;

  const environment = argv.mode || NODE_ENV;

  const isProduction = environment === 'production';

  const mode = environment;
  const port = PORT;
  const host = '127.0.0.1';
  let devtool = 'inline-source-map';
  let styleLoader = 'style-loader';

  const plugins = [
    new HtmlWebpackPlugin({
      title: APP_TITLE,
      template: 'assets/index.ejs',
      filename: 'index.html',
      publicPath: './',
    }),
    new Dotenv({
      allowEmptyValues: true,
      systemvars: true,
    }),
  ];

  if (isProduction) {
    // disable the devtool
    devtool = false;

    styleLoader = MiniCssExtractPlugin.loader;

    plugins.push(new MiniCssExtractPlugin());
  }

  return [
    {
      entry: ['./src/main.jsx'],
      mode,
      devtool,
      output: {
        filename: '[name].[contenthash].js',
        publicPath: '/',
      },
      devServer: {
        static: [{ directory: path.resolve(__dirname, 'assets') }],
        host,
        port,
        open: true,
        hot: true,
        historyApiFallback: true,
      },
      resolve: {
        extensions: ['*', '.js', '.jsx', '.json', '.scss'],
        fallback: {
          fs: false,
          path: false,
        },
      },
      plugins,
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            include: [path.resolve(__dirname, 'src')],
            exclude: [
              path.resolve(__dirname, 'node_modules'),
              path.resolve(__dirname, 'assets'),
            ],
            use: ['babel-loader'],
          },
          {
            test: /\.(s[ac]|c)ss$/,
            use: [styleLoader, 'css-loader', 'sass-loader'],
          },
          {
            test: /\.(png|jpe?g|svg|gif|woff|woff2|eot|ttf|otf)$/,
            include: [path.resolve(__dirname, 'assets')],
            exclude: [
              path.resolve(__dirname, 'node_modules'),
              path.resolve(__dirname, 'src'),
            ],
            type: 'asset/resource',
          },
          {
            test: /\.html$/,
            include: [path.resolve(__dirname, 'assets')],
            exclude: [
              path.resolve(__dirname, 'node_modules'),
              path.resolve(__dirname, 'src'),
            ],
            use: ['html-loader'],
          },
        ],
      },
      optimization: {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      },
    },
  ];
};
