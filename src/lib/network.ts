import { apiKey, baseUrl } from './config'
import { getDebugger } from './utils'

const debug = getDebugger('network')

const baseRequest = {
    headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept-Language': 'en'
    }
}

export async function doRequest<T = unknown[]>(
    endpoint: string,
    method?: string,
    params?: Record<string, string>
): Promise<T> {
    endpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint
    method = method ?? 'GET'
    params = params ?? {}

    debug('Doing request', endpoint, method, params)

    const url = new URL(`${baseUrl}/${endpoint}`)

    const requestInit: RequestInit = {
        ...baseRequest,
        method
    }

    if (Object.keys(params).length > 0) {
        if (method === 'GET') {
            Object.entries(params).forEach(([k, v]) =>
                url.searchParams.set(k, v)
            )
        } else {
            requestInit.body = JSON.stringify(params)
        }
    }

    return await (await fetch(url, requestInit)).json()
}
