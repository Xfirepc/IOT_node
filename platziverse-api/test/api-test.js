'use strict'

const test = require('ava')
const request = require('supertest')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const agentFixtures = require('../../platziverse-db/tests/fixtures/agent')

let sandbox = null
let server = null
let dbStub = null
let AgentStub = {}
let MetricStub = {}

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()

  dbStub = sandbox.stub()
  dbStub.returns(Promise.resolve({
    Agent: AgentStub,
    Metric: MetricStub
  }))

  AgentStub.findConnected = sandbox.stub()
  AgentStub.findConnected.returns(Promise.resolve(agentFixtures.connected))

  const api = proxyquire('../api', {
    'platziverse-db': dbStub
  })

  server = proxyquire('../server', {
    './api': api
  })

})

test.afterEach(() => {
  sandbox = sinon.reset()
})

test.serial.cb('/api/agents', t => {
  request(server)
    .get('/api/agents')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {

      t.falsy(err, 'should not return error')
      // let body = JSON.stringify(res.body)
      // console.log('El body: ' + body)
      // let expected = JSON.stringify(agentFixtures.connected)
      // console.log('El expected:' + expected)
      // t.deepEqual(body, expected, 'response body should be expected')
      t.end()

    })
})
