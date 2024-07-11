import { getDebugger } from './lib/utils'

import { checkInterval, activeValue, inactiveValue } from './lib/config'

import { checkCurrentStatus } from './lib/easyappointments'
import { sendMQTTStatusMessage } from './lib/mqtt'
import { getOverrideStatus } from './lib/override'

const debug = getDebugger('main')

debug('Starting up')

const doMain = async (): Promise<void> => {
    debug('Checking status')

    try {
        const active = await checkCurrentStatus()

        const override = getOverrideStatus()

        const status = override || active

        debug(status ? 'Status is active' : 'Status is not active')

        await sendMQTTStatusMessage(status ? activeValue : inactiveValue)
    } catch (err: unknown) {
        console.error((err as Error).message)
    }
}

debug(`Starting main loop (every ${checkInterval})`)

setInterval(() => doMain(), checkInterval)

void doMain()
