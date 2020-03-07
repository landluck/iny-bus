import { isAliPay } from './env'

export const PAGE_LIFE_TIMES = {
  onLoad: 'onLoad',
  onUnload: 'onUnload'
}

export const APP_LIFE_TIMES = {
  onLoad: 'onLaunch',
  onUnload: ''
}

export const COMPONENT_LIFE_TIMES = isAliPay()
  ? {
      onLoad: 'onInit',
      onUnload: 'didUnmount'
    }
  : {
      onLoad: 'created',
      onUnload: 'detached'
    }
