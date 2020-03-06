import { COMPONENT_LIFE_TIMES } from './../config'
import { Context, InyComponent } from '../types/index'
import { onLoad, verifyEvents, onUnload } from './base'

function InyComponents<T extends Context>(ctx: T): InyComponent<T> {
  const { inyEvents } = ctx

  if (!verifyEvents(inyEvents)) {
    return ctx
  }

  onLoad(ctx, COMPONENT_LIFE_TIMES.onLoad)

  onUnload(ctx, COMPONENT_LIFE_TIMES.onUnload)

  return ctx
}

export default InyComponents
