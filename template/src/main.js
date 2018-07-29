import Vue from "vue";

import "@/assets/style/app.less";
import "babel-polyfill";
import "@/utils/rem";
import "@/utils/registerServiceWorker";

import FastClick from "fastclick";
import Sto from "store";

import Router from "@/utils/routerConfig.js";
import App from "@/App.vue";
import store from "@/store";
import { getRouterData } from "@/router";
import { Config } from "@/utils/";

Vue.prototype.$sto = Sto;
Vue.prototype.$conf = Config;
Vue.prototype.$routeConf = Router;

Vue.config.productionTip = false;

if ("addEventListener" in document) {
  document.addEventListener(
    "DOMContendLoaded",
    function() {
      FastClick.attach(document.body);
    },
    false
  );
}

// 禁止显示在浏览器打开：有无影响暂无法预估
if (process.env.NODE_ENV === "production") {
  document.oncontextmenu = function(e) {
    e.preventDefault();
  };
}

new Vue({
  store,
  router: getRouterData(),
  render: h => h(App)
}).$mount("#app");
