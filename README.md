# Valid Environment

```js
const validateEnv = require('valid-env')

validateEnv([ 'DATABASE_URL', 'SERVICE_KEY', 'NUM_CARROTS' ])

// exit 1: Missing environment variables: SERVICE_KEY, NUM_CARROTS
```

Check your node environment is set up just right and fail if variables aren't set.

Or if you want, place this in your **package.json**:

```json
{
  "scripts": {
    "prestart": "validEnv DATABASE_URL SERVICE_KEY NUM_CARROTS"
  }
}
```
