import { splitMoney } from './splitMoney'

describe('splitMoney', () => {
  it('should error when given a negative amount', () => {
    expect(() => splitMoney(-1, 2)).toThrow()
  })

  it('should error when given an amount with more than two decimal places', () => {
    expect(() => splitMoney(10.123, 2)).toThrow()
  })

  it('should error when given a negative count', () => {
    expect(() => splitMoney(10.12, -1)).toThrow()
  })

  it('should error when given a zero count', () => {
    expect(() => splitMoney(10.12, 0)).toThrow()
  })

  it('should error when given a decimal count', () => {
    expect(() => splitMoney(10.12, 3.2)).toThrow()
  })

  it('should work with evenly splittable number', () => {
    const actual = splitMoney(300, 3)
    const expected = [ 100, 100, 100 ]

    expect(actual).toEqual(expected)
  })

  it('should work with evenly splittable decimal number', () => {
    const actual = splitMoney(300.30, 3)
    const expected = [ 100.10, 100.10, 100.10 ]

    expect(actual).toEqual(expected)
  })

  it('should work with unevenly splittable decimal number', () => {
    const actual = splitMoney(800, 3)
    const expected = [ 266.66, 266.67, 266.67 ]

    expect(actual).toEqual(expected)
  })
})
