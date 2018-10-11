
/**
 * Check the node environment has certain variables set
 * @param  {string[]}  [keys=[]] The keys to check for
 * @return {void}
 */
module.exports = function validEnv (keys = []) {
  if (!Array.isArray(keys)) return
  
  // Find environment variables which are not defined
  let missing = keys.filter(key => process.env[key] === undefined)
  
  // Stop now if they are all set to something
  if (missing.length === 0) return
  
  // Print the error message
  console.log(
    'Missing environment variables:',
    missing.join(', ')
  )
  
  // Exit with non-success exit code
  process.exit(1)
}
