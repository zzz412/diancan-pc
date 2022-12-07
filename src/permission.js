// 路由验证文件
import router from '@/router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

// 前置守卫
router.beforeEach(async (to, from, next) => {
  // 开启进度条
  Nprogress.start()

  // 验证逻辑: 
  //           token ->  有   ->    放行
  //                     无   ->    跳转登录  (不是登录页) 
  const token = store.state.token
  if (token) {
    // 判断有无用户信息
    const nickname = store.getters.nickname
    if (!nickname) {
      // 无用户信息 -> 重新获取
      await store.dispatch('getShopInfo')
      next()
    } else {
      // 有用户信息 -> 放行
      next()
    }
  } else {
    if (to.path === '/login') return next()
    next('/login')
  }
  
  
  // 关闭进度条
  Nprogress.done()
})


// 后置守卫
router.afterEach(() => {
  // 关闭进度条
  Nprogress.done()
})