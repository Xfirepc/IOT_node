# platziverse-mqtt

## `agent/connected`

```js
{
  agent: {
    uuid,  // autogenerate
    username, // define por config
    name, // definir por config
    hostname, //obtener del sistema
    pid // obtener del proces
  }
}
```


## `agent/disconnected`


```js
{
  agent:{
    uuid
  }
}
```


## `agent/message`


```js
{
  agent,
  metrics: [
    {
      type,
      value
    }
  ],
  timestamp, // Cuando lo creamoss
}
```