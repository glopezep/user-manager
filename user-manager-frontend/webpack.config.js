const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      { test: /\.jsx?/, exclude: /(node_modules)/, loader: 'babel-loader'}
    ]
  }
}
