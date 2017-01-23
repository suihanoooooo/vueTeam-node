// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery.js'
import store from './store'

import App from './App'
import Mine from './components/mine'
import Neibu from './components/neibu'
import Shanghu from './components/shanghu'
import Qudao from './components/qudao'
import Week from './components/week'
import Month from './components/month'
import Rili from './components/rili'
import Tongzhi from './components/tongzhi'

Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [{
	path: '/',
	component :Mine
}, {
	path: '/mine',
	component: Mine
}, {
	path: '/neibu',
	component: Neibu
}, {
	path: '/shanghu',
	component: Shanghu
}, {
	path: '/qudao',
	component: Qudao
}, {
	path: '/week',
	component: Week
}, {
	path: '/month',
	component: Month
}, {
	path: '/rili',
	component: Rili
}, {
	path: '/tongzhi',
	component: Tongzhi
}]

const router = new VueRouter({
	routes
}); 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render:h=> h(App)
})
