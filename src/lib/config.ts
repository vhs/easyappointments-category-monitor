import { BASEDIR, getDebugger } from './utils'

import fs from 'fs'
import path from 'path'
import convict from 'convict'

const debug = getDebugger('config')

// Define a schema
const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  baseUrl: {
    doc: 'The base URL.',
    format: String,
    default: 'https://booking.vanhack.ca/index.php/api/v1',
    env: 'BASE_URL',
    arg: 'base-url'
  },
  apiKey: {
    doc: 'The API key.',
    format: String,
    default: 'APIKEY',
    env: 'API_KEY',
    arg: 'api-key'
  },
  categoryId: {
    doc: 'The category id.',
    format: 'int',
    default: 1,
    env: 'CATEGORY_ID',
    arg: 'category-id'
  },
  checkInterval: {
    doc: 'The check interval.',
    format: 'int',
    default: 15000,
    env: 'CHECK_INTERVAL',
    arg: 'check-interval'
  },
  mqttProtocol: {
    doc: 'The MQTT protocol.',
    format: String,
    default: 'tcp',
    env: 'MQTT_PROTOCOL',
    arg: 'mqtt-protocol'
  },
  mqttHost: {
    doc: 'The MQTT host.',
    format: String,
    default: 'test.mosquitto.org',
    env: 'MQTT_HOST',
    arg: 'mqtt-host'
  },
  mqttPort: {
    doc: 'The MQTT port.',
    format: 'port',
    default: 1883,
    env: 'MQTT_PORT',
    arg: 'mqtt-port'
  },
  mqttServiceTopic: {
    doc: 'The MQTT service topic.',
    format: String,
    default: '/test/vhs/spacebus/status/services/easyappointments-mask-schedule-monitor',
    env: 'MQTT_SERVICE_TOPIC',
    arg: 'mqtt-service-topic'
  },
  mqttStatusTopic: {
    doc: 'The MQTT status topic.',
    format: String,
    default: '/test/vhs/spacebus/status/space/mask',
    env: 'MQTT_STATUS_TOPIC',
    arg: 'mqtt-status-topic'
  },
  mqttOverrideTopic: {
    doc: 'The MQTT override topic.',
    format: String,
    default: '/test/vhs/spacebus/status/space/mask-override',
    env: 'MQTT_OVERRIDE_TOPIC',
    arg: 'mqtt-override-topic'
  },
  activeValue: {
    doc: 'The active value.',
    format: String,
    default: 'on',
    env: 'ACTIVE_VALUE',
    arg: 'active-value'
  },
  inactiveValue: {
    doc: 'The inactive value.',
    format: String,
    default: 'off',
    env: 'INACTIVE_VALUE',
    arg: 'inactive-value'
  }
})

const env = config.get('env')

const configFiles = ['config.json', 'config.' + env + '.json']

configFiles.forEach(configFile => {
  debug(`Checking ${configFile}`)
  if (fs.existsSync(path.join(BASEDIR, configFile))) {
    debug(`Loading config from ${configFile}`)
    config.loadFile(path.join(BASEDIR, configFile))
  }
})

config.validate({ allowed: 'strict' })

if (config.get('checkInterval') < 1000) config.set('checkInterval', (config.get('checkInterval') * 1000))

const dumpFields = ['env', 'baseUrl', 'apiKey', 'categoryId', 'checkInterval', 'mqttProtocol', 'mqttHost', 'mqttPort', 'mqttOverrideTopic', 'mqttServiceTopic', 'mqttStatusTopic', 'activeValue', 'inactiveValue']

dumpFields.forEach((key:any) => {
  return debug(key, '\t', config.get(key))
})

export const baseUrl: string = config.get('baseUrl')
export const apiKey: string = config.get('apiKey')
export const categoryId: number = config.get('categoryId')
export const checkInterval: number = config.get('checkInterval')
export const mqttUri: string = `${config.get('mqttProtocol')}://${config.get('mqttHost')}:${config.get('mqttPort')}`
export const mqttServiceTopic: string = config.get('mqttServiceTopic')
export const mqttStatusTopic: string = config.get('mqttStatusTopic')
export const mqttOverrideTopic: string = config.get('mqttOverrideTopic')
export const activeValue: string = config.get('activeValue')
export const inactiveValue: string = config.get('inactiveValue')

export default config
