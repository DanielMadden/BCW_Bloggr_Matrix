import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/blog/:id',
    name: 'Blog',
    component: loadPage('BlogPage')
  },
  {
    path: '/addblog',
    name: 'Add Blog',
    component: loadPage('AddBlogPage')
  },
  {
    path: '/editblog/:id',
    name: 'Edit Blog',
    component: loadPage('EditBlogPage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  {
    path: '/:pathMatch(.*)*',
    component: loadPage('HomePage')
  }
]

const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})

export default router
