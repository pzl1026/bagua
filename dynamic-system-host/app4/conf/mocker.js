module.exports = {
    // 'GET /goods/attribute': require('./mocker/props/base'),
    'GET /goods/brand': require('./mocker/brand/brandList'),
    'GET /goods/brand:id': require('./mocker/brand/editBrand'),
    'GET /goods/channel': require('./mocker/channel/saleChannelList'),
    'GET /goods/channel:id': require('./mocker/channel/editChannel'),
    // 'GET /goods/category': require('./mocker/category')
    'GET /order/shop': require('./mocker/set/shop')
};