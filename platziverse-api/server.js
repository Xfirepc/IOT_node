'use strict'

const debug = require('debug')('platziverse:api:reputes')
const http = require('http')
const express = require('express')
const chalk = require('chalk')

const api = require('./api')

const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)

app.use('/api', api)

// Express Error Handler

app.use((err, req, res, next) => {
  debug(`Error: ${err.message}`)

  if (err.message.match(/not found/))
    return res.status(404).send({ error: err.message })

  res.status(500).send({ error: err.message })
})



function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stak)
  process.exit(1)
}

 process.on('uncaghtException', handleFatalError)
 process.on('unhandledRejection', handleFatalError)


server.listen(port, () => {
  console.log(`${chalk.green('[platziverse-api]')} server runng on port: ${port}`)
})
