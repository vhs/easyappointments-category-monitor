import Debug from 'debug'
import { resolve, join } from 'path'

export const BASEDIR = resolve(join('.'))

export const getDebugger = (componentName: string) => {
  return Debug('app:' + componentName)
}
