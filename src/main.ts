import Vue from 'vue';
import App from './App.vue';
import {AndyTicket} from '.';
Vue.config.productionTip = false;
Vue.use(AndyTicket);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
