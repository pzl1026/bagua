import ajax from './r';
import ossUpload from './oss-upload';

class QUpload {
    constructor (bucket, userInfo) {
        this.bucket = bucket;
        this.userInfo = userInfo;
        this.Q = null;
    }

    createQ () {
        return ajax.post('/img/index/getToken', {
            bucket: this.bucket
        }).then((data) => {
            return data.data.token;
        }, () => {
            this.Q = null;
        });
    }

    upload (file, onReady, onProgress, bucket = '') {
        return new Promise((resolve, reject) => {
            ossUpload(file, bucket || this.bucket, this.userInfo, {
                progressEvent: (p, checkpoint) => {
                    onProgress(p * 100);
                },
                uploadFail: reject,
                successEvent (res) {
                    resolve({key: res.key});
                }
            }, (oss) => {
                onReady && onReady(oss);
            });
        });
    }

    abort (l) {
        l.abort();
    }
}

export default QUpload;