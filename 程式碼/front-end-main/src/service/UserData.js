import { API_URL } from '../utils/config'
import axios from 'axios'

export const getUser = async () => {
  try {
    let result = await axios.get(`${API_URL}/member`, {
      withCredentials: true,
    })
    if (result.data) {
      return '已登入'
    }
  } catch (e) {
    console.error(e.response.data)
    if (e.response.data.code === '9999') {
      // 檢查錯誤碼
      return '未登入'
    }
  }
}

export const fbLogin = async (response) => {
  try {
    let result = await axios.get(
      `${API_URL}/users/auth/facebook?access_token=${response.accessToken}`
    )
    const userId = { userId: result.data.id }
    console.log('userId', userId)
    let getUser = await axios.post(`${API_URL}/users/facebook/login`, userId, {
      withCredentials: true,
    })
    console.log(getUser.data.data)
    return getUser.data.data
  } catch (e) {
    console.error(e.response.data)
    return e.response.data
  }
}

export const googleLogin = async (response) => {
  try {
    let result = await axios.get(
      `${API_URL}/users/auth/google?access_token=${response.accessToken}`
    )
    const userId = { userId: result.data.id }
    console.log('userId', userId)
    let getUser = await axios.post(`${API_URL}/users/google/login`, userId, {
      withCredentials: true,
    })
    console.log(getUser.data.data)
    return getUser.data.data
  } catch (e) {
    console.error(e.response.data)
    return e.response.data
  }
}
