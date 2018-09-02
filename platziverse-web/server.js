const http = require('http')
const path = require('path')
const express = require('express')
const debug = require('debug')('platziverse:web')
const chalk = require('chalk')
const socketio= require('socket.io')
const PlatziverseAgent = require('../platziverse-agent')

const { pipe } = require('./pipe')

const app = express()
const port = process.env.PORT || 8080
const server = http.createServer(app)
const io = socketio(server)
const agent = new PlatziverseAgent()


app.use(express.static(path.join(__dirname, 'public')))


// Socket.io / web sockets

io.on('connect', socket => {
  debug('Connected on socket!  ' + socket.id )

  pipe(agent, socket)
})


function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stak)
  process.exit(1)
}

process.on('uncaghtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

server.listen(port, () => {
  console.log(`${chalk.green('[platziverse-web]')} server running on port: ${port}`)
  agent.connect()
})



