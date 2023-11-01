import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const Home = () => import("@/views/HomePage.vue")
const Peoples = () => import("@/views/PeoplesList.vue")
const People = () => import("@/views/PeopleId.vue")
const Favorites = () => import("@/views/FavoriteList.vue")

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/peoples",
    component: Peoples,
  },
  {
    path: "/people/:id",
    component: People,
    props: true,
  },
  {
    path: "/favorites",
    component: Favorites,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/', '/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');


//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });


export default router
