'use strict'

const debug = require('debug')('platziverse:mqtt')
const mosca = require('mosca')
const redis = require('redis')
const chalk = require('chalk')
const db = require('../platziverse-db')
const config = require('../platziverse-db/config-db')(false)

const backend = {
  type: redis,
  redis,
  return_buffers: true
}

const settings = {
  port: 1883,
  backend
}

const server = new mosca.Server(settings)

let Agent, Metric

server.on('clientConnected', client => {
  debug(`Client Connected: ${client.id}`)
})

server.on('clientDisconnected', client => {
  debug(`Client Disconnected: ${client.id}`)
})

server.on('published', (packet, client) => {
  debug(`Received: ${packet.topic}`)
  debug(`Payload: ${packet.payload}`)
})

server.on('ready', async () => {
  const services = await db(config).catch(handleFatalError)

  Agent = services.Agent
  Metric = services.Metric

  console.log(`${chalk.green('[platziverse-mqtt]')} Server is ready`)
})

server.on('error', handleFatalError)

function handleFatalError (err) {
  console.error(`${chalk.red('FATAL ERROR:')} err.message`)
  console.error(`${chalk.red('STACK ERROR:')} err.stack`)
  process.exit(1)
}

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)
