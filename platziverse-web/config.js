'use strict'

module.exports = {
  endpoint: process.env.API_ENDPOINT || 'http://localhost:3000',
  apiToken: process.env.API_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBsYXR6aSIsImFkbWluIjp0cnVlLCJwZXJtaXNzaW9ucyI6WyJtZXRyaWNzOnJlYWQiXSwiaWF0IjoxNTM1OTIzNjA5fQ.ubQxhq60qtYdKcujrSwc3LdZSd6sS-U_fxuz38oYu-A',
  serverHost: process.env.SERVER_HOST || 'http://localhost:8080'
}