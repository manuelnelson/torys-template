import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vue2TouchEvents from 'vue2-touch-events'

Vue.config.productionTip = false

//add swipe events
Vue.use(Vue2TouchEvents);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
