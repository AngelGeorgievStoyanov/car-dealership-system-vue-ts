import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import NotFound from '../views/NotFound.vue';
import Admin from '../views/Admin/Admin.vue';
import AdminEdit from '../views/Admin/AdminEdit.vue';
import { useUserStore } from '../store/userStore';
import CarsCreate from '../views/CarsCreate.vue';
import CarsDetails from '../views/CarsDetails.vue';
import * as userService from '../services/userService';

async function validateAdmin() {
    const userStore = useUserStore();
    if (userStore && userStore._id) {
        const user = await userService.findUserById(userStore._id).then((data) => { return data }).catch((error) => console.log(error.message || error))
        return user && user.role === 'admin' ? true : { path: '/notfound' }
    } else {
        return { path: '/notfound' }
    }
}


async function validateManagerAdmin() {
    const userStore = useUserStore();
    if (userStore && userStore._id) {
        const user = await userService.findUserById(userStore._id).then((data) => { return data }).catch((error) => console.log(error.message || error))
        return user && (user.role === 'admin' || user.role === 'manager') ? true : { path: '/notfound' }
    } else {
        return { path: '/notfound' }
    }
}

async function validateUser() {
    const userStore = useUserStore();
    if (userStore && userStore._id) {
        const user = await userService.findUserById(userStore._id).then((data) => { return data }).catch((error) => console.log(error.message || error))
        return user && (user._id == userStore._id) ? true : { path: '/' }
    } else {
        return { path: '/' }
    }
}

function logedInUser() {
    const userStore = useUserStore();
    return userStore && userStore._id ? { path: '/' } : true

}


const routes = [
    { path: '/', component: Home },
    { path: '/register', component: Register, beforeEnter: logedInUser },
    { path: '/login', component: Login, beforeEnter: logedInUser },
    { path: '/admin', component: Admin, beforeEnter: validateAdmin },
    { path: '/adminEdit/:_id', component: AdminEdit, beforeEnter: validateAdmin },
    { path: '/notfound', component: NotFound },
    { path: '/cars-create', component: CarsCreate, beforeEnter: validateManagerAdmin },
    { path: '/cars-details/:_id', component: CarsDetails, beforeEnter: validateUser },
    { path: '/cars-edit/:_id', component: CarsCreate, beforeEnter: validateManagerAdmin },
    { path: '/:pathMatch(.*)*', component: NotFound },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
