import { mqttOverrideTopic } from './config'

let overrideStatus = false

export const overrideHandler = (topic: string, payload: Buffer) => {
  if (topic === mqttOverrideTopic) {
    const content = payload.toString()

    overrideStatus = (content === 'on')
  }
}

export const getOverrideStatus = () => overrideStatus
