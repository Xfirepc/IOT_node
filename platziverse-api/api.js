'use strict'

const debug = require('debug')('platziverse:api:routes')
const express = require('express')
const db = require('platziverse-db')
const configDB = require('../platziverse-db/config-db')(false)
const api = express.Router()
const auth = require('express-jwt')
const config = require('./config')

let services, Agent, Metric

api.use('*', async (req, res, next) => {
  if (!services) {
    debug('Connecting to database..')

    try {
      services = await db(configDB)
    } catch (e) {
      return next(e)
    }

    Agent = services.Agent
    Metric = services.Metric
  }

  next()
})

api.get('/agents', auth(config), async (req, res, next) => {
  debug('A request has to come /agents')
  const { user } = req

  if( !user || !user.username ){
    return next(new Error('Not Authorized'))
  }

  let agents = []

  try {
    if(user.admin)
      agents = await Agent.findConnected()
      
    agents = await Agent.findByUsername(user.username)
  } catch (e) {
    return next(e)
  }

  res.send({agents})
})

api.get('/agent/:uuid', async (req, res, next) => {
  const { uuid } = req.params
  debug('A request has to come /agent/:uuid')

  let agent

  try {
    agent = await Agent.findByUuid(uuid)
  } catch (e) {
    return next(e)
  }

  if (!agent) {
    return next(new Error(`Agent with uuid ${uuid} not found`))
  }

  res.send({ agent })
})

api.get('/metrics/:uuid', async (req, res, next) => {
  const { uuid } = req.params
  debug('A request has to come /metrics/:uuid')

  let metrics = []

  try {
    metrics = await Metric.findByAgentUuid(uuid)
  } catch (e) {
    return next(e)
  }

  if (!metrics || metrics.length === 0) {
    return next(new Error(`Metrics not found for agent ID: ${uuid}`))
  }
  res.send({ metrics })
})

api.get('/metrics/:uuid/:type', async (req, res, next) => {
  const { uuid, type } = req.params

  debug('A request has to come /metrics/:uuid/:type')

  let metrics = []

  try {
    metrics = await Metric.findByTypeAgentUuid(type, uuid)
  } catch (e) {
    return next(e)
  }

  if (!metrics || metrics.length === 0) {
    return next(new Error(`Metrics not found for agent ID: ${uuid} and type: ${type}`))
  }

  res.send({ metrics })
})
module.exports = api
