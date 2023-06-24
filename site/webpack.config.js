const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const mustache = require('mustache');

// Try the environment variable, otherwise use root
const ASSET_PATH = process.env.ASSET_PATH || '/';

const fileDep = path.resolve(__dirname, 'sample.txt');

module.exports = (env) => {
  const isProd = env.production;

  return {
    mode: 'development',
    entry: './index.ts',
    devtool: 'inline-source-map',
    devServer: {
      port: 8082,
      static: ['./dist', '../dist', {
        directory: '../coverage/lcov-report',
        publicPath: '/coverage-report',
      }, {
          directory: '../docs/api',
          publicPath: '/api',
        }],
      devMiddleware: {
        writeToDisk: true,
      }
    },
    plugins: [
      // This makes it possible for us to safely use env vars on our code
      new webpack.DefinePlugin({
        'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
        PRODUCTION: JSON.stringify(isProd),
        BUILT_AT: webpack.DefinePlugin.runtimeValue(Date.now, {
          fileDependencies: [fileDep],
        }),
      }),
      new HtmlWebpackPlugin({
        template: 'index.html'
      }),
      new CopyPlugin({
        patterns: [
          { from: "../README.md", to: "./" },
          { from: "../CHANGELOG.md", to: "./" },
          { from: "./examples", to: "./examples" },
        ],
      }),
      {
        apply: (compiler) => {
          compiler.hooks.done.tap('wp-examples', () => {
            const apps = fs.readdirSync('./examples');
            apps.forEach(app => {
              const appPath = `/examples/${app}`;
              const appName = appPath.replace('/', '').replace('/', '-');
              const destAppEntry = `./dist${appPath}/entry.js`
              if (!fs.existsSync(destAppEntry)) {
                fs.writeFileSync(destAppEntry, mustache.render(fs.readFileSync('./tools/entry.template.js', 'utf8'), { app: appName }));
                const indexFile = `./dist/examples/${app}/_index.html`;
                fs.appendFileSync(indexFile, `<script src="${appPath}/entry.js" entry></script>`);
                fs.renameSync(indexFile, indexFile.replace('_index', 'index'));
              }
            });
          });
        }
      },
    ],
    output: {
      publicPath: ASSET_PATH,
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
        }
      ],
    },
  }
};