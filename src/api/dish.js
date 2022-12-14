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

// * 获取菜品单位
export const getDishUnitApi = () => request.get('/dish/unit')

// * 新增菜品单位
export const addDishUnitApi = data => request.post('/dish/unit', data)


// * 获取菜品信息
export const getDishDataApi = data => request.get('/dish/data', { params: data })

// * 添加菜品信息
export const addDishDataApi = data => request.post('/dish/data', data)

// * 修改菜品状态
export const changeDishDataApi = (id, state) => request.put(`/dish/data/${id}/${state}`)

// * 获取菜品详情信息
export const getDishDataInfoApi = id => request.get(`/dish/data/${id}`)

// * 修改菜品信息
export const setDishDataApi = data => request.put('/dish/data', data)
