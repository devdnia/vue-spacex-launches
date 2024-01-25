import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage';



 const routes = [
 {
     path: '/',
     name: 'home',
     component: HomePage
 },
 {
  path: '/login',
     name: 'login',
     component: () => import(/* webpackChunkName: "Login" */ '../pages/LoginPage')
 },
 {
     path: '/launches',
     name: 'launches',
     component: () => import(/* webpackChunkName: "Launches" */ '../components/Launches')
 },
 {
    path:'/launch/:id',
    name: 'launch',
    component: () => import(/* webpackChunkName: "Launch id" */ '../components/Launch')

 },
 {
   path:'/newlaunch',
   name: 'createlaunch',
   component: () => import(/* webpackChunkName: "Create Launch" */ '../components/CreateLaunch')
 },
 {
   path:'/formlaunch/:id',
   name: 'formlaunch',
   component: () => import(/* webpackChunkName: "Form Launch" */ '../components/FormLaunch')
 },
 {
  path:'/yupform',
  name: 'yupform',
  component: () => import(/* webpackChunkName: "Form Yup" */ '../components/YupForm')
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