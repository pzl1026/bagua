import Vue from 'vue';
import {message} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

export default {
    user (...arg) {
        const userInfo = this.storage('userInfo') || {};
        let _obj = {};

        if (arg.length > 0) {
            if (arg[0] instanceof Array) {
                arg.forEach(item => {
                    _obj[item] = userInfo[item] || '';
                });
            } else {
                _obj = userInfo[arg[0]] || '';
            }
        } else {
            _obj = {...userInfo};
        }
        return _obj;
    },

    getAuth () {
        return this.storage('permission');
    },

    login (userInfo) {
        this.storage('userInfo', userInfo);
    },

    logout (storage = [], callback) {
        if (storage instanceof Array) {
            storage.forEach(v => {
                this.storage(v, null);
            });
        }
        callback && callback();
    },

    loading (api, successMsg, errMsg) {
        const hide = message.loading('请等待...');

        return new Promise((resolve, reject) => {
            api.then(data => {
                message.success(successMsg || '请求成功');
                resolve(data);
            }, error => {
                // message.error(errMsg || error.msg || '请求失败');
                reject(error);
            }).finally(() => {
                setTimeout(hide, 0);
            });
        });
    },

    storage (...arg) {
        const len = arg.length;

        if (len > 0 && typeof arg[0] === 'string') {
            if (len == 1) {
                return JSON.parse(window.localStorage.getItem(arg[0]));
            } else if (len >= 2) {
                if (arg[1] === null) {
                    return window.localStorage.removeItem(arg[0]);
                }
                return window.localStorage.setItem(arg[0], JSON.stringify(arg[1]));
            }
        } else {
            console.error('key is not a string');
        }
    },
    factory (options, propsData = {}, getContainer = document.body) {
        const Vm = Vue.extend(options);
        const instance = new Vm({propsData});

        instance.$mount();
        getContainer.appendChild(instance.$el);
        return instance;
    }
};