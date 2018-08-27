'use strict'

const debug = require('debug')('platziverse:api:reputes')
const express = require('express')

const api = express.Router()

api.get('/agents', (req, res) => {
  debug('A request has to come /agents')
  res.send({})
})

api.get('/agent/:uuid', (req, res) => {
  const { uuid } = req.params
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
