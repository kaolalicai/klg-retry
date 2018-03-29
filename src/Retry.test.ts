import * as assert from 'power-assert'
import {Retry} from './Retry'

describe('retry test', function () {

  it('一次成功', async () => {
    const retry = new Retry()
    const result = await retry.using(async function () {
      return Promise.resolve(1)
    })
    assert(result === 1)
  })

  it('第二次成功', async () => {
    let count = 0
    const retry = new Retry()
    const result = await retry.using(async function () {
      count += 1
      if (count < 2) {
        return Promise.reject('err')
      } else {
        return Promise.resolve(count)
      }
    })
    assert(result === 2)
  })

  it('默认5次不成功', async () => {
    let count = 0
    const retry = new Retry()
    const options = {minTimeout: 1}
    try {
      await retry.using(async function () {
        count += 1
        return Promise.reject('err')
      }, options)
    } catch (err) {
      assert(count === 6)
    }
  }, 60000)

  it('设置3次不成功返回', async () => {
    let count = 0
    const retry = new Retry()
    const options = {retries: 3}
    try {
      await retry.using(async function () {
        count += 1
        return Promise.reject('err')
      }, options)
    } catch (err) {
      assert(count === 4)
    }
  }, 60000)

  it.only('随机第n(1-10)次成功', async () => {
    let count = 0
    const retry = new Retry()
    const runCount = Math.ceil(Math.random() * 10)
    const options = {retries: 15, minTimeout: 1}
    const result = await retry.using(async function () {
      count += 1
      if (count < runCount) {
        return Promise.reject('err')
      } else {
        return Promise.resolve(count)
      }
    }, options)
    assert(result === runCount)
  }, 60000)

  it('参数错误', async () => {
    const retry = new Retry()
    try {
      await retry.using('hello')
      assert.fail('should be error')
    } catch (err) {
      assert((/Error: hello is not a function/).test(err))
    }
  })

})
