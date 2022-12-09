import Axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getToken } from './auth'

// 封装的思路:  简化地址的填写【设置默认地址】  简化导入步骤【添加到Vue原型对象中】  简化返回的结果

// 通过create方法创建新的axios对象  并传入默认配置   那么创建的axios对象就会按照配置去发起请求
const service = Axios.create({
  baseURL: 'http://localhost:5001/admin', // 请求默认地址
  timeout: 5000 // 请求超时时间
})

// 添加请求拦截器
service.interceptors.request.use((config) => {
  // 在请求头中携带Token
  config.headers.authorization = 'Bearer ' + getToken()
  // 返回请求对象
  return config
})

// 添加响应拦截器
service.interceptors.response.use(
  // 响应成功
  (res) => {
    const data = res.data
    // 统一对状态码进行判断
    if (data.code !== 200) {
      Message.error(data.msg || '操作失败')
      // 判断错误类型
      if (data.code === 301) {
        store.commit('RESET_STATE')
        router.push('/login')
      }
      return Promise.reject(data.msg)
    }
    return data // 将响应的data值返回
  },
  // 响应失败
  (error) => Promise.reject(error)
)

export default service
