import * as assert from 'power-assert'
import {Retry} from './Retry'

describe(' Retry Test ', function () {
  const retry = new Retry()
  it('correct params', async () => {
    const result = await retry.using(async function () {
      return Promise.resolve(1)
    })
    assert(result === 1)
  })
})
