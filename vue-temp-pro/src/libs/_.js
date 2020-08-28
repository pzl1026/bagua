export default {
    query (name, _default) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);

        if (r != null) {
            return unescape(r[2]);
        }

        return _default;
    },

    pathname (_default) {
        return location.pathname.replace(/(^\/center\/*)|(^\/)/, '') || _default;
    }
};