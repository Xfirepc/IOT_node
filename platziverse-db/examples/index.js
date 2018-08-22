'use strict'

const db = require('../')

async function run () {
  const config = {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'platzi',
    password: process.env.DB_PASS || 'platzi',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres'
  }

  const { Agent, Metric } = await db(config).catch(handleFatalError)

  const agent = await Agent.createOrUpdate({
    uuid: 'yyyz',
    name: 'test2',
    hostname: 'test',
    username: 'test',
    pid: 1,
    connected: true
  }).catch(handleFatalError)

  console.log('--Agent--')
  console.log(agent)
  
  const agents = await Agent.findAll().catch(handleFatalError)
  console.log('--Agents--')
  console.log(agents)
  
  const metric = await Metric.create(agent.uuid, {
    type: 'memory',
    value: '300'
  }).catch(handleFatalError)

  const metrics = await Metric.findByAgentUuid(agent.uuid).catch(handleFatalError)
  console.log('--Metrics by uuid--')
  console.log(metrics)
  
}

function handleFatalError(err) {
  console.error(err.message)
  console.error(err.stack)
  console.exit(1)
}


run()