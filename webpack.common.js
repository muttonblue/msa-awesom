const path = require('path');
const webpack = require('webpack');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const getClientEnvironment = require('./env');
const env = getClientEnvironment('');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const jsbuilt = path.join(__dirname, './src/main/resources/assets/jsbuilt');

module.exports = {
    entry: {
        app: [
            path.join(__dirname, './src/main/js/app.js'),
        ],
    },
    optimization: {
        minimizer: [new TerserPlugin({
            extractComments: false,
        })],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: "initial",
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    enforce: false
                }
            }
        },
    },
    output: {
        path: jsbuilt,
        filename: '[name].bundle.js'
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                exclude: /node_modules\/(?!(thaisamut)\/).*/,
                use: {
                    loader: require.resolve('eslint-loader'),
                    options: {
                        presets: [["babel-preset-env", "babel-preset-react"]],
                        formatter: eslintFormatter,
                        eslintPath: require.resolve('eslint'),
                        // @remove-on-eject-begin
                        baseConfig: {
                            extends: [require.resolve('eslint-config-react-app')],
                            rules: {
                                "jsx-a11y/href-no-hash": "off",
                                "import/no-webpack-loader-syntax": "off",
                                "react-hooks/exhaustive-deps": "off"
                            },
                        },
                        ignore: false,
                        useEslintrc: false,
                        // @remove-on-eject-end

                    }
                }
            },
            {
                test: /\.(js|jsx|mjs)$/,
                loader: require.resolve('babel-loader'),
                exclude: /node_modules\/(?!(thaisamut)\/).*/,
                options: {
                    // @remove-on-eject-begin
                    babelrc: false,
                    presets: [require.resolve('babel-preset-react-app')],
                    // @remove-on-eject-end
                    // This is a feature of `babel-loader` for webpack (not Babel itself).
                    // It enables caching results in ./node_modules/.cache/babel-loader/
                    // directory for faster rebuilds.
                    cacheDirectory: true,
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.(ttf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]'
                    },
                },]
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[ext]'
                    },
                },]
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.css', '.html'],
        alias: {
            '~': path.resolve(__dirname, './src/main/js'),
        }

    },
    plugins: [
        new ProgressBarPlugin({
            format: '  build [:bar] ' + ':percent' + ' (:elapsed seconds)',
            clear: false
        }),
        new CopyPlugin([
            { from: './node_modules/thaisamut/static', to: jsbuilt, force:true, ignore: ['index.ftl'], },
        ]),
        new webpack.IgnorePlugin(/\.\/locale$/),
        new LiveReloadPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
            chunkFilename: '[name].bundle.css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new HtmlWebpackPlugin({
            template: 'node_modules/thaisamut/static/msa_index.ftl',
            filename: 'index_template.ftl',
            chunks: [''],
            externalCSS: [
                '${staticResourceContextPath}/jsbuilt/vendor.bundle.css"',
            ],
            externalJS: [
                '${staticResourceContextPath}/jsbuilt/vendor.bundle.js',
                '${staticResourceContextPath}/jsbuilt/app.bundle.js',
            ],
        }),
    ]
};
