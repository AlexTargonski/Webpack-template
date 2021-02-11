const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const devMode = process.env.NODE_ENV === 'development';
const prodMode = !devMode;

const getFilename = (ext) => devMode ? `[name].${ext}` : `[name].[hash].${ext}`;

const cssLoaders = [
  MiniCssExtractPlugin.loader,
  'css-loader',
];

const optimize = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  };

  if (prodMode) {
    config.minimizer = [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin()
    ];
  }

  return config;
};

const getBabelOptions = (extraPreset, extraPlugin) => {
  const result = {
    presets: ["@babel/preset-env"],
    plugins: [],
  };

  if (extraPreset) {
    result.presets.push(extraPreset);
  }

  if (extraPlugin) {
    result.plugins.push(extraPlugin);
  }

  return result;
};

const getPlugins = () => {
  const basePlugins = [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: prodMode
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin(
      {
        patterns: [
          {
            from: path.resolve(__dirname, 'src/assets/favicon.ico'),
            to: path.resolve(__dirname, 'dist')
          }
        ]
      }
    ),
    new MiniCssExtractPlugin({
      filename: getFilename('css')
    })
  ];

  if (prodMode) basePlugins.push(new BundleAnalyzerPlugin());

  return basePlugins;
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './index.jsx'],
    analytics: './analytics.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: getFilename('js'),
    publicPath: ''
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.json']
  },
  devtool: devMode ? 'source-map' : false,
  plugins: getPlugins(),
  optimization: optimize(),
  devServer: {
    port: 3000,
    hot: devMode
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: getBabelOptions()
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: getBabelOptions('@babel/preset-typescript')
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: getBabelOptions('@babel/preset-react')
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      },
      {
        test: /\.css$/,
        use: cssLoaders,
      },
      {
        test: /\.less$/,
        use: [
          ...cssLoaders,
          'less-loader'
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          ...cssLoaders,
          'sass-loader'
        ],
      }
    ]
  }
};