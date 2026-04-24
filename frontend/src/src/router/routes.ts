// src/router/routes.ts
import { RouterView } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import HomeIndex from '@/views/Home.vue'

const baseUrl = '/'

// Create base children routes
const baseChildren: RouteRecordRaw[] = [
]

// Add home route only in local development
if (import.meta.env.VITE_ENV_NAME === 'dev') {
    baseChildren.unshift({
        path: '',
        name: 'HomeIndex',
        component: HomeIndex
    })
}

const routes: RouteRecordRaw[] = [
    {
        path: baseUrl,
        component: RouterView,
        children: baseChildren
    }
]


export default routes
