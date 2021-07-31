const { resolve } = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const rootPath = resolve(process.cwd())
const srcPath = resolve(rootPath, '/src/index.ts')

const config = {
  mode: 'production',
  stats: 'minimal',
  context: rootPath,
  entry: srcPath,
  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'src/')
    },
    extensions: ['.tsx', '.ts', '.json', '.js']
  },
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  target: 'node',
  plugins: [],
  module: {
    rules: [
      {
        test: /\.ts$/,
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
