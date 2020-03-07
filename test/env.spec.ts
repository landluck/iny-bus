import { isAliPay } from '../src/env'

describe('env', () => {
  test('should alipay env', () => {
    expect(isAliPay()).toBeFalsy()

    // @ts-ignore
    window.my = {}
    // @ts-ignore
    window.my.getSystemInfo = function() {}
    expect(isAliPay()).toBeTruthy()
  })
})
