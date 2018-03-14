// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import approuter from './router'
import store from './store'
import Common from './Common'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'

Vue.use(Vuetify)
Vue.use(VueRouter)

const router = new VueRouter({ ...approuter })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#tmdbapp',
  router,
  store,
  components: {
    'App': Common
  },
  template: '<App/>'
})
