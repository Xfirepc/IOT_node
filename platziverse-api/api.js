'use strict'

const debug = require('debug')('platziverse:api:routes')
const db = require('platziverse-db')
const configDB = require('../platziverse-db/config-db')(false)

const express = require('express')
const auth = require('express-jwt')
const guard = require('express-jwt-permissions')()
const config = require('./config')

const api = express.Router()

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
    agents = await Agent.findByUsername(user.username)
    if(user.admin)
      agents = await Agent.findConnected()
      
  } catch (e) {
    return next(e)
  }

  res.send({agents})
})

api.get('/agent/:uuid', auth(config), async (req, res, next) => {
  const { uuid } = req.params
  const { user } = req
  debug('A request has to come /agent/:uuid')

  if( !user || !user.username ){
    return next(new Error('Not Authorized'))
  }
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

api.get('/metrics/:uuid', auth(config), guard.check(['metrics:read']), async (req, res, next) => {
  const { uuid } = req.params
  const { user } = req
  debug('A request has to come /metrics/:uuid')

  if( !user || !user.username ){
    return next(new Error('Not Authorized'))
  }

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

api.get('/metrics/:uuid/:type', auth(config), async (req, res, next) => {
  const { uuid, type } = req.params
  const { user } = req
  debug('A request has to come /metrics/:uuid/:type')

  if( !user || !user.username ){
    return next(new Error('Not Authorized'))
  }

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
