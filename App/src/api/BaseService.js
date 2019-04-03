import ConfigAPI from './ConfigAPI';
import RNFetchBlob from 'rn-fetch-blob'
// import i18n from '../translations/i18n';

export class BaseService {

    static METHOD = {
        POST: 'POST',
        GET: 'GET',
        DELTE: 'DELETE'
    }

    constructor(props) {

        this.callback = null;
        this.param = {

        };

        this.task = null;
    }

    setParam = (para) => {
        this.param = { ...para };
    }

    setCallback = (callback) => {
        this.callback = callback;
    }

    async requestData(methodType) {
        let bodyString = JSON.stringify(this.param);
        let method = this.param[ConfigAPI.PARAM_METHOD];

        this.task = RNFetchBlob.config({
            trusty: true
        }).fetch(methodType, ConfigAPI.DOMAIN, {
            "Content-Type": "application/x-www-form-urlencoded"
        }, this.objectToURLParameters(this.param));
        await this.task.then((res) => {
            let resJSON = res.json();
            if (resJSON.code === 0) {
                this.callback.onSuccess(resJSON.code, resJSON.message, resJSON.data, method);
            }
            else {
                return
                this.callback.onFail(resJSON.code, resJSON.message, method);
            }
        }).catch((errorMessage) => {
            this.callback.onFail('', "error", method);
        })
    }

    async cancelRequest() {

        if (this.task) {
            this.task.cancel((err, taskId) => {
            })
        }
    }

    objectToURLParameters = (params) => {
        if (params == null) {
            return "";
        }
        let array = [];
        let keys = Object.keys(params);
        for (let i = 0; i < keys.length; i++) {
            let name = keys[i];
            let value = params[name];
            let text = name + "=" + value;
            array.push(text);
        }
        let string = array.join("&");
        return string;
    }
}