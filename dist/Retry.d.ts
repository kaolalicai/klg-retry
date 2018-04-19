export declare class Retry {
    /**
     * retry尝试
     * @param func 待执行的函数(sendData、postJSON、putJSON)
     * @param options
     * @param options.retries 重试次数 (默认：5次)
     * @param options.minTimeout: 第一次重试前等待时间，默认1000ms
     * @param options.maxTimeout: 间隔两次重试的等待时间，默认Infinity
     */
    using(func: any, options?: object): Promise<{}>;
}
