// 菜品管理相关API
import request from '@/utils/request'

// * 获取菜品类目
export const getDishCateApi = data => request.get('/dish/cate', { params: data })

// * 新增菜品类目
export const addDishCateApi = data => request.post('/dish/cate', data)

// * 修改菜品类目
export const setDishCateApi = data => request.put('/dish/cate', data)

// * 删除菜品类目
export const delDishCateApi = id => request.delete('/dish/cate/' + id)


// * 获取菜品信息
export const getDishDataApi = data => request.get('/dish/data', { params: data })
