import MQTT from 'async-mqtt'

import { mqttTopic, mqttUri } from 'src/lib/config'

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
      client.publish('/test/vhs/status/space/mask', '' + Date.now())
    }
  }, 5000)
})

export const sendMQTTMessage = (message: string) => {
  if (!connected) {
    messageDebug('Not connected')
    return false
  }

  messageDebug('Sending message', mqttTopic, '->', message)

  client.publish(mqttTopic, message)
}
