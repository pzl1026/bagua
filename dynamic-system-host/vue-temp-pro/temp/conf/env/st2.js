var webpack = require('webpack');
const CopyPlugin = require('mqj-confs/plugins/copy');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

function resolve (dir) {
    return path.join(process.cwd(), dir);
}

module.exports = {
    output: {
        publicPath: '//st1-static.mingqijia.com/supplier'
    },
    plugins: [
        new webpack.DefinePlugin({
            'SERVICE_URL': JSON.stringify('')
        }),

        // 清除dist目录和output目录
        new CleanWebpackPlugin([resolve('output'), resolve('dist')], {
            allowExternal: true
        }),

        // 用作部署使用，生成output/static和output/views，便于运维部署
        new CopyPlugin([
            {
                from: 'dist',
                to: 'output/static',
                include: 'dist/supplier'
            },
            {
                from: 'dist',
                to: 'output/views',
                exclude: 'dist/supplier'
            }
        ])
    ]
};