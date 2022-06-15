import MQTT from 'async-mqtt'

import { mqttServiceTopic, mqttStatusTopic, mqttUri } from 'src/lib/config'

import { getDebugger } from './utils'

const debug = getDebugger('mqtt')
const messageDebug = debug.extend('mqtt:message')

debug('Connecting to', mqttUri)

const client = MQTT.connect(mqttUri)

let connected = false

client.on('connect', () => {
  debug('Connected')
  connected = true

  setInterval(() => {
    if (connected) {
      debug('Sending status message')
      client.publish(mqttServiceTopic, JSON.stringify({ status: 'online', ts: Date.now() }))
    }
  }, 5000)
})

export const sendMQTTStatusMessage = (message: string) => {
  if (!connected) {
    messageDebug('Not connected')
    return false
  }

  messageDebug('Sending message', mqttStatusTopic, '->', message)

  client.publish(mqttStatusTopic, message)
}
