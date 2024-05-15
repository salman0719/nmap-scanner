const { execSync } = require('node:child_process')
const { serverPort } = require('./constants')

execSync('npx opener http://localhost:' + serverPort)