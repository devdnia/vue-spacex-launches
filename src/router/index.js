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
    path:'/launche/:mission_id',
    name: 'launche',
    component: () => import(/* webpackChunkName: "Launche id" */ '../components/Launche')

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