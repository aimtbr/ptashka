require('dotenv/config');

const config = require('./config');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const { NODE_ENV, HOST, PORT, APP_LOCATION } = process.env;
  const { name } = config;

  const environment = argv.mode || NODE_ENV;

  const isProduction = environment === 'production';

  const assetsPublicPath = 'assets/';

  // TODO: move to Helmet
  // const title = `Support Ukraine with your device | ${name}`;
  const title = `Підтримайте Україну за допомогою свого девайсу | ${name}`;
  const description =
    'Підтримайте Україну, поділившись обчислювальною потужністю свого девайсу для перевірки російських та білоруських веб-сайтів на стресостійкість.';

  const mode = environment;
  const port = PORT;
  const host = HOST;
  let devtool = 'inline-source-map';
  let styleLoader = 'style-loader';

  const plugins = [
    new HtmlWebpackPlugin({
      template: `${assetsPublicPath}index.ejs`,
      filename: 'index.html',
      publicPath: './',
      name,
      title,
      description,
      location: APP_LOCATION,
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

    plugins.push(
      new MiniCssExtractPlugin(),
      new GenerateSW({
        maximumFileSizeToCacheInBytes: 1024 * 1024 * 10, // 10 MB
        clientsClaim: true,
        skipWaiting: true,
      })
    );
  }

  return [
    {
      entry: ['./src/index.jsx'],
      mode,
      devtool,
      output: {
        filename: '[name].[contenthash].js',
        assetModuleFilename: `${assetsPublicPath}[name]_[hash][ext][query]`,
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        clean: true,
      },
      devServer: {
        static: path.resolve(__dirname, assetsPublicPath),
        host,
        port,
        open: true,
        hot: true,
        historyApiFallback: true,
        devMiddleware: {
          writeToDisk: true,
        },
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
            use: ['babel-loader'],
          },
          {
            test: /\.(s[ac]|c)ss$/,
            use: [styleLoader, 'css-loader', 'sass-loader'],
          },
          {
            test: /\.(svg|png|jpe?g|gif)$/,
            include: [path.resolve(__dirname, assetsPublicPath, 'images')],
            exclude: [
              path.resolve(__dirname, assetsPublicPath, 'images', 'favicons'),
            ],
            type: 'asset/resource',
          },
          {
            // transform the included resources into React components
            test: /\.svg$/,
            include: [path.resolve(__dirname, assetsPublicPath, 'icons')],
            use: ['@svgr/webpack'],
          },
          {
            test: /\.(svg|png)$/,
            include: [
              path.resolve(__dirname, assetsPublicPath, 'images', 'favicons'),
            ],
            type: 'asset/resource',
            // do not add a hash to these resources
            generator: {
              filename: `${assetsPublicPath}[name][ext]`,
            },
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            include: [path.resolve(__dirname, assetsPublicPath, 'fonts')],
            type: 'asset/resource',
          },
          {
            test: /\.webmanifest$/,
            type: 'asset/resource',
            // do not add a hash to these resources
            generator: {
              filename: `${assetsPublicPath}[name][ext]`,
            },
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
