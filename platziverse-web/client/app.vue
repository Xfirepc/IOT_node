<template>
  <div>
    
    <metric uuid="db14078a-86a5-417b-a2dc-86c77d5ee32b" type="promiseMetric"></metric>
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