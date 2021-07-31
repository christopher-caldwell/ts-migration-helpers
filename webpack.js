const { resolve } = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const rootPath = resolve(process.cwd())
const srcPath = resolve(rootPath, '/src/index.ts')

const config = {
  mode: 'production',
  stats: 'minimal',
  context: rootPath,
  entry: srcPath,
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  target: 'node',
  plugins: [],
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader'
      }
    ]
  }
}

if (process.env.ANALYZE) {
  config.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    })
  )
}

module.exports = config
