import Vue from 'vue'
import VueRouter from 'vue-router'
import StudentList from '../views/Student/List.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Consulta Alunos',
    component: StudentList
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
