import ajax from './r';
import UploadOSS from './oss';
import {message} from 'ant-design-vue';
let md5 = require('js-md5');

function handleSuccess (data, key, bucket, file, fn) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
        let base64 = reader.result;

        ajax.get('/Img/Index/getImg', {params: {key, bucket}}).then(res => {
            let o = {
                name: file.name,
                key,
                url: res.data,
                uid: file.uid,
                base64,
                eTag: data.etag
            };

            fn(o);
        });
    };
}

function upload (file, bucket, userInfo, {successEvent, progressEvent, uploadFail}, checkpoint) {
    return new Promise((resolve, reject) => {
        ajax.post('/img/index/getToken', {
            bucket
        }).then(res => {
            if (res.code != 0) {
                reject(res);
                message.warning('获取上传token失败');
                return;
            }
            let token = res.data;

            let clientConfig = {
                accessKeyId: token.AccessKeyId,
                accessKeySecret: token.AccessKeySecret,
                region: 'oss-' + userInfo['public']['region'],
                bucket,
                stsToken: token.SecurityToken
            };

            let objectKey = md5(parseInt(Math.random() * 100).toString() + new Date().valueOf() + '-' + file.name);

            let oss = new UploadOSS({
                file,
                checkpoint,
                clientConfig,
                objectKey,
                successEvent (res) {
                    handleSuccess(res, objectKey, bucket, file, successEvent);
                },
                progressEvent,
                uploadFail
            });

            resolve(oss);
        });
    });
}

function startUpload (file, bucket, userInfo, opt = {}, ready) {
    return new Promise((resolve, reject) => {
        upload(file, bucket, userInfo.bucket, {
            progressEvent: opt.progressEvent,
            successEvent (res) {
                // console.log(successEvent, 'successEvent');
                (opt.successEvent && opt.successEvent(res)) || resolve(res);
            },
            uploadFail (err) {
                (opt.uploadFail && opt.uploadFail(err)) || reject(err);
            }
        }).then(oss => {
            ready && ready(oss); // 这边的ready配合之前写的lib下的q-upload.js
        });
    });
}

export default startUpload;