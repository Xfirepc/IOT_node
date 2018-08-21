'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const agentFixtures = require('./fixtures/agent')


let db = null

let config = {
  logging: function() {}
}

let MetricStub = {
  belongsTo: sinon.spy()
}
let single = Object.assign({}, agentFixtures.single)
let AgentStub = null
let sandbox = null
let id = 1


test.beforeEach(async () => {
  sandbox = sinon.createSandbox()

  AgentStub = {
    hasMany: sandbox.spy()
  }

  // Model findById Stub
  AgentStub.findById = sandbox.stub()
  AgentStub.findById.withArgs(id).returns(Promise.resolve(agentFixtures.byId(id)))

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
  t.truthy(AgentStub.hasMany.calledWith(MetricStub), 'Called with MetricStub')
  t.truthy(AgentStub.hasMany.called, 'AgentModel.hasMAny was executed')
  t.truthy(MetricStub.belongsTo.calledWith(AgentStub), 'Called with AgentStub')
  t.truthy(MetricStub.belongsTo.called, 'MetricModel.belongsTo was executed')
})

test.serial('Agent#findById', async t => {
  let agent = await db.Agent.findById(id)
  t.true(AgentStub.findById.called, 'findById should be called on model')
  t.true(AgentStub.findById.calledOnce, 'findById should be called once')
  t.true(AgentStub.findById.calledWith(id), 'findById should be called with id')
  t.deepEqual(agent, agentFixtures.byId(id), 'should be the same')
})

test.serial('Agent#CreateOrUpdate', async t => {
  let agent = await db.Agent.createOrUpdate(single)

  t.deepEqual(agent, single, 'agent be the same')
})



