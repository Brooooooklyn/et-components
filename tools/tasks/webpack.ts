'use strict'
import * as path from 'path'
const webpack = require('webpack')

export const bundle = (watch?: boolean) => {
  return new Promise((resolve, reject) => {
    webpack({
      entry: {
        app: path.join(process.cwd(), 'test/app.ts'),
        lib: ['zone.js', 'teambition-sdk', 'et-dependency']
      },
      output: {
        filename: 'app.js',
        path: path.join(process.cwd(), 'www/js/')
      },
      preLoaders: [
        {test: /\.js?$/, loader: 'source-map'}
      ],
      resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
      },
      module: {
        loaders: [
          {
            test: /\.ts$/,
            loader: 'ts-loader'
          },
          {
            test: /\.html/,
            loader: 'et'
          }
        ]
      },
      ts: {
        configFileName: path.join(process.cwd(), 'tools/build/bundle.json'),
        silent: true
      },
      devtool: 'source-map',
      watch: !!watch,
      devServer: {
        port: 8087
      },
      plugins: [
        new webpack.optimize.CommonsChunkPlugin("lib", 'lib.js')
      ]
    }, (err, status) => {
      if (err) return reject(err)
      return resolve(status.toString())
    })
  })
}
