import Vue from 'vue/dist/vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueResource from 'vue-resource';
import Global from './utils/global';

Vue.use(BootstrapVue);
Vue.use(VueResource);

Vue.http.options.emulateJSON = true;

Vue.prototype.$global = Global;

new Vue({
    render: h => h(App)
}).$mount('#app')