/**
 * Check the node environment has certain variables set or throw an error
 * @throws
 */
export function checkVariables(keys = new Array<string>()) {
  //
  // Fail if we weren't passed an array
  //
  if (!Array.isArray(keys)) {
    throw new Error('#checkVariables not passed a string[]')
  }

  //
  // See which enivornment variables are undefined
  //
  const missing = keys.filter((key) => process.env[key] === undefined)

  //
  // If there are any, create an error with the missing variable names
  //
  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`)
  }
}

/**
 * Check the node environment has certain variables set or exit the program
 * (with a status code of 1)
 */
export function validateEnv(keys = new Array<string>()) {
  try {
    //
    // Check the variables (which throws an error)
    //
    checkVariables(keys)
  } catch (error) {
    //
    // Catch the missing variables error and exit the process
    //
    console.error(error.message)
    process.exit(1)
  }
}

/** A non-undefined value, `EnvRecord` doesn't work with this inline (ts v3.9.5) */
export type NonUndef<T> = T extends undefined ? never : T

/** An object where all values are not undefined */
export type EnvObject<T extends object> = {
  [K in keyof T]: NonUndef<T[K]>
}

/**
 * Validate an env object contains no null values
 * and return a re-typed object with no undefined values
 * @param input The input record to assert
 */
export function checkEnvObject<T extends object>(input: T): EnvObject<T> {
  //
  // Find keys in the object which have undefined values
  //
  const missing: string[] = []
  for (const key in input) {
    if (input[key] === undefined) missing.push(key)
  }

  //
  // Throw an error now if there are any missing keys
  //
  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`)
  }

  //
  // Return a retyped input to remove undefined values
  //
  return input as any
}

/** Pluck out key-values from an object and return a partial shallow clone */
export function pluck<T, K extends keyof T>(
  input: T,
  ...keys: K[]
): Pick<T, K> {
  const output: Pick<T, K> = {} as any

  for (const key of keys) {
    output[key] = input[key]
  }

  return output
}
