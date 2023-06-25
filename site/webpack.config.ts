import fs from 'fs';
import path from 'path';
import 'webpack-dev-server';
import webpack from 'webpack';
import { render } from 'mustache';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { name, version } from '../package.json';
import { examples } from './config';

const config: webpack.Configuration = {
  mode: 'development',
  entry: './index.ts',
  devtool: 'inline-source-map',
  devServer: {
    port: 8082,
    static: [
      './dist',
      '../dist',
      {
        directory: '../coverage/lcov-report',
        publicPath: '/coverage-report',
      },
      {
        directory: '../docs/api',
        publicPath: '/api',
      },
    ],
    devMiddleware: {
      writeToDisk: true,
    },
  },
  plugins: [
    // This makes it possible for us to safely use env vars on our code
    new webpack.DefinePlugin({
      APP: name,
      VERSION: version,
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      title: `${name} - v${version}`,
    }),
    new CopyPlugin({
      patterns: [
        { from: '../README.md', to: './' },
        { from: '../CHANGELOG.md', to: './' },
        { from: './examples', to: './examples' },
      ],
    }),
    {
      apply: (compiler: any) => {
        compiler.hooks.done.tap('wp-examples', () => {
          examples.forEach((app) => {
            const appPath = app.path;
            const appName = app.name;
            const destAppEntry = `./dist${appPath}/entry.js`;
            const destIndexTempFile = `./dist/${appPath}/_index.html`;
            const destIndexFile = destIndexTempFile.replace('_index', 'index');
            if (fs.existsSync(`./${appPath}/_index.html`)) {
              fs.writeFileSync(destAppEntry, render(fs.readFileSync('./tools/entry.template.js', 'utf8'), { app: appName }));
              fs.appendFileSync(destIndexTempFile, `<script src="${appPath}/entry.js" entry></script>`);
              fs.renameSync(destIndexTempFile, destIndexFile);
            }
          });
        });
      },
    },
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};

export default config;
