import axios from 'axios'
import Axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../../store/user-store'

const AXIOS_INSTANCE = Axios.create({ baseURL: '' })
AXIOS_INSTANCE.interceptors.request.use(
  async (config) => {
    const token = useUserStore.getState().user?.accessToken
    const baseUrl = JSON.parse(localStorage.getItem('base_url'))
    config.baseURL = baseUrl ? baseUrl : ''

    if (token) {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const navigate = useNavigate()
    const { setCredentials, removeCredentials } = useUserStore()

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const baseUrl = localStorage.getItem('base_url')
        const refreshToken = useUserStore.getState().user?.refreshToken

        if (refreshToken) {
          try {
            const response = await axios.post(`${baseUrl}/api/user/refresh`, {
              refresh: refreshToken,
            })
            const { access, refresh } = response.data
            setCredentials({ accessToken: access, refreshToken: refresh })

            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${access}`
            return axios(originalRequest)
          } catch (error) {
            removeCredentials()
            navigate('/login')
          }
        } else {
          removeCredentials()
          navigate('/login')
        }
      } catch (error) {
        removeCredentials()
        navigate('/login')
      }
    }
    return Promise.reject(error)
  }
)

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source()
  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(
    ({ data }) => data
  )

  // @ts-expect-error cancel is not a function on the promise
  promise.cancel = () => {
    source.cancel('Query was cancelled by React Query')
  }

  return promise
}

export default customInstance

export interface ErrorType<Error> extends AxiosError<Error> {}
