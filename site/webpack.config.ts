import fs from 'fs';
import path from 'path';
import 'webpack-dev-server';
import webpack from 'webpack';
import { render } from 'mustache';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { name, version, description } from '../package.json';
import { examples } from './config';


const htmlFiles = ['index.html', 'md.html', 'components.html', 'api.html'];

const config = (env: any) => { 
  const baseUrl = env.production 
    ? `/${name.includes('/') ? name.split('/')[1] : name }/`  // '/docs/'
    : '/';

  const htmlWebpackPlugins = htmlFiles.map(file => {
    return new HtmlWebpackPlugin({
      title: name,
      base: baseUrl,
      template: file,
      filename: file,

      org: name.includes('/') ? name.split('/')[0]: '',
      name: name.includes('/') ? name.split('/')[1]: name,
      version: `v${version}`,
      description: description,
    });
  });

  return ({
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
        APP: JSON.stringify(name),
        VERSION: JSON.stringify(version),
        BASE_URL: JSON.stringify(baseUrl),
      }),
      ...htmlWebpackPlugins,
      new CopyPlugin({
        patterns: [
          { from: '../README.md', to: './' },
          { from: '../CHANGELOG.md', to: './' },
          { from: './examples', to: './examples' },
          { from: './assets', to: './assets' },
          { from: './partial', to: './partial' },
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
                fs.writeFileSync(destAppEntry, render(fs.readFileSync('./tools/entry.template.js', 'utf-8'), { app: appName }));
                const entryPath = `${baseUrl}${appPath}/entry.js`.replace(/\/+/g, '/');

                const indexFileContent = fs.readFileSync(`./${appPath}/_index.html`, 'utf-8');
                fs.writeFileSync(destIndexTempFile, indexFileContent + `\n\n<script src="${entryPath}" entry></script>`);
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
  });
};

export default config;
