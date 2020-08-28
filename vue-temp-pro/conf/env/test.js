const webpack = require('webpack');

module.exports = {
    devServer: {
        proxy: {
            '/': {
                target: 'http://st1-supplier.mingqijia.com',
                changeOrigin: true
            }
        }
    },
    nomocker: true,
    output: {
        publicPath: '/static'
    },
    plugins: [
        new webpack.DefinePlugin({
            'SERVICE_URL': JSON.stringify('')
        })
    ]
};