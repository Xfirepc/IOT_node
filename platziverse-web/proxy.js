'use strict'

const express = require('express')
const request = require('request-promise-native')
const { endpoint, apiToken } = require('./config')
const api = express.Router()


api.get('/agents', async (req, res, next) => {
  
  //Hace peticion http a un server API cualquiera 
  const options = {
    method: 'GET',
    url: `${endpoint}/api/agents`,
    headers: {
      'Authorization': `Bearer ${apiToken}`
    },
    json: true
  }

  let resutl 

  try { 
    resutl = await request(options)
  } catch (e) {
    return next(e) 
  }
  
  //Envia al cliente
  res.send(resutl)
})

api.get('/agents/:uuid', (req, res) => {})

api.get('/metrics/:uuid', (req, res) => {})

api.get('/metrics/:uuid/:type', (req, res) => {})
