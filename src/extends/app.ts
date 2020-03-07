import { Context, InyApp } from '../types/index'
import { APP_LIFE_TIMES } from '../config'
import { onLoad, verifyEvents, onUnload } from './base'

function inyApp<T extends Context>(ctx: T): InyApp<T> {
  const { busEvents } = ctx

  if (!verifyEvents(busEvents)) {
    return ctx
  }

  onLoad(ctx, APP_LIFE_TIMES.onLoad)

  onUnload(ctx, APP_LIFE_TIMES.onUnload)

  return ctx
}

export default inyApp
