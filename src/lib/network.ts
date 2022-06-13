import axios from 'axios'
import { RequestConfig } from 'src/types'

import { apiKey, baseUrl } from 'src/lib/config'
import { getDebugger } from 'src/lib/utils'

const debug = getDebugger('network')

const baseRequest = {
  headers: {
    Authorization: `Bearer ${apiKey}`
  },
  responseType: 'json'
}

export async function doRequest (endpoint: string, method?: string | undefined, params?: {} | undefined) {
  params = params || {}
  method = method || 'GET'
  endpoint = endpoint.substring(0, 1) === '/' ? endpoint.substring(1) : endpoint

  debug('Doing request', endpoint, method, params)

  const url = `${baseUrl}/${endpoint}`

  const request:RequestConfig = {
    ...baseRequest,
    url,
    method
  }

  if (Object.keys(params).length > 0) {
    if (method === 'GET') {
      request.params = params
    } else {
      request.data = params
    }
  }

  const response = await axios(request)

  return response.data
}
