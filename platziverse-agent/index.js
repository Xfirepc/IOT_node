'use strict'

const EventEmmiter = require('events')

class PlatziverseAgent extends EventEmmiter{
  constructor(opts) {
    super()

    this._options = opts
    this._timer = null
    this._started = false
  }

  connect() {
    if(!this._started){
      this._started = true
      this.emit('connected')
      const opts = this._options

      this._timer = setInterval(() => {
        this.emit('agent/message', 'this is a message')
      }, opts.interval)

    }
  }

  disconnect() {
    if(this._started) {
      clearInterval(this._timer)
      this._started = false
      this.emit('disconnected')
    }
  }
}
module.exports = PlatziverseAgent

