import {createApp} from 'vue'
import ButtonGroup from "primevue/buttongroup";
import App from './App.vue'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import './style.css'



import './demos/ipc'

// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

const app = createApp(App)

app.use(PrimeVue)
    .mount('#app')
    .$nextTick(() => {
        postMessage({payload: 'removeLoading'}, '*')
    })


app.component('ButtonGroup', ButtonGroup)