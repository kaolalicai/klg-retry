"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const retry = require("retry");
class Retry {
    /**
     * retry尝试
     * @param func 待执行的函数(sendData、postJSON、putJSON)
     * @param options
     * @param options.retries 重试次数 (默认：5次)
     * @param options.minTimeout: 第一次重试前等待时间，默认1000ms
     * @param options.maxTimeout: 间隔两次重试的等待时间，默认Infinity
     */
    async using(func, options) {
        if (typeof func !== 'function') {
            throw new Error(`${func} is not a function`);
        }
        let opts = {
            retries: 5,
            factor: 2,
            minTimeout: 1000,
            maxTimeout: Infinity,
            randomize: false
        };
        for (const key in options) {
            opts[key] = options[key];
        }
        const operation = retry.operation(opts);
        return new Promise((resolve, reject) => {
            operation.attempt(function (currentAttempt) {
                func(currentAttempt).then(function (result) {
                    resolve(result);
                }).catch(function (err) {
                    if (operation.retry(err)) {
                        return;
                    }
                    reject(err);
                });
            });
        });
    }
}
exports.Retry = Retry;
//# sourceMappingURL=Retry.js.map