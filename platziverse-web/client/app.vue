<template>
  <div>
    
    <metric 
      uuid="aa5f3d11-dd98-4d36-b70b-0881cb389a91" 
      type="promiseMetric"
      :socket = "socket" 
    ></metric>
    <agent
      v-for="agent in agents"
      :uuid="agent.uuid"
      :key="agent.uuid">
    </agent>
    <p v-if="error">{{error}}</p>
  </div>
</template>

<style>
  body {
    font-family: Arial;
    background: #d3d3d3;
    margin: 0;
  }
</style>

<script>

const io = require('socket.io-client')
const socket = io()

module.exports = {
  data () {
    return {
      agents: [],
      error: null,
      socket
    }
  },
  mounted () {
    this.initialize()
  },
  methods: {
    initialize () {
    }
  }
}
</script>