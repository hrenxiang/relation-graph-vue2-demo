import Vue from "vue";
import App from "./App.vue";

import 'virtual:svg-icons-register';
Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App)
}).$mount("#app");
