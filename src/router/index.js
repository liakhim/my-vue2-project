import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/settings',
        name: 'Settings',
        component: () => import('@/components/AccountSettings.vue')
    },
    {
        path: '/',
        name: 'Cover',
        component: () => import('@/components/Cover.vue') // ленивая загрузка
    }
]

const router = new VueRouter({
    mode: 'history', // убирает # из URL
    base: process.env.BASE_URL,
    routes
})

export default router