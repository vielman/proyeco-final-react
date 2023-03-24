const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin'); // para el template de HTML que va a usar webpack
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // para reducir los CSS
const webpack = require('webpack'); // Para conocer el Source Map de nuestro proyecto

// configuraciones de puerto
const port = process.env.PORT || 3000;

// Exporta configuracion de webpack
module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.[fullhash].js',
    publicPath: '/',
  },
  context: path.resolve(__dirname),
  devServer: {
    port,
    historyApiFallback: true,
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      // Reglas para archivos de JS y JSX
      {
        enforce: 'pre',
        test: /(\.js|\.jsx)$/,
        exclude: /node_modules/,
        use: [
          'source-map-loader',
        ],
      },
      // Reglas de Babel ES y JSX
      {
        test: /(\.js|\.jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/env',
            '@babel/react',
          ],
        },
      },
      // Reglas para archivos CSS, SASS y SCSS para mimificarlos y  cargarlos en el bundle
      {
        test: /(\.css|\.scss|\.sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      // Reglas para archivos de imagenes
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },

    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin(
      {
        filename: './css/styles.css',
      },
    ),
    new webpack.SourceMapDevToolPlugin(
      {
        filename: '[file].map',
      },
    ),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss', '.sass'],
    modules: [
      'node_modules',
    ],
    alias: {
      'react-redux': path.join(__dirname, '/node_modules/react-redux/dist/react-redux.min'),
    },
  },
};
