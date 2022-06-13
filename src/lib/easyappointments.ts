import { EasyAppointmentsAppointment, EasyAppointmentsService } from 'src/types'
import { categoryId } from 'src/lib/config'
import { doRequest } from 'src/lib/network'
import { getDebugger } from 'src/lib/utils'

const debug = getDebugger('easyappointments')

export const checkCurrentStatus = async () => {
  debug('Checking current status')

  const now = new Date()
  now.setHours(now.getHours() - 7)

  const services: EasyAppointmentsService[] = await doRequest('services', 'GET')

  const serviceIds = services.filter(service => service.categoryId === categoryId).map(service => service.id)

  const appointments: EasyAppointmentsAppointment[] = await doRequest('appointments')

  const inRange = appointments.filter(appointment => {
    const start = new Date(appointment.start)
    const end = new Date(appointment.end)

    return (start <= now) && (now <= end) && (serviceIds.indexOf(appointment.serviceId) > -1)
  })

  return inRange.length > 0
}
