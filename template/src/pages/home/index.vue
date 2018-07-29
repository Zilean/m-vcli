<template>
  <div class="tabbar-container">
    <router-link to="/base"><van-button type="primary">立即申请</van-button></router-link>
  </div>
</template>
<script>
import { Button } from "vant";
import Router from "@/utils/routerConfig.js";
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
import { Config } from "@/utils/";

export default {
  components: {
    VanButton: Button
  },
  data() {
    return {
      Router,
      showLogin: false,
      getData: false,
      activeTab: +sessionStorage.getItem(Config.constants.activedTabNum) || 0
    };
  },
  computed: {
    ...userModule.mapGetters(["wxMe"])
  },
  created() {
    this.initData();
  },
  destroyed() {
    sessionStorage.setItem(Config.constants.activedTabNum, this.activeTab);
  },
  methods: {
    ...userModule.mapActions(["getWxMe"]),
    // 初始化数据
    async initData() {
      await this.getWxMe();
      // 减少闪烁
      this.getData = true;
      if (this.wxMe.telephone) this.showLogin = false;
    },
    async loginSuccess() {
      await this.getWxMe();
      this.$refs.home && this.$refs.home.getActives();
      this.showLogin = false;
    },
    changeTab() {
      this.activeTab = 0;
      this.showLogin = false;
    }
  }
};
</script>
<style lang="less">
.tabbar-container {
  .van-tabbar--fixed {
    width: 10.8rem;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 999;
  }
  .tabbar {
    left: 50%;
    width: 10.8rem;
    margin-left: -5.4rem;
    z-index: 100;
    .van-tabbar-item--active {
      color: #fa494b;
    }
  }
}
</style>
