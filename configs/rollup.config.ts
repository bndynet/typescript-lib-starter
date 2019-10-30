import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import sass from 'rollup-plugin-sass';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import { terser } from 'rollup-plugin-terser';

const pkg = require('../package.json');

const libraryName = pkg.name.indexOf('/') > 0 ? pkg.name.split('/')[1].toLocaleLowerCase() : pkg.name.toLocaleLowerCase();

export default {
  input: `src/index.ts`,
  output: [
    {
      file: pkg.main,
      name: libraryName,
      format: 'umd',
      sourcemap: true,
      globals: {
        // "react": "React",
        // "react-dom": "ReactDOM",
      },
    },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  // Indicate here external modules you don"t wanna include in your bundle (i.e.: "lodash")
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
    sass({
      output: `dist/${libraryName}.css`,
      processor: css =>
        postcss([autoprefixer])
          .process(
            css,
            { from: undefined }, // fix PostCSS without `from` warning
          )
          .then(result => result.css),
    }),
    terser(),
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({
      tsconfig: 'configs/tsconfig.json',
      useTsconfigDeclarationDir: true,
    }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn"t understand cjs)
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        // "node_modules/react/index.js": [
        //   "Component",
        //   "PureComponent",
        //   "Fragment",
        //   "Children",
        //   "cloneElement",
        //   "createElement",
        //   "isValidElement"
        // ],
      },
    }),
    // Allow node_modules resolution, so you can use "external" to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    babel({
      exclude: 'node_modules/**',
    }),

    // Resolve source maps to the original source
    sourceMaps(),
  ],
};
