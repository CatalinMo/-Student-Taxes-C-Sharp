// module.exports = {
//     publicPath: '/',
//     devServer: {
//         port: 8080,
//         proxy: {
//             '^/api': {
//                 target: 'http://localhost:3000',
//                 changeOrigin: true,
//                 logLevel: 'debug',
//                 pathRewrite: { '^/api': '' }
//             }
//         }
//     }
// }

// const CopyPlugin = require('copy-webpack-plugin');
//
// module.exports = {
//     chainWebpack: (config) => {
//         config.plugin('copy').use(CopyPlugin, [[{
//                 from: 'src/assets/config',
//                 to: 'assets/config',
//                 globOptions: {
//                     ignore: ['*.js', '*.scss', '*.sass', '*.css', '*.html', '*.md']
//                 }
//             }]]);
//     }
// };

// module.exports = {
//     configureWebpack: {
//         output: {
//             publicPath: '/',
//         },
//     },
// };

// module.exports = {
//     configureWebpack: {
//         resolve: {
//             extensions: ['.mjs', '.js', '.json'],
//         },
//         plugins: [
//             {
//                 apply: () => {},
//                 ...require('@rollup/plugin-commonjs')()
//             }
//         ],
//         module: {
//             rules: [
//                 {
//                     test: /\.mjs$/,
//                     include: /node_modules/,
//                     type: 'javascript/auto',
//                 },
//             ],
//         },
//     },
// }

// module.exports = {
//     chainWebpack: config => {
//         config.module
//             .rule('mjs')
//             .test(/\.mjs$/)
//             .include
//             .add(/node_modules/)
//             .end()
//             .type('javascript/auto')
//             .use('babel-loader')
//             .loader('babel-loader')
//             .end();
//
//         config.plugin('commonjs')
//             .use(require('@rollup/plugin-commonjs'));
//
//         config.plugin('node-resolve')
//             .use(require('@rollup/plugin-node-resolve'));
//     }
// }
// const nodeResolve = require('@rollup/plugin-node-resolve');
// const commonjs = require('@rollup/plugin-commonjs');
//
// module.exports = {
//     configureWebpack: {
//         resolve: {
//             extensions: ['.mjs', '.js', '.json'],
//         },
//         module: {
//             rules: [
//                 {
//                     test: /\.m?js$/,
//                     exclude: /(node_modules|bower_components)/,
//                     use: {
//                         loader: 'babel-loader',
//                         options: {
//                             presets: ['@babel/preset-env'],
//                         },
//                     },
//                 },
//             ],
//         },
//         plugins: [
//             {
//                 apply: (compiler) => {
//                     compiler.hooks.afterEmit.tap('AfterEmitPlugin', () => {
//                         console.log('AfterEmitPlugin executed');
//                     });
//                 },
//             },
//             {
//                 apply: (compiler) => {
//                     compiler.hooks.done.tap('DonePlugin', () => {
//                         console.log('DonePlugin executed');
//                     });
//                 },
//             },
//             {
//                 apply: (compiler) => {
//                     compiler.hooks.compilation.tap('CompilationPlugin', () => {
//                         console.log('CompilationPlugin executed');
//                     });
//                 },
//             },
//             {
//                 apply: (compiler) => {
//                     compiler.hooks.run.tap('RunPlugin', () => {
//                         console.log('RunPlugin executed');
//                     });
//                 },
//             },
//             {
//                 apply: (compiler) => {
//                     compiler.hooks.watchRun.tap('WatchRunPlugin', () => {
//                         console.log('WatchRunPlugin executed');
//                     });
//                 },
//             },
//             {
//                 apply: (compiler) => {
//                     compiler.hooks.invalid.tap('InvalidPlugin', () => {
//                         console.log('InvalidPlugin executed');
//                     });
//                 },
//             },
//             {
//                 apply: (compiler) => {
//                     compiler.hooks.watchClose.tap('WatchClosePlugin', () => {
//                         console.log('WatchClosePlugin executed');
//                     });
//                 },
//             },
//             {
//                 apply: (compiler) => {
//                     compiler.hooks.normalModuleFactory.tap('NormalModuleFactoryPlugin', () => {
//                         console.log('NormalModuleFactoryPlugin executed');
//                     });
//                 },
//             },
//             nodeResolve(),
//             commonjs(),
//         ],
//     },
// };


// module.exports = {
//     configureWebpack: {
//         module: {
//             rules: [
//                 {
//                     test: /\.mjs$/,
//                     include: /node_modules/,
//                     type: "javascript/auto"
//                 },
//             ],
//         },
//     },
// };










