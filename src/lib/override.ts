import { mqttOverrideTopic, activeValue, inactiveValue } from './config'
import { sendMQTTStatusMessage } from './mqtt'
import { getDebugger } from './utils'

const debug = getDebugger('override')

let overrideStatus = false
let lastOverrideStatus = overrideStatus

export const overrideHandler = (topic: string, payload: Buffer) => {
  if (topic === mqttOverrideTopic) {
    const content = payload.toString()

    overrideStatus = (content === 'on')

    if (overrideStatus !== lastOverrideStatus) {
      debug('Override enabled. Pushing new status:', activeValue)
      sendMQTTStatusMessage(overrideStatus ? activeValue : inactiveValue)
      lastOverrideStatus = overrideStatus
    }
  }
}

export const getOverrideStatus = () => overrideStatus
