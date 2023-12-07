import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router';
import { createPinia } from 'pinia';
import {useUserStore} from './store/userStore'


const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
const userStore = useUserStore();
userStore.getPersistedUser()

app.mount('#app')
