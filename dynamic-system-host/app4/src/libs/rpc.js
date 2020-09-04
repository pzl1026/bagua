// service端使用自定义请求

import axios from 'axios';

class JsonRpcClient {
    static defaultHeaders = {
        'Content-Type': 'application/json'
    };

    static getUniqId = (() => {
        let counter = 0;

        return () => {
            counter += 1;

            if (!Number.isSafeInteger(counter)) {
                counter = 0;
            }

            return counter;
        };
    })();

    constructor ({
        url,
        headers = {}
    }) {
        this.url = url;
        this.headers = {
            ...JsonRpcClient.defaultHeaders,
            ...headers
        };
    }

    request (
        method,
        params = {},
        options = {headers: {}}
    ) {
        this.requestId = JsonRpcClient.getUniqId();

        const body = {
            jsonrpc: '2.0',
            method,
            params,
            id: this.requestId
        };

        const headers = {
            ...this.headers,
            ...options.headers
        };

        return new Promise((resolve, reject) => {
            axios.post(this.url, body, {
                headers
            }).then(({
                data: res
            }) => {
                if (!res) {
                    reject({
                        error: 'Unknown error'
                    });
                    return;
                }

                if (res.error) {
                    reject({
                        error: res.error.message,
                        code: res.error.code
                    });
                    return;
                }

                resolve({
                    data: res.result
                });
            }).catch((err) => {
                if (err.response) {
                    reject({
                        error: err.response.statusText,
                        code: err.response.status
                    });
                    return;
                }

                reject({
                    error: 'Unknown error'
                });
            });
        });
    }
}

export default JsonRpcClient;