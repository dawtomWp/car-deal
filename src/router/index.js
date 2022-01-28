import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Contact from "../views/Contact.vue";
import Login from "../views/Login.vue";
import MerchantDetails from "../views/MerchantDetails.vue";
import MerchantDashboard from "../views/MerchantDashboard.vue";
import RegisterUser from '../views/RegisterUser.vue';
import RegisterCourier from '../views/RegisterCourier.vue';
import RegisterMerchant from '../views/RegisterMerchant.vue';
import CourierDashboard from '../views/CourierDashboard.vue';
import CarDetails from '../views/CarDetails.vue';

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
    path: "/register-user",
    name: "RegisterUser",
    component: RegisterUser
  },
  {
    path: "/register-merchant",
    name: "RegisterMerchant",
    component: RegisterMerchant
  },
  {
    path: "/register-courier",
    name: "RegisterCourier",
    component: RegisterCourier
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
  {
    path: "/courier-dashboard",
    name: "Courier Dashboard",
    component: CourierDashboard
  },
  {
    path: '/cars/:carId',
    name: 'Car',
    component: CarDetails
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
