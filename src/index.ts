import { getDebugger } from './lib/utils'

import { checkInterval, activeValue, inactiveValue } from 'src/lib/config'

import { checkCurrentStatus } from 'src/lib/easyappointments'
import { sendMQTTStatusMessage } from 'src/lib/mqtt'
import { getOverrideStatus } from './lib/override'

const debug = getDebugger('main')

debug('Starting up')

const doMain = async () => {
  debug('Checking status')

  try {
    const active = await checkCurrentStatus()

    const override = getOverrideStatus()

    const status = override || active

    debug(status ? 'Status is active' : 'Status is not active')

    sendMQTTStatusMessage(status ? activeValue : inactiveValue)
  } catch (e: any) {
    if (e.response !== undefined && e.response.data !== undefined) {
      console.error(e.response.data)
    } else {
      console.error(e)
    }
  }
}

debug('Starting main loop')

setInterval(doMain, checkInterval)

doMain()
