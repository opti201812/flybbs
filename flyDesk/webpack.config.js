const nodeExternals = require('webpack-node-externals');

module.exports = [{
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
},
{
    mode: 'development',
    target: 'electron-renderer',
    entry: './src/renderer/index.js',
    output: {
        path: `${__dirname}/build`,
        filename: 'renderer.js',
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx',]
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-transform-runtime'],
            } ,
        }],
    },
},
];