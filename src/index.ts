import bus from './bus'
export * from './types/index'
import inyApp from './extends/app'
import inyPage from './extends/page'
import inyComponent from './extends/component'

bus.app = inyApp
bus.page = inyPage
bus.component = inyComponent

export default bus
