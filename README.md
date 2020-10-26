# Valid Environment

Check your node environment is set up just right and fail if variables aren't set.
A super slim, zero dependency package for checking environment variables aren't undefined.

> NOTE: It checks variables for `=== undefined` so if a variable is set to
> another [falsy value](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)
> it will pass the check.
> This means you can safely set variables to those falsy values if you want to.

## Package motivation

I created this package because lots of my npm-based projects needed to check certain environment variables were set and I didn't want to keep copying the code from repo to repo.

Its designed to be as light as possible so there are no dependancies and minimal code, I'm just interested in repurposing this same code quickly.

## Usage

There are three ways of using this package,
it also provides type definitions so you can easily use it in TypeScript.

### 1 - Exit the current process

This is the primary use case, you can put this snippet during the startup
of your project and quickly assert all the required environment variables are set.

**in JavaScript**

```js
const { validateEnv } = require('valid-env')

validateEnv(['MYSQL_URI', 'SERVICE_KEY', 'NUM_CARROTS'])

// exit 1: Missing environment variables: SERVICE_KEY, NUM_CARROTS
```

**in TypeScript**

```ts
import { validateEnv } from 'valid-env'

validateEnv(['MYSQL_URI', 'SERVICE_KEY', 'NUM_CARROTS'])

// exit 1: Missing environment variables: SERVICE_KEY, NUM_CARROTS
```

### 2 - As a package.json script

An alternate case is to use a pre-x script in your `package.json`
to check environment variables there.
This works when you have this package as a dependency.

```json
{
  "scripts": {
    "prestart": "validEnv DATABASE_URL SERVICE_KEY NUM_CARROTS"
  }
}
```

### 3 - Throwing errors

You can also use the internal `#checkVariables` method to only throw an error,
if you don't want to exit the process.

**in JavaScript**

```js
const { checkVariables } = require('valid-env')

checkVariables(['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'MYSQL_URI'])
```

**in TypeScript**

```ts
import { checkVariables } from 'valid-env'

checkVariables(['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'MYSQL_URI'])
```

### 4 - Validating an object

You can use `#validateEnvObject` to check every value on an object is non-undefined
and return a new object that is retyped without undefined.
You can add more than just strings this way.
It will throw an error if any value is set to undefined.

**in JavaScript**

```js
const { checkEnvObject } = require('valid-env')

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, MYSQL_URI } = process.env
const CORS_HOSTS = env.CORS_HOSTS?.split(',') ?? []

const env = checkEnvObject({
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  MYSQL_URI,
  CORS_HOSTS
})
```

## Typed example

Use `#validateEnvObject` and `#pluck` together to quickly destructure `process.env`,
create a new type and assert it is non-undefined.

Benefits:

- Single source of truth
- Assert out `undefined` values
- Fail early for unset envrionment variables of any type
- Optionally pass in an env object for testing
- Less places to make mistakes
- Export `Env` type for reuse in other places
- Add custom non-string values in there

**env.ts**

```ts
import { pluck, checkEnvObject } from 'valid-env'

export type Env = ReturnType<typeof createEnv>

export function createEnv(env = process.env) {
  const CORS_HOSTS = env.CORS_HOSTS?.split(',') ?? []

  return checkEnvObject({
    ...pluck(env, 'APP_NAME', 'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY'),
    CORS_HOSTS
  })
}
```

## Future work

- ???

---

> This project was setup with [robb-j/ts-node-base](https://github.com/robb-j/ts-node-base)
