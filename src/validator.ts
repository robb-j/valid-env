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
  const missing = keys.filter(key => process.env[key] === undefined)

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
    console.log(error.message)
    process.exit(1)
  }
}
