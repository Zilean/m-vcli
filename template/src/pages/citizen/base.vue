<template>
  <div class="wrapper" id="scroll_section">
    <div class="tabbar-container">
    <van-cell-group>
      <van-field
        v-model="username"
        required
        clearable
        label="用户名"
        icon="question"
        placeholder="请输入用户名"
        @click-icon="show = !show"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />

      <van-field
        v-model="sms"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
      >
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
      <van-field
        required
        clearable
        label="用户名"
        icon="question"
        placeholder="请输入用户名"
        @click-icon="show = !show"
      />
      <van-field
        v-model="username"
        required
        clearable
        label="用户名"
        icon="question"
        placeholder="请输入用户名"
        @click-icon="show = !show"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />

      <van-field
        v-model="sms"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
      >
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
      <van-field
        required
        clearable
        label="用户名"
        icon="question"
        placeholder="请输入用户名"
        @click-icon="show = !show"
      />
    </van-cell-group>
  </div>
  <van-popup v-model="show" :lock-scroll="true" position="bottom" :overlay="false">
      <van-picker show-toolbar title="标题" @cancel="onCancel" @confirm="onConfirm" :columns="columns" />
    </van-popup>
  </div>
</template>
<script>
import Crypto from "@/utils/crypto";
import { Field, Cell, CellGroup, Button, Popup, Picker } from "vant";
import Router from "@/utils/routerConfig.js";
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
import { Config } from "@/utils/";
import BScroll from "better-scroll";
export default {
  components: {
    VanPopup: Popup,
    VanPicker: Picker,
    VanButton: Button,
    VanField: Field,
    VanCell: Cell,
    VanCellGroup: CellGroup
  },
  data() {
    return {
      Router,
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      username: "",
      password: "",
      sms: "",
      show: false,
      activeTab: +sessionStorage.getItem(Config.constants.activedTabNum) || 0
    };
  },
  computed: {
    ...userModule.mapGetters(["wxMe"])
  },
  created() {
    const userPwd = Crypto.encrypt("123456");
    console.log(userPwd);
    console.log(Crypto.decrypt(userPwd));
    // this.initData();
  },
  mounted() {
    this.$nextTick(() => {
      new BScroll("#scroll_section", {
        deceleration: 0.001,
        bounce: true,
        swipeTime: 1800,
        click: true
      });
    });
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
    onConfirm(value, index) {
      console.log(`${value}${index}`);
      this.show = !this.show;
    },
    onCancel() {
      console.log("取消");
      this.show = !this.show;
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
