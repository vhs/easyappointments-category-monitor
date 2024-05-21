import Debug, { type Debugger } from 'debug'
import { resolve, join } from 'path'

export const BASEDIR = resolve(join('.'))

export const getDebugger = (componentName: string): Debugger => {
    return Debug('app:' + componentName)
}
