import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'
import Admin from '../views/Admin/Admin.vue'
import AdminEdit from '../views/Admin/AdminEdit.vue'
import { useUserStore } from '../store/userStore';
import CarsCreate from '../views/CarsCreate.vue'


function validateAdmin() {
    const userStore = useUserStore();
    return userStore.role === 'admin' ? true : { path: '/notfound' }

}



const routes = [
    { path: '/', component: Home },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/admin', component: Admin, beforeEnter: validateAdmin },
    { path: '/adminEdit/:_id', component: AdminEdit, beforeEnter: validateAdmin },
    { path: '/notfound', component: NotFound },
    { path: '/cars-create', component: CarsCreate },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
