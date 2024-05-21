import { apiKey, baseUrl } from './config'
import { getDebugger } from './utils'

const debug = getDebugger('network')

const baseRequest = {
    headers: {
        Authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json;charset=UTF-8'
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

    const urlParts = [`${baseUrl}/${endpoint}`]

    const requestOptions: RequestInit = {
        ...baseRequest,
        method
    }

    if (Object.keys(params).length > 0) {
        if (method === 'GET') {
            const queryString = new URLSearchParams(params)

            urlParts.push(queryString.toString())
        } else {
            requestOptions.body = JSON.stringify(params)
        }
    }

    return await (await fetch(urlParts.join('?'), requestOptions)).json()
}
