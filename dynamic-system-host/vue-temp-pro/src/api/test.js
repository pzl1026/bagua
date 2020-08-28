import ajax from '@/libs/r';

export default {
    //
    getData (data = {}) {
        return ajax.get('/api/goods/brand', {params: {...data}});
    }
};