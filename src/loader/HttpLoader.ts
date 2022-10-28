import axios, { AxiosInstance } from 'axios'

const instance = axios.create({
  timeout: 15000,
})

class HttpLoader {
  load() {
    global.Http = instance
    Object.freeze(global.Http)
    initInterceptors(instance)
  }
}

function initInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use(
    (config: any) => {
      return config
    },
    (error: any) => {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    (response: any) => {
      return response
    },
    (error: any) => {
      return Promise.reject(error)
    }
  )
}

export default HttpLoader
