import Vue from "vue";
import VueRouter from "vue-router";
import Constructor from "../views/Index.vue";
// import { wrapRouter } from "oaf-vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Constructor",
    component: Constructor,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
