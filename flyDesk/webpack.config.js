const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
    target: 'electron-main',
    entry: './src/main/index.js',
    output: {
        path: `${__dirname}/build`,
        filename: 'main.js',
    },
    devtool: 'source-map',
    node: {
        __filename: false,
        __dirname: false,
    },
    externals: nodeExternals(),
};