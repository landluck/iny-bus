import  { createUid } from '../src/utils'

describe('utils', () => {
  test('should is Date', () => {
    expect(typeof createUid()).toBe('string')
    expect(typeof createUid()).toBe('string')
  })
})
