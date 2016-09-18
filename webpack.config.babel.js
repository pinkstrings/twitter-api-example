/* eslint-disable import/no-extraneous-dependencies */
import autoprefixer from 'autoprefixer'
import CleanPlugin from 'clean-webpack-plugin'
import path from 'path'
import precss from 'precss'
import webpack from 'webpack'
import config from './config'

const {
  host,
  apihost
} = config

export default {
  context: path.resolve(__dirname),

  devtool: 'cheap-source-map',

  entry: {
    main: 'client.js'
  },

  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },

  module: {
    loaders: [
      {test: /\.jsx?$/, loaders: ['babel'], exclude: /node_modules/},
      {test: /\.json$/, loader: 'json', exclude: /node_modules/},
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules&localIdentName=[name]_[local]_[hash:base64:3]',
          'postcss'
        ]
      }
    ]
  },

  output: {
    chunkFilename: '[name].js',
    filename: '[name].js',
    path: path.join(__dirname, '/assets/'),
    publicPath: '/'
  },

  plugins: [
    new CleanPlugin(['assets'], {
      root: path.resolve(__dirname),
      verbose: true,
      dry: false
    }),

    new webpack.DefinePlugin({ // set global vars
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        HOST: JSON.stringify(host),
        APIHOST: JSON.stringify(apihost)
      },
      __CLIENT__: true,
      __SERVER__: false,
      __DISABLE_SSR__: false
    }),

    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ],

  postcss: () => [
    autoprefixer,
    precss
  ],

  progress: true,

  resolve: {
    modulesDirectories: ['src', 'node_modules'],
    extensions: ['', '.json', '.js', '.jsx', '.css']
  }
}
