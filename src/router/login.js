import Vue from 'vue'
import VueRouter from 'vue-router'
import { loginRouteMap } from '@/config/router.config'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style

// hack router push callback
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes: loginRouteMap
})

NProgress.configure({ showSpinner: false }) // NProgress Configuration
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  next()
})

router.afterEach((to, from) => {
  NProgress.done() // finish progress bar
})

export default router
