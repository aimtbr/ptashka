require('dotenv/config');

const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const { NODE_ENV, HOST, PORT, APP_TITLE, APP_LOCATION } = process.env;

  const environment = argv.mode || NODE_ENV;

  const isProduction = environment === 'production';

  // TODO: move to Helmet
  // const title = `Support Ukraine with your device | ${APP_TITLE}`;
  const title = `Підтримайте Україну за допомогою свого девайсу | ${APP_TITLE}`;
  const description =
    'Підтримайте Україну, поділившись обчислювальною потужністю свого девайсу для перевірки російських та білоруських веб-сайтів на стресостійкість.';
  const location = APP_LOCATION;

  const mode = environment;
  const port = PORT;
  const host = HOST;
  let devtool = 'inline-source-map';
  let styleLoader = 'style-loader';

  const plugins = [
    new HtmlWebpackPlugin({
      title,
      template: 'assets/index.ejs',
      filename: 'index.html',
      publicPath: './',
      description,
      location,
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
        clean: true,
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
            test: /\.(png|jpe?g|gif|woff|woff2|eot|ttf|otf)$/,
            include: [path.resolve(__dirname, 'assets')],
            exclude: [
              path.resolve(__dirname, 'node_modules'),
              path.resolve(__dirname, 'src'),
            ],
            type: 'asset/resource',
          },
          {
            test: /\.svg$/,
            include: [path.resolve(__dirname, 'assets', 'icons')],
            use: ['@svgr/webpack'],
          },
          {
            test: /\.svg$/,
            exclude: [
              path.resolve(__dirname, 'assets', 'icons'),
              path.resolve(__dirname, 'node_modules'),
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
