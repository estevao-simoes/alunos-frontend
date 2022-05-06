import Vue from 'vue'
import VueRouter from 'vue-router'
import StudentList from '../views/Student/List.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Consulta Alunos',
    component: StudentList
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Student/Show.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.name;
  next();
});

export default router
