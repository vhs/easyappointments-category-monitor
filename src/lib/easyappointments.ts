import {
    type EasyAppointmentsAppointment,
    type EasyAppointmentsService
} from '../types'
import { categoryId } from '../lib/config'
import { doRequest } from '../lib/network'
import { getDebugger } from '../lib/utils'

const debug = getDebugger('easyappointments')

export const checkCurrentStatus = async (): Promise<boolean> => {
    debug('Checking current status')

    const now = new Date()
    now.setHours(now.getHours() - 7)

    const services: EasyAppointmentsService[] = await doRequest(
        'services',
        'GET'
    )

    const serviceIds = services
        .filter((service) => service.categoryId === categoryId)
        .map((service) => service.id)

    const appointments =
        await doRequest<EasyAppointmentsAppointment[]>('appointments')

    const inRange = appointments.filter((appointment) => {
        const start = new Date(appointment.start)
        const end = new Date(appointment.end)

        return (
            start <= now &&
            now <= end &&
            serviceIds.includes(appointment.serviceId)
        )
    })

    return inRange.length > 0
}
