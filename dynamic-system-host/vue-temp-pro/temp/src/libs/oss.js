let OSS2 = require('ali-oss');

export default class UploadOSS {
    client = null
    progressEvent = null
    createOSSFail = null
    successEvent = null

    constructor (config) {
        this.progressEvent = config.progressEvent;
        this.file = config.file;
        this.successEvent = config.successEvent;
        this.objectKey = config.objectKey;
        console.log(this.objectKey, 'this.objectKey ');
        this.checkpoint = config.checkpoint;
        this.uploadFail = config.uploadFail;
        this.clientConfig = config.clientConfig;
        this.startEvent = config.startEvent;

        // let clientConfig = {
        //     region: 'oss-cn-shanghai',
        //     //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，创建并使用STS方式来进行API访问
        //     accessKeyId: 'LTAILWCfmthKUqkk',
        //     accessKeySecret: '4b3woUoanrHOMBKShIYvxBieoP1mHJ',
        //     bucket: 'xinyuetest',
        //     endpoint: "https://oss-cn-shanghai.aliyuncs.com/",
        // };
        this.client = new OSS2(this.clientConfig);
        this.startEvent && this.startEvent(this);
        this.uploadFile();
    }

    uploadFile = (tempCheckpoint) => {
        let _self = this;

        let options = {
            parallel: 8,
            progress (p, checkpoint) {
                _self.progressEvent && _self.progressEvent(p, checkpoint, _self.client);
            },
            partSize: 1 * 1024 * 1024,
            checkpoint: tempCheckpoint,
            meta: {
                year: 2020,
                people: 'mqj'
            }
        };

        // 定义上传方法
        async function multipartUpload () {
            try {
                await _self.client.multipartUpload(_self.objectKey, _self.file, options)
                    .then(res => {
                        _self.client = null;
                        if (res.res.status == 200) {
                            _self.successEvent && _self.successEvent(res);
                        }
                    }).catch(err => {
                        console.log(err, 'error');
                        _self.uploadFail && _self.uploadFail(err);
                    });
            } catch (e) {
                console.log(e);
            }
        }

        multipartUpload();
    }

    abort () {
        // 中断上传
        this.client.abortMultipartUpload && this.client.abortMultipartUpload();
    }
}