import axios from '@/libs/api.request'

export default {
  register: (data) => {
    return axios.request({
      url: '/user/register',
      data: data,
      method: 'post'
    }).then(resp => {
      return resp.data
    })
  },
  code: (data) => {
    return axios.request({
      url: '/user/code',
      data: data,
      method: 'post'
    }).then(resp => {
      return resp.data
    })
  },
  profile: (data) => {
    return axios.request({
      url: '/user/profile',
      data: data,
      method: 'post'
    }).then(resp => {
      return resp.data
    })
  },
  bindEmail: (data) => {
    return axios.request({
      url: '/user/bindEmail',
      data: data,
      method: 'post'
    }).then(resp => {
      return resp.data
    })
  },
  bindMobile: (data) => {
    return axios.request({
      url: '/user/bindMobile',
      data: data,
      method: 'post'
    }).then(resp => {
      return resp.data
    })
  },
  resetPass: (data) => {
    return axios.request({
      url: '/user/resetPass',
      data: data,
      method: 'post'
    }).then(resp => {
      return resp.data
    })
  },
}
export const login = ({ userName, password }) => {
  const data = {
    userName:userName,
    pass:password
  }
  return axios.request({
    url: '/user/login',
    data,
    method: 'post'
  })
}

export const logout = () => {
  return axios.request({
    url: '/user/logout',
    method: 'post'
  })
}