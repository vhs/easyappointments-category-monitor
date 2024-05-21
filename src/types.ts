import type convict from 'convict/index'

export interface AppConfig extends convict.Config<unknown> {
    baseUrl: string
    apiKey: string
    categoryId: number
    checkInterval: number
    mqttUri: string
}

export interface RequestConfig {
    url: string
    method?: string
    params?: object
    data?: object
}

export interface EasyAppointmentsService {
    id: number
    name: string
    duration: number
    price: number
    currency: string
    description: string
    location: string
    availabilitiesType: string
    attendantsNumber: number
    categoryId: number
}

export interface EasyAppointmentsAppointment {
    id: number
    book: string
    start: string
    end: string
    hash: string
    location: string
    notes: string
    customerId: number
    providerId: number
    serviceId: number
    googleCalendarId: unknown
}
