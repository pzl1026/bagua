const dataSource = [];

for (let i = 0; i < 100; i++) {
    dataSource.push({
        id: i.toString(),
        name: '海尔',
        desc: `空调冰箱洗衣机${i}`,
        logo_url: 'www.baidu.com',
        sort: 0,
        status: 1,
        create_time: '1970-01-01 08:00:00',
        update_time: '1970-01-01 08:00:00',
        delete_time: '1970-01-01 08:00:00',
        is_delete: 0
    });
}
module.exports = {
    data: {
        total: 4,
        page: 1,
        page_size: '10',
        from: 1,
        last_page: 1,
        to: 4,
        list: [
            {
                id: 6,
                name: '测试规格组111',
                describe: '',
                status: 0,
                apply_time: 0,
                goods_category_id: 0,
                create_id: 201,
                create_name: 'admin',
                category_str: ''
            },
            {
                id: 5,
                name: '服装类',
                describe: '',
                status: 0,
                apply_time: 0,
                goods_category_id: 0,
                create_id: 201,
                create_name: 'admin',
                category_str: ''
            },
            {
                id: 2,
                name: '销售属性文件夹',
                describe: '销售属性文件夹',
                status: 0,
                apply_time: 0,
                goods_category_id: 3,
                create_id: 201,
                create_name: 'admin',
                category_str: '默认一级类目>默认二级类目>默认三级类目'
            },
            {
                id: 1,
                name: '小鱼测试',
                describe: '',
                status: 0,
                apply_time: 0,
                goods_category_id: 6,
                create_id: 201,
                create_name: 'admin',
                category_str: '小鱼>二级>三级'
            },
            {
                id: 9,
                name: '小鱼测试',
                describe: '',
                status: 0,
                apply_time: 0,
                goods_category_id: 6,
                create_id: 201,
                create_name: 'admin',
                category_str: '小鱼>二级>三级'
            }
        ]
    },
    code: 0,
    msg: 'success'
};