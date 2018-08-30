'use strict'

const debug = require('debug')('platziverse:api:routes')
const express = require('express')
const db = require('platziverse-db')
const configDB = require('../platziverse-db/config-db')(false)
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


api.get('/agents', async (req, res, next) => {
  debug('A request has to come /agents')
  let agents = []
  try {
    agents = await Agent.findConnected()
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




api.get('/agent/:metrics', (req, res) => {
  const { uuid } = req.params
  res.send({ uuid })
})

api.get('/agent/:uuid/:type', (req, res) => {
  const { uuid, type } = req.params
  res.send({ uuid, type })
})
module.exports = api
