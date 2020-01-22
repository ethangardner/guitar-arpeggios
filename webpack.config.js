const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const AppManifestWebpackPlugin = require('app-manifest-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: {
    app: ['./src/app.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Guitar Arpeggio Visualizer',
      template: './src/index.html',
    }),
    new ManifestPlugin(),
    new AppManifestWebpackPlugin({
      logo: './src/touch-icon.png', // svg works too!
      prefix: '/demo/guitar-arpeggios',
      inject: true,
      config: {
        appName: 'Guitar Arpeggio Visualizer',
        background: '#ecf4fb',
        theme_color: '#068a9c',
        icons: {
          firefox: false,
          coast: false,
          yandex: false
        }
      }
    }),
    new WorkboxPlugin.GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /worker\.js$/,
        use: {
          loader: 'worker-loader',
          options: { inline: false, fallback: true },
        },
      },
    ],
  },
};
