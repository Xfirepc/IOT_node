'use strict'

const debug = require('debug')('platziverse:api:routes')
const express = require('express')
const db = require('platziverse-db')
const configDB = require('../platziverse-db/config-db')
const api = express.Router()

let services, Agent, Metric

api.use('*', async (req, res, next) => {
  if (!services){
    services = await db(configDB)
  }
})

api.get('/agents', (req, res) => {
  debug('A request has to come /agents')
  res.status(200).send({})
})

api.get('/agent/:uuid', (req, res, next) => {
  const { uuid } = req.params
  
  if(uuid !== 'yyy'){
    return next(new Error('Agent not found'))
  }
  res.send({ uuid })
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
