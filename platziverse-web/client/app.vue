<template>
  <div>
    
    <metric uuid="709cd12c-5f4a-431b-9961-5b6928547b63" type="promiseMetric"></metric>
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
module.exports = {
  data () {
    return {
      agents: [],
      error: null
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