import { getDebugger } from './lib/utils'

import { checkInterval, activeValue, inactiveValue } from 'src/lib/config'

import { checkCurrentStatus } from 'src/lib/easyappointments'
import { sendMQTTStatusMessage } from 'src/lib/mqtt'

const debug = getDebugger('main')

debug('Starting up')

const doMain = async () => {
  debug('Checking status')

  try {
    const active = await checkCurrentStatus()

    if (active) {
      debug('Status is active')
    } else {
      debug('Status is not active')
    }

    debug('Sending message')

    sendMQTTStatusMessage(active ? activeValue : inactiveValue)

    setTimeout(doMain, checkInterval)
  } catch (e: any) {
    if (e.response !== undefined && e.response.data !== undefined) {
      console.error(e.response.data)
    } else {
      console.error(e)
    }
  }
}

debug('Starting main loop')

doMain()
