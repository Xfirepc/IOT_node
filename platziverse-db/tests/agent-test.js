'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

let db = null

let config = {
  logging: function() {}
}

let MetricStub = {
  belongsTo: sinon.spy()
}

let AgentStub = null
let sandbox = null

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()

  AgentStub = {
    hasMany: sandbox.spy()
  }

  const setupDatabase = proxyquire('../', {
    './models/agent': () => AgentStub,
    './models/metric': () => MetricStub

  })
  db = await setupDatabase(config)
})

test.afterEach(() => {
  sandbox = sinon.createSandbox()
})

test('Agent', t => {
  t.truthy(db.Agent, 'Agent Service should exist')
})

test.serial('Setup', t => {
  t.truthy(AgentStub.hasMany.called, 'AgentModel.hasMAny was executed')
  t.truthy(MetricStub.belongsTo.called, 'MetricModel.belongsTo was executed')
})


