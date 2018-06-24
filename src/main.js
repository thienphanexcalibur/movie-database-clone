// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import approuter from './router'
import appstore from './store'
import App from './App'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import ReadMore from 'vue-read-more'

Vue.use(ReadMore)
Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({ ...approuter })
const store = new Vuex.Store({ ...appstore })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#tmdbapp',
  name: 'Root',
  router,
  store,
  components: {
    'App': App
  },
  template: '<App/>'
})
