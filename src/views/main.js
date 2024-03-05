import App from './index.vue'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'


const app = createApp(App)

export default app

if (typeof window !== 'undefined') {
  app.use(ElementPlus).mount('#app')
}