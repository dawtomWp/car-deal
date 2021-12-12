import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Contact from "../views/Contact.vue";
import Login from "../views/Login.vue";
import MerchantDetails from "../views/MerchantDetails.vue";
import MerchantDashboard from "../views/MerchantDashboard.vue";
import Register from '../views/Register.vue';

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/merchant/:merchantId",
    name: "Merchant",
    component: MerchantDetails,
  },
  {
    path: "/merchant-dashboard",
    name: "Merchant Dashboard",
    component: MerchantDashboard,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
