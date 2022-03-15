import {createApp, reactive} from 'vue'
import App from './App.vue'
import router from "./router";


export const app = createApp(App)
app.config.globalProperties.$bookings = reactive([])

app.use(router)
    .mount('#app')
