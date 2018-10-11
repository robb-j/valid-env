#!/usr/bin/env node
const validEnv = require('./index')

let args = process.argv.slice(2)

validEnv(args)
