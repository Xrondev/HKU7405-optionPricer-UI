import {createApp} from 'vue'
import ButtonGroup from "primevue/buttongroup";
import App from './App.vue'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import './style.css'
import ConfirmationService from 'primevue/confirmationservice'
import {createPinia} from "pinia";

// import './demos/ipc'


// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

const app = createApp(App)
const pinia = createPinia()

app.use(PrimeVue).use(ConfirmationService).use(pinia)
    .mount('#app')
    .$nextTick(() => {
        postMessage({payload: 'removeLoading'}, '*')
    })


app.component('ButtonGroup', ButtonGroup)
