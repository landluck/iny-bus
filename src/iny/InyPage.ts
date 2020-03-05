import { Context } from '../types/index'
import { PAGE_LIFE_TIMES } from './../config'
import { onLoad, verifyEvents, onUnload } from './base'

function InyPage<T extends Context>(ctx: T): T {
  const { inyEvents } = ctx

  if (!verifyEvents(inyEvents)) {
    return ctx
  }

  onLoad(ctx, PAGE_LIFE_TIMES.onLoad)

  onUnload(ctx, PAGE_LIFE_TIMES.onUnload)

  return ctx
}

export default InyPage
