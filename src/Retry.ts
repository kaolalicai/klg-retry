import * as retry from 'retry'

export class Retry {
/**
 * retry尝试
 * @param func 待执行的函数(sendData、postJSON、putJSON)
 * @param options
 * @param options.retries 重试次数 (默认：5次)
 * @param options.minTimeout: 第一次重试前等待时间，默认1000ms
 * @param options.maxTimeout: 间隔两次重试的等待时间，默认Infinity
 */
  async using (func: Function, options?: { retries: number, minTimeout: number, maxTimeout: number }) {
    if (typeof func !== 'function') {
      throw new Error(`${func} is not a function`)
    }
    // options = options || {retries: 15, minTimeout: 1, maxTimeout: 100000000}
    const operation = retry.operation(options)
    return new Promise((resolve, reject) => {
      operation.attempt(function (currentAttempt) {
        func(currentAttempt).then(function (result) {
          resolve(result)
        }).catch(function (err) {
          if (operation.retry(err)) {
            return
          }
          reject(err)
        })
      })
    })
  }
}
