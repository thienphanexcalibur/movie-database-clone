// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import appRouter from './router'
import appStore from './store'
import Entry from './Entry'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import ReadMore from 'vue-read-more'

import 'vuetify/dist/vuetify.min.css'

Vue.use(ReadMore)
Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter(appRouter)
const store = new Vuex.Store(appStore)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#tmdbapp',
  name: 'The Movie Database',
  router,
  store,
  components: { Entry },
  render: (h) => h(Entry)
})
