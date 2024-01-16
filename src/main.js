// main.js o donde configures Vue
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Login from '@/components/Login.vue';
import SignUp from '@/components/SignUp.vue';
import PatientDashboard from '@/components/PatientDashboard.vue';
import DoctorDashboard from '@/components/DoctorDashboard.vue';
import AdminDashboard from '@/components/AdminDashboard.vue';
const app = createApp(App);

const routes = [
  { path: '/', component: Login, name: 'login' },
  { path: '/signup', component: SignUp, name: 'signup' },
  { path: '/patient', component: PatientDashboard, name: 'patient' },
  { path: '/doctor', component: DoctorDashboard, name: 'doctor' },
  { path: '/admin', component: AdminDashboard, name: 'admin' },
  // Otras rutas...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(router);

app.mount('#app');
