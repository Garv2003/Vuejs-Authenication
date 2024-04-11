
import { createRouter, createWebHistory } from 'vue-router';
import Login from "../pages/Login.vue";
import Sign from "../pages/Sign.vue";
import Profile from "../pages/Profile.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Profile',
            component: Profile
        },
        { path: '/login', name: 'Login', component: Login },
        { path: '/sign', name: 'Sign', component: Sign },
    ],
});


export default router;