/* eslint-disable no-undef */
import axios from 'axios';

let callback;

function override (f) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            let start = Date.now();

            f(...args)
                .then(
                    (res) => {
                        callback ? callback(res.data, resolve, reject) : resolve(res.data);
                        doMonitors(start, args, res.data);
                    },
                    (res) => {
                        reject(res.data);
                        doMonitors(start, args, res.data);
                    }
                );
            // .catch((e) => {
            //     // console.log('ERROR:', e);
            // });
        });
    };
}

let r = override(axios);
let m = 'request get delete head options post put patch'.split(' ');

m.forEach((method) => {
    r[method] = override(axios[method]);
});

for (let i in axios) {
    if (m.indexOf(i) > -1) {
        r[i] = override(axios[i]);
    } else {
        r[i] = axios[i];
    }
}

r.install = function (Vue, cfg) {
    console.log(cfg, 'cfg');
    r.config(cfg);
    Vue.prototype.$ajax = Vue.prototype.$fetch = Vue.prototype.$axios = r;
};

let monitors = [
    function (start, params, data) {
        if (Date.now() - start > 500) {
            console.log(
                '%c 请求时长' + (Date.now() - start) + 'ms, 请求参数为：',
                'background: red; color: #fff;',
                params
            );
        }
    }
];

function doMonitors (start, params, data) {
    monitors.forEach((monitor) => {
        monitor(start, params, data);
    });
}

r.monitor = function (monitor) {
    monitors.push(monitor);
};

r.config = function (cfg = {}) {
    if (cfg.callback) {
        callback = cfg.callback;
        delete cfg.callback;
    }

    for (let key in cfg) {
        if (axios.defaults[key] && axios.defaults[key].constructor == Object) {
            for (let sk in cfg[key]) {
                axios.defaults[key][sk] = cfg[key][sk];
            }
        } else {
            axios.defaults[key] = cfg[key];
        }
    }
};

export default r;