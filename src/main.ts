import '@babel/polyfill';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from './App.vue';
//Font awesome
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'
Vue.component('v-icon', Icon)

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
