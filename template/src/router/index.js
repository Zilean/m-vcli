import Vue from "vue";
import Router from "vue-router";
import routerConfig from "../utils/routerConfig";
import { Config, setPageTitle } from "../utils";

Vue.use(Router);

// 获取数据
export const getRouterData = () => {
  let routes = Object.values(routerConfig).map(item => {
    return {
      path: item.path,
      name: item.name,
      component: () => import(`../pages/${item.component}`),
      // require.ensure: chunk名称不能为变量
      // component: r =>
      //   require.ensure([], () => r(require(`../views/${item.component}.vue`)), item.name),
      meta: item.meta
    };
  });
  routes.push({
    path: "*",
    redirect: routerConfig.home.path,
    name: routerConfig.home.name,
    component: () => import(`../pages/${routerConfig.home.name}`),
    meta: routerConfig.home.meta
  });

  const router = new Router({
    base: Config.baseRouter,
    mode: "history", // 路由模式
    routes: routes
  });
  beforeRouter(router);
  afterRouter(router);
  return router;
};

// 全局前置钩子
function beforeRouter(router) {
  router.beforeEach((to, from, next) => {
    next();
  });
}

// 全局后置钩子
function afterRouter(router) {
  router.afterEach(transition => {
    window.scrollTo(0, 0);
    const title = transition.meta.title;
    setPageTitle(title);
  });
}
