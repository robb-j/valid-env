import { checkVariables } from '../validator'

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
