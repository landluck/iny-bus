import { Context, InyApp } from './../types/index'
import { APP_LIFE_TIMES } from './../config'
import { onLoad, verifyEvents, onUnload } from './base'

function InyApp<T extends Context>(ctx: T): InyApp<T> {
  const { inyEvents } = ctx

  if (!verifyEvents(inyEvents)) {
    return ctx
  }

  onLoad(ctx, APP_LIFE_TIMES.onLoad)

  onUnload(ctx, APP_LIFE_TIMES.onUnload)

  return ctx
}

export default InyApp
