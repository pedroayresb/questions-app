import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import axios from 'axios';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import InTest from '../views/InTest.vue';
import TestsMade from '../views/TestsMade.vue';
import Correction from '../views/Correction.vue';

const BASE_URL = '/';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/inTest',
    name: 'InTest',
    component: InTest,
  },
  {
    path: '/correction',
    name: 'TestsMade',
    component: TestsMade,
  },
  {
    path: '/correction/:id',
    name: 'Correction',
    component: Correction,
  },
]

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes,
});

// router.beforeEach( async (to, from) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     try {
//       const response = await axios.post(`${process.env.VUE_APP_API_URL}/token`, {}, {
//         headers: {
//           Authorization: token,
//         },
//       });
//       if (response.status === 202) {
//         return true
//       }
//     } catch (error) {
//       localStorage.removeItem('token');
//       return { name: 'Login' }
//     }
//   }
//   const startedTest = localStorage.getItem('startedTest');
//   if (startedTest) {
//     try {
//       const response = await axios.get(`${process.env.VUE_APP_API_URL}/test/${startedTest}`);
//       if (response.status === 200) {
//         return { name: 'InTest' }
//       }
//     } catch (error) {
//       localStorage.removeItem('startedTest');
//       return { name: 'Home' }
//     }
//   }
//   return false
// });


export default router;