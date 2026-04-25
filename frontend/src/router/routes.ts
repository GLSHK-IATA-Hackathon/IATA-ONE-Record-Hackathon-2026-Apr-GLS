// src/router/routes.ts
import { RouterView } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import HomeIndex from '@/views/Home.vue'
import HelloWorld from '@/views/HelloWorld.vue'
import Dashboard from '@/views/Dashboard.vue'
import CarrierCodeMaintenance from '@/views/CarrierCodeMaintenance.vue'
import DashboardDetail from '@/views/DashboardDetail.vue'
import ShipmentList from '@/views/ShipmentList.vue'

const baseUrl = '/'

// Create base children routes
const baseChildren: RouteRecordRaw[] = [
    {
        path: 'hello-world',
        name: 'HelloWorld',
        component: HelloWorld
    },
    {
        path: 'shipment-list',
        name: 'ShipmentList',
        component: ShipmentList
    },
    {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: 'carrier-code',
        name: 'CarrierCodeMaintenance',
        component: CarrierCodeMaintenance
    },
    {
        path: 'dashboard/detail',
        name: 'DashboardDetail',
        component: DashboardDetail
    }
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
