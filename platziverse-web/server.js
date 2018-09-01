const http = require('http')
const path = require('path')
const express = require('express')
const debug = require('debug')('platziverse:web')
const chalk = require('chalk')


const app = express()
const port = process.env.PORT || 8080
const server = http.createServer(app)


app.use(express.static(path.join(__dirname, 'public')))

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stak)
  process.exit(1)
}

process.on('uncaghtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

server.listen(port, () => {
  console.log(`${chalk.green('[platziverse-web]')} server running on port: ${port}`)
})



