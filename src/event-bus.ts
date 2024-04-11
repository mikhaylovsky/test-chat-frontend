import { TinyEmitter } from 'tiny-emitter'

const emitter: TinyEmitter = new TinyEmitter()

export default {
  $on: (event: string, callback: Function, ctx?: any) => emitter.on(event, callback, ctx),
  $once: (event: string, callback: Function, ctx?: any) => emitter.once(event, callback, ctx),
  $off: (event: string, callback?: Function) => emitter.off(event, callback),
  $emit: (event: string, ...args: any[]) => emitter.emit(event, ...args)
}
