import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import echarts from 'echarts';
import {excelFilePostUpload, postKeyValueRequest} from './utils/api';
import {postFileRequest} from "./utils/api";
import {postJsonRequest} from "./utils/api";
import {postRequest} from './utils/api';
import {getRequest} from './utils/api';
import {putRequest} from './utils/api';
import {deleteRequest} from './utils/api';

Vue.config.productionTip = false;
Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.postFileRequest = postFileRequest;
Vue.prototype.postJsonRequest = postJsonRequest;
Vue.prototype.excelFilePostUpload = excelFilePostUpload;
Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.$echarts = echarts;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');;
