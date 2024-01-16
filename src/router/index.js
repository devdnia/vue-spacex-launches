import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage';


 const routes = [
 {
     path: '/',
     name: 'home',
     component: HomePage
 },
 {
     path: '/launches',
     name: 'launches',
     component: () => import(/* webpackChunkName: "Launches" */ '../components/Launches')
 },
 {
    path:'/launch/:mission_id',
    name: 'launch',
    component: () => import(/* webpackChunkName: "Launch id" */ '../components/Launch')

 },
 {
    path: '/:pathMatch(.*)*',
    component: () => import(/* webpackChunkName: "NoPageFound"*/'../components/404')
 }
 ]

 const router = createRouter({
 history: createWebHistory(process.env.BASE_URL),
 routes
 })

 export default router