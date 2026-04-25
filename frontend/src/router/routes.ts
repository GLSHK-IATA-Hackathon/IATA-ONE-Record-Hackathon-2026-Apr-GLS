// src/router/routes.ts
import { RouterView } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'


import Dashboard from '@/views/Dashboard.vue'
import DashboardDetail from '@/views/DashboardDetail.vue'
import ShipmentList from '@/views/ShipmentList.vue'

const baseUrl = '/'

// Create base children routes
const baseChildren: RouteRecordRaw[] = [
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
        component: ShipmentList // Reuse ShipmentList for this route
    },
    {
        path: 'dashboard/detail',
        name: 'DashboardDetail',
        component: DashboardDetail
    }
]

// Add home route only in local development
baseChildren.unshift({
    path: '',
    redirect: '/shipment-list'
})

const routes: RouteRecordRaw[] = [
    {
        path: baseUrl,
        component: RouterView,
        children: baseChildren
    }
]


export default routes
