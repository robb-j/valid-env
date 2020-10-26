import { checkVariables, pluck, checkEnvObject } from '../validator'

describe('#checkVariables', () => {
  it('should throw an error for a missing variable', async () => {
    let invocation = () => checkVariables(['SOME_MISSING_VARIABLE'])
    expect(invocation).toThrow(/Missing environment variables/)
  })
  it('should check for multiple variables', async () => {
    let invocation = () => checkVariables(['A', 'B', 'C'])
    expect(invocation).toThrow('A, B, C')
  })
})

describe('#pluck', () => {
  it('should take values off the provided object', () => {
    const input = {
      a: 1,
      b: 2,
      c: 'geoff',
      d: true,
      e: [42],
    }

    const result: any = pluck(input, 'b', 'c', 'e')

    expect(input).not.toEqual(result)
    expect(result.a).toEqual(undefined)
    expect(result.b).toEqual(2)
    expect(result.c).toEqual('geoff')
    expect(result.d).toEqual(undefined)
    expect(result.e).toEqual([42])
  })
})

describe('#checkEnvObject', () => {
  it('should throw if any key has an undefiend value', () => {
    let invocation = () => checkEnvObject({ a: undefined })
    expect(invocation).toThrow(/Missing environment variables/)
  })
  it('should not throw if all values are not undefined', () => {
    checkEnvObject({
      name: 'Geoff',
      age: 42,
      isCool: false,
      birthday: new Date(),
      petNames: ['Fenton', 'Grumpy cat'],
    })
  })
})
