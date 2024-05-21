import MQTT from 'async-mqtt'

import {
    mqttOverrideTopic,
    mqttServiceTopic,
    mqttStatusTopic,
    mqttUri
} from './config'

import { overrideHandler } from './override'
import { getDebugger } from './utils'

const debug = getDebugger('mqtt')
const messageDebug = debug.extend('mqtt:message')

debug('Connecting to', mqttUri)

const client = MQTT.connect(mqttUri)

let connected = false

const clientOnHandler = async (): Promise<void> => {
    debug('Connected')
    connected = true

    setInterval(() => {
        if (connected) {
            debug('Sending status message')
            void client.publish(
                mqttServiceTopic,
                JSON.stringify({ status: 'online', ts: Date.now() })
            )
        }
    }, 5000)

    await client.subscribe(mqttOverrideTopic)

    client.on('message', (topic: string, payload: Buffer) => {
        void overrideHandler(topic, payload)
    })
}

client.on('connect', () => {
    void clientOnHandler()
})

export const sendMQTTStatusMessage = async (message: string): Promise<void> => {
    if (!connected) {
        messageDebug('Not connected')
        return
    }

    messageDebug('Sending message', mqttStatusTopic, '->', message)

    await client.publish(mqttStatusTopic, message)
}
